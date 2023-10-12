import { createPortal } from "react-dom";
import { useModalWindow } from "../hooks/useModalWindow";
import { useEffect } from "react";


export default function ModalWindow() {
  const { showModal, modalMessage, deactivateModal, callbackFn } = useModalWindow();

  useEffect(() => {
    deactivateModal();
  }, [deactivateModal]);

  function onCancelHandler() {
    return deactivateModal();
  }

  return createPortal(
    <>
      {showModal === true && (
        <div className="backdrop-blur-sm w-full h-full z-10 top-0 fixed flex justify-center items-center">
          <div className="w-[300px] h-[220px] bg-secondary rounded-xl shadow-md p-3 flex flex-col text-white">
            <div className="h-1/2 flex justify-center items-center">
                <span className="text-center font-semibold text-lg">{modalMessage}</span>
            </div>
            <div className="h-1/2 flex flex-col justify-between">
                <button onClick={callbackFn} className="w-full bg-white rounded-xl hover:bg-transparent hover:border-white hover:text-white text-black p-2 border-2 border-transparent font-bold">Confirm</button>
                <button onClick={onCancelHandler} className="w-full border-2 border-transparent text-white bg-red hover:border-red hover:bg-transparent hover:text-red rounded-xl p-2 font-bold">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>,
    document.querySelector("#modal") as Element
  );
}