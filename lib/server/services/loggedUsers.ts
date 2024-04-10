import { loggedUsersData } from "@/lib/server/data/loggedUsers";
import { type IGlobalInstance, initializeService } from "@/lib/server/utils/initializeService";
import { type ILoggedUser, type ILoggedUsersService } from "@models/loggedUsers";

export class LoggedUsersService implements ILoggedUsersService {
	constructor(private loggedUsers: ILoggedUser[]) {}

	addLoggedUser(userId: number, token: string) {
		this.loggedUsers.push({ userId, token });
	}
	removeLoggedUser(userId: number) {
		this.loggedUsers = this.loggedUsers.filter((user) => userId !== user.userId);
	}

	getLoggedUser(token: string): number | null {
		return this.loggedUsers.filter((user) => token === user.token)[0].userId ?? null;
	}
}

const globalLoggedUsers = global as unknown as IGlobalInstance<LoggedUsersService>;

const loggedUsers = initializeService(
	LoggedUsersService,
	loggedUsersData,
	globalLoggedUsers,
	"loggedUsers",
);

export default loggedUsers;
