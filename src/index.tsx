import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./store/User.context";
import { PromptPopupProvider } from "./store/PromptPopup.context";
import { PostInfoProvider } from "./store/PostInfo.context";
import { ModalProvider } from "./store/Modal.context";
import { AlertProvider } from "./store/Alert.context";
import { LoadingProvider } from "./store/Loading.context";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <LoadingProvider>
        <UserProvider>
          <PostInfoProvider>
            <PromptPopupProvider>
              <ModalProvider>
                <AlertProvider>
                  <App />
                </AlertProvider>
              </ModalProvider>
            </PromptPopupProvider>
          </PostInfoProvider>
        </UserProvider>
      </LoadingProvider>
    </BrowserRouter>
  </React.StrictMode>
);
