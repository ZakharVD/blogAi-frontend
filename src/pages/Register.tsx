import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "../hooks/useAlert";
import { useLoading } from "../hooks/useLoading";
import { httpRegisterUser } from "../api/user.api";

export default function Register() {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [authornameInput, setAuthornameInput] = useState("");
  const redirect = useNavigate();
  const { activateAlert } = useAlert();
  const { setLoading } = useLoading();

  function onUsernameInputChange(event: ChangeEvent<HTMLInputElement>) {
    setUsernameInput(event.target.value);
  }

  function onPasswordInputChange(event: ChangeEvent<HTMLInputElement>) {
    setPasswordInput(event.target.value);
  }
  function onAuthornameInputChange(event: ChangeEvent<HTMLInputElement>) {
    setAuthornameInput(event.target.value);
  }

  async function onFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!passwordInput || !usernameInput) {
      return;
    }
    if (passwordInput.length < 6) {
      activateAlert("Password must be at least 6 characters", "red");
      return;
    }
    try {
      setLoading(true);
      const res = await httpRegisterUser(usernameInput, authornameInput, passwordInput);
      setLoading(false);
      activateAlert(`${res.message}`, "green");
      redirect("/login");
    } catch (error) {
      setLoading(false);
      activateAlert("An error occured.", "red");
      console.log("error during register", error);
    }
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center mt-16 phone:mt-0">
        <form className="flex flex-col bg-secondary py-4 px-3 phone:px-6 rounded-xl w-[95%] phone:w-[400px]" onSubmit={onFormSubmit}>
          <p className="text-3xl mt-2 mb-5 font-bold text-center">Create your account</p>
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Create a username"
              required
              className="border-2 border-gray rounded-xl p-3 phone:p-2 bg-third focus:border-red focus:border-opacity-40 focus:outline-none"
              onChange={onUsernameInputChange}
            />
            <p className="text-xs font-light text-lightgray my-1">
              Must be a unique single word
            </p>
          </div>
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Enter your author name"
              required
              className="border-2 border-gray rounded-xl p-3 phone:p-2 bg-third focus:border-red focus:border-opacity-40 focus:outline-none"
              onChange={onAuthornameInputChange}
            />
            <p className="text-xs text-lightgray font-light my-1">
              This name will be display on your posts
            </p>
          </div>
          <div className="flex flex-col mb-6">
            <input
              required
              type="password"
              placeholder="Create a password"
              className="border-2 border-gray rounded-xl p-3 phone:p-2 bg-third focus:border-red focus:border-opacity-40 focus:outline-none"
              onChange={onPasswordInputChange}
            />
            <p className="text-xs text-lightgray font-light my-1">
              Password must be at least 6 characters
            </p>
          </div>
          <button className="bg-red border-2 border-transparent hover:bg-transparent hover:border-red hover:text-red rounded-xl text-white p-3 m-2 font-bold">Sign Up</button>
          <p className="text-md font-light my-2 text-center">
            Already have an account?{" "}
            <Link className="underline font-bold" to={"/login"}>
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}
