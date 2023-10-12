import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserInfo } from "../hooks/useUserInfo";
import { useLoading } from "../hooks/useLoading";
import { useAlert } from "../hooks/useAlert";
import { useModalWindow } from "../hooks/useModalWindow";
import ModalWindow from "./ModalWindow";

export default function AccountBtn() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  function onAccountHandler() {
    return setIsDropdownOpen(prev => !prev)
  }
  return (
    <div>
      <button className="p-3 bg-white border-2 border-transparent hover:bg-transparent hover:border-white hover:text-white text-black rounded-xl font-bold" onClick={onAccountHandler}>Account</button>
      <AccountDropdown isDropdownOpen={isDropdownOpen} />
    </div>
  );
}

type Props = {
  isDropdownOpen: boolean;
};

export function AccountDropdown({ isDropdownOpen }: Props) {
  const { setUserInfo, userInfo } = useUserInfo();
  const { setLoading } = useLoading();
  const { activateAlert } = useAlert();
  const { activateModal } = useModalWindow();
  const redirect = useNavigate();

  async function onLogout() {
    try {
      setLoading(true);
      localStorage.removeItem('token');
      setUserInfo(null);
      setLoading(false);
      activateAlert("User have been logged out.", "green");
      redirect("/");
    } catch {
      setLoading(false);
      activateAlert("An error occured.", "red");
    }
  }

  function onLogoutHandler() {
    activateModal("Are you sure you want to logout?", onLogout);
  }

  return (
    <>
      <ModalWindow />
      {isDropdownOpen && (
        <div className="absolute flex flex-col top-20 right-3 sm:right-10 bg-secondary rounded-xl shadow-lg w-[95%] phone:w-44 z-10 px-2">
          <div className="my-1 text-center mt-2">
            <span className="font-medium text-sm">@{`${userInfo?.username}`}</span>
          </div>
          <Link
            to={"/my-posts"}
            className="text-center p-2 border-2 border-transparent rounded-xl hover:border-white hover:text-white font-bold"
          >
            My Posts
          </Link>
          <button
            onClick={onLogoutHandler}
            className="mb-2 p-2 border-2 border-transparent rounded-xl hover:border-white hover:text-white font-bold"
          >
            Sign Out
          </button>
        </div>
      )}
    </>
  );
}
