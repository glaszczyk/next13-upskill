import { serialize } from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";
import loggedUsers from "@services/loggedUsers";
import user from "@/lib/server/services/user";

const generateAccessToken = () => {
	return Math.floor(Math.random() * 1000).toString();
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== "POST") return res.status(405).json({ message: "Method Not Allowed" });

	const login = req.body.login;
	const password = req.body.password;

	if (!login || !password) return res.status(400).json({ message: "Bad Request" });

	try {
		const loggedInUser = user.logUserIn(login, password);
		const token = generateAccessToken();
		res.setHeader(
			"Set-Cookie",
			serialize("access-token", token, {
				httpOnly: true,
			}),
		);
		loggedInUser.userId && loggedUsers.addLoggedUser(loggedInUser.userId, token);
		return res.status(200).json({
			userId: loggedInUser.userId,
			firstName: loggedInUser.firstName,
			lastName: loggedInUser.lastName,
		});
	} catch (error: any) {
		if (error.message === "Login or password is incorrect") {
			return res.status(401).json({ message: error.message });
		}

		if (error.message === "Another user is already logged in") {
			return res.status(403).json({ message: error.message });
		}

		if (error.message === "User is already logged in") {
			return res.status(409).json({ message: error.message });
		}

		return res.status(500).json({ message: "Internal Server Error" });
	}
}
