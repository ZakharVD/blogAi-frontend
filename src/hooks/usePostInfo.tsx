import { useContext } from "react";
import { PostInfoContext } from "../store/PostInfo.context";

export default function usePostInfo() {
    return useContext(PostInfoContext);
}