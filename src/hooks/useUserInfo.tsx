import { useContext } from "react";
import { UserContext } from "../store/User.context";

export function useUserInfo() {
    return useContext(UserContext);
}