import { ChangeEvent, FormEvent, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import PromptPopup from "../component/PromptPopup";
import { usePromptPopup } from "../hooks/usePromptPopup";
import usePostInfo from "../hooks/usePostInfo";
import { useAlert } from "../hooks/useAlert";
import { useLoading } from "../hooks/useLoading";
import { httpCreatePost } from "../api/posts.api";
import { useUserInfo } from "../hooks/useUserInfo";

export default function CreatePost() {
  const { title, setTitle, content, setContent } = usePostInfo();
  const redirect = useNavigate();
  const { setIsPromptOpen } = usePromptPopup();
  const { activateAlert } = useAlert();
  const { setLoading } = useLoading();
  const { userInfo } = useUserInfo();

  useEffect(() => {
    if (!userInfo) {
      redirect("/");
    }
  }, [redirect, userInfo]);

  useEffect(() => {
    setContent("");
    setTitle("");
  }, [setContent, setTitle]);

  function onTitleChange(event: ChangeEvent<HTMLInputElement>) {
    return setTitle(event.target.value);
  }
  function onContentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    return setContent(event.target.value);
  }
  function onCancelHandler() {
    return window.history.back();
  }

  async function onFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title || !content) {
      activateAlert("Please fill out all required fields", "yellow");
      return;
    }
    try {
      setLoading(true);
      const res = await httpCreatePost(title, content);
      const status = res?.status;
      const data = res?.data;
      if (status === 200) {
        setLoading(false);
        activateAlert(`${data.message}`, "green");
        redirect("/");
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      activateAlert("An error has occured.", "red");
    }
  }

  function onGenerate() {
    return setIsPromptOpen(true);
  }

  return (
    <>
      <PromptPopup />
      <div className="w-[90%] max-w-[900px] mx-auto">
        <form className="flex flex-col" onSubmit={onFormSubmit}>
          <label htmlFor="" className="text-3xl my-2 font-bold">
            Title
          </label>
          <input
            type="text"
            className="bg-third border-gray rounded-xl p-3 border-2 focus:border-red focus:border-opacity-40 focus:outline-none"
            required
            onChange={onTitleChange}
            defaultValue={title}
          />
          <div className="my-2 flex flex-col">
            <label htmlFor="text" className="text-3xl font-bold">
              Write your article
            </label>
            <button
              type="button"
              onClick={onGenerate}
              className="bg-red my-2 p-3 rounded-xl border-2 border-transparent hover:bg-transparent hover:text-red hover:border-red w-[235px] font-bold"
            >
              Generate using AI instead
            </button>
          </div>
          <textarea
            className="bg-third border-gray rounded-xl p-3 border-2 h-[400px] focus:border-red focus:border-opacity-40 focus:outline-none"
            onChange={onContentChange}
            value={content}
          />
          {/* <ReactQuill onChange={(newValue) => setContent(newValue)} value={content}/> */}
          <div className="w-full phone:w-[200px] flex flex-col">
            <button
              type="submit"
              className="bg-white text-black rounded-xl border-2 border-transparent hover:bg-transparent hover:border-white hover:text-white my-2 py-3 px-5 font-bold w-full"
            >
              Publish
            </button>
            <button
              type="button"
              onClick={onCancelHandler}
              className="py-3 px-5 rounded-xl bg-red text-white border-2 border-transparent hover:bg-transparent hover:border-red hover:text-red font-bold"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
