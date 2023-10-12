import { ReactNode, createContext, useReducer } from "react";

type ModalProviderProps = {
  children: ReactNode;
};
type TModalContext = {
  modalMessage: string;
  showModal: boolean;
  activateModal: (message: string, callbackFn: () => void | Promise<void>) => void
  deactivateModal: () => void;
  callbackFn: () => void;
};
type TState = {
  showModal: boolean;
  modalMessage: string;
  callbackFn: () => void;
};
type TAction =
  | {
      type: "ACTIVATE";
      payload: {
        message: string;
        callbackFn: () => void;
      };
    }
  | {
      type: "DEACTIVATE";
    };

const INITIAL_STATE = {
  showModal: false,
  modalMessage: "",
  callbackFn: () => {},
};

function modalReducer(state: TState, action: TAction) {
  switch (action.type) {
    case "ACTIVATE":
      return {
        ...state,
        showModal: true,
        modalMessage: action.payload.message,
        callbackFn: action.payload.callbackFn,
      };
    case "DEACTIVATE":
      return {
        ...state,
        showModal: false,
      };
    default:
      throw new Error(`Unhandled type in modalReducer`);
  }
}

export const ModalContext = createContext<TModalContext>({} as TModalContext);

export function ModalProvider({ children }: ModalProviderProps) {
  const [state, dispatch] = useReducer(modalReducer, INITIAL_STATE);
  const { showModal, modalMessage, callbackFn } = state;

  function activateModal(message: string, callback: () => void) {
    dispatch({
      type: "ACTIVATE",
      payload: { message: message, callbackFn: callback },
    });
  }
  function deactivateModal() {
    dispatch({ type: "DEACTIVATE" });
  }

  return (
    <ModalContext.Provider
      value={{
        activateModal,
        deactivateModal,
        showModal,
        modalMessage,
        callbackFn,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
