import loggedUsers from "@services/loggedUsers";

export const getUserId = (token: string) => loggedUsers.getLoggedUser(token)?.userId || null;
