import { type IncomingMessage } from "node:http";
import { getUser } from "@/helpers/getUser";

export const getLoggedUserId = async (
	req: IncomingMessage & { cookies: Partial<{ [p: string]: string }> },
) => {
	const token = req?.cookies["access-token"];
	if (token) {
		const user = await getUser(token);
		if (user) {
			console.log("Jesteś zalogowany");
			return user.userId;
		}
	}
	console.log("Nie jesteś zalogowany");
	return null;
};
