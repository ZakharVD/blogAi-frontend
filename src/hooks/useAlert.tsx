import { useContext } from "react";
import { AlertContext } from "../store/Alert.context";

export function useAlert() {
    return useContext(AlertContext);
}