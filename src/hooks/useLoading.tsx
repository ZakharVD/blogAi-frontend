import { useContext } from "react";
import { LoadingContext } from "../store/Loading.context";

export function useLoading() {
    return useContext(LoadingContext);
}