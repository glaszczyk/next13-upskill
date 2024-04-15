import loggedUsers from "@services/loggedUsers";

export const getUser = async (token: string) => loggedUsers.getLoggedUser(token);
