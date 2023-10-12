import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAlert } from "../hooks/useAlert";
import { useLoading } from "../hooks/useLoading";
import { httpGetPostById, httpUpdatePost } from "../api/posts.api";

export default function EditPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { postId } = useParams();
  const redirect = useNavigate();
  const { activateAlert } = useAlert();
  const { setLoading } = useLoading();

  useEffect(() => {
    async function getPostInfo() {
      const { title, content } = await httpGetPostById(postId!);
      setTitle(title);
      setContent(content);
    }
    getPostInfo();
  }, [postId]);

  function onTitleChange(event: ChangeEvent<HTMLInputElement>) {
    return setTitle(event.target.value);
  }
  function onContentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    return setContent(event.target.value);
  }
  async function onFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      setLoading(true);
      const res = await httpUpdatePost(postId!, title, content);
      if (res?.status === 200) {
        setLoading(false);
        activateAlert(`${res?.data.message}`, "green");
        redirect("/");
      } else {
        setLoading(false);
        activateAlert("Post could not be updated", "red");
      }
    } catch (error) {
      setLoading(false);
      activateAlert("An error has occured", "red");
      console.log(error);
    }
  }
  function onCancelHandler() {
    return window.history.back();
  }
  return (
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
        <label htmlFor="text" className="text-3xl my-2 font-bold">
          Write your article
        </label>
        <textarea
          className="bg-third border-gray rounded-xl p-3 border-2 h-[400px] focus:border-red focus:border-opacity-40 focus:outline-none"
          onChange={onContentChange}
          value={content}
        />
        <div className="phone:w-[200px] flex flex-col">
          <button
            type="submit"
            className="bg-white text-black rounded-xl border-2 border-transparent hover:bg-transparent hover:border-white hover:text-white my-2 py-3 px-5 font-bold"
          >
            Edit post
          </button>
          <button
            type="button"
            onClick={onCancelHandler}
            className="border-2 border-transparent hover:bg-transparent hover:text-red hover:border-red rounded-xl bg-red text-white p-3 font-bold"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
