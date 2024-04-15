export interface ILoggedUser {
	userId: number;
	token: string;
}

export interface ILoggedUsersService {
	addLoggedUser(userId: number, token: string): void;
	removeLoggedUser(userId: number): void;
	getLoggedUser(token: string): ILoggedUser | null;
}
