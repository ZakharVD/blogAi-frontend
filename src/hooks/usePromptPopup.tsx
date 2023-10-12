import { useContext } from "react";
import { PromptPopupContext } from "../store/PromptPopup.context";

export function usePromptPopup() {
    return useContext(PromptPopupContext);
}