import { Link, Outlet, useNavigate } from "react-router-dom";
import { useUserInfo } from "../hooks/useUserInfo";
import { useEffect } from "react";
import AccountBtn from "./AccountBtn";
import { httpGetUserInfo } from "../api/user.api";
import { TUser } from "../types/user.types";

export default function Navbar() {
  const redirect = useNavigate();
  const { userInfo, setUserInfo } = useUserInfo();

  useEffect(() => {
    async function fetchUserData() {
      try {
        const data: TUser = await httpGetUserInfo();
        if (!data) return;
        setUserInfo({
          username: data.username,
          id: data.id,
          authorname: data.authorname,
        });
      } catch (error) {
        console.log(error);
      }
    }
    fetchUserData();
  }, [setUserInfo]);

  function onSigninHandler() {
    return redirect("/login");
  }
  function onSignupHandler() {
    return redirect("/register");
  }
  function onCreatePostHandler() {
    redirect("/create-post");
  }
  return (
    <>
      <nav className="flex flex-row justify-between py-4 px-3 sm:px-10">
        <Link to={"/"} className="flex justify-center items-center">
          <span className="font-extrabold text-3xl underline">
            Blog<span className="text-red">Ai</span>
          </span>
        </Link>
        <>
          {userInfo === null ? (
            <div>
              <button
                className="py-3 px-5 mr-2 bg-red border-2 border-transparent hover:border-red hover:text-red hover:bg-transparent rounded-xl text-white font-bold"
                onClick={onSigninHandler}
              >
                Sign In
              </button>
              <button
                className="py-3 px-5 bg-white border-2 border-transparent hover:border-white hover:text-white hover:bg-transparent text-black rounded-xl font-bold"
                onClick={onSignupHandler}
              >
                Sign Up
              </button>
            </div>
          ) : (
            <div className="flex flex-row">
              <button
                className="p-3 bg-red border-2 border-transparent hover:border-red hover:text-red hover:bg-transparent rounded-xl text-white mr-2 font-bold"
                onClick={onCreatePostHandler}
              >
                Create a Post
              </button>
              <AccountBtn />
            </div>
          )}
        </>
      </nav>
      <Outlet />
    </>
  );
}
