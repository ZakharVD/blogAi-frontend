import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserInfo } from "../hooks/useUserInfo";
import { useAlert } from "../hooks/useAlert";
import { useLoading } from "../hooks/useLoading";
import { httpLoginUser } from "../api/user.api";

export default function Login() {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const redirect = useNavigate();
  const { setUserInfo } = useUserInfo();
  const {activateAlert} = useAlert();
  const {setLoading} = useLoading();

  function onUsernameInputChange(event: ChangeEvent<HTMLInputElement>) {
    setUsernameInput(event.target.value);
  }

  function onPasswordInputChange(event: ChangeEvent<HTMLInputElement>) {
    setPasswordInput(event.target.value);
  }

  async function onFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!passwordInput || !usernameInput) {
      activateAlert("Fill out all required fields", "yellow");
      return;
    }
    try {
      setLoading(true);
      const res = await httpLoginUser(usernameInput, passwordInput);
      const status = res?.status;
      const data = res?.data;
      if (status === 200) {
        setLoading(false);
        activateAlert(`${data.message}`, "green");
        setUserInfo({
          username: data.username,
          id: data.id,
          authorname: data.authorname,
        });
        redirect("/");
      } else {
        setLoading(false);
        activateAlert(`${data.message}`, "red");
      }
    } catch (error) {
      setLoading(false);
      console.log("error during login", error);
    }
  }

  return (
    <>
      <div className="flex justify-center items-center mt-16 phone:mt-0">
        <form className="flex flex-col bg-secondary py-4 px-3 phone:px-6 rounded-xl w-[95%] phone:w-[400px]" onSubmit={onFormSubmit}>
        <p className="text-3xl mt-2 mb-5 font-bold text-center">Sign in to your account</p>
            <input
              type="text"
              placeholder="Enter your username"
              className="border-2 border-gray rounded-xl p-3 phone:p-2 bg-third focus:border-red focus:border-opacity-40 focus:outline-none mb-2"
              required
              onChange={onUsernameInputChange}
            />
            <input
              type="password"
              required
              placeholder="Enter your password"
              className="border-2 border-gray rounded-xl p-3 phone:p-2 bg-third focus:border-red focus:border-opacity-40 focus:outline-none mb-6"
              onChange={onPasswordInputChange}
            />
          <button className="bg-red border-2 border-transparent hover:bg-transparent hover:border-red hover:text-red rounded-xl text-white p-3 m-2 font-bold">
            Sign In
          </button>
          <p className="text-md font-light my-2 text-center">Don't have an account? <Link className="underline font-bold" to={"/register"}>Sign Up</Link></p>
        </form>
      </div>
    </>
  );
}
