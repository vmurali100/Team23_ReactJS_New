import { createContext } from "react";

const UserContext = createContext()

export const UserContextProvider = UserContext.Provider
export const UserContectConsumer = UserContext.Consumer