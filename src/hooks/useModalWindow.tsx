import { useContext } from "react";
import { ModalContext } from "../store/Modal.context";

export function useModalWindow() {
    return useContext(ModalContext);
}