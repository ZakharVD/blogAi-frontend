import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useAlert } from "../hooks/useAlert";

export default function Alert() {
  const { alertMessage, showAlert, alertType, deactivateAlert } = useAlert();

  useEffect(() => {
      if (showAlert === true) {
        setTimeout(() => {
            deactivateAlert();
          }, 4000);
      }
  }, [deactivateAlert, showAlert]);

  return createPortal(
    <>
      {showAlert === true && (
        <div
          className={`${alertType} shadow-lg fixed right-3 sm:right-5 bottom-5 text-lg w-[95%] h-auto md:w-[500px] mx-auto rounded-xl p-4 z-50`}
        >
          <div className="flex justify-between items-center">
            <p className="text-md font-bold text-black">{alertMessage}</p>
          </div>
        </div>
      )}
    </>,
    document.querySelector("#alert") as Element
  );
}