import { ReactNode, createContext, useState } from "react";
import { TUser } from "../types/user.types";

type UserProviderProps = {
    children: ReactNode;
}
type TUserContext = {
    userInfo: TUser | null;
    setUserInfo: React.Dispatch<React.SetStateAction<TUser | null>>
}


export const UserContext = createContext<TUserContext>({} as TUserContext);

export function UserProvider({children}: UserProviderProps) {
    const [userInfo, setUserInfo] = useState<TUser | null>(null)
    console.log(userInfo)
    return (
        <UserContext.Provider value={{userInfo, setUserInfo}}>{children}</UserContext.Provider>
    )
}