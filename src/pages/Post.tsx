import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TPost } from "../types/post.types";
import { useUserInfo } from "../hooks/useUserInfo";
// import { format } from "date-fns";
import { useModalWindow } from "../hooks/useModalWindow";
import ModalWindow from "../component/ModalWindow";
import { useAlert } from "../hooks/useAlert";
import { useLoading } from "../hooks/useLoading";
import { httpDeletePostById, httpGetPostById } from "../api/posts.api";

export default function Post() {
  const [postInfo, setPostInfo] = useState<TPost>({} as TPost);
  const { userInfo } = useUserInfo();
  const { postId } = useParams();
  const redirect = useNavigate();
  const {activateModal} = useModalWindow();
  const {activateAlert} = useAlert();
  const {setLoading} = useLoading();
  useEffect(() => {
    async function getPostInfo() {
      try {
        const postInfo = await httpGetPostById(postId!);
        setPostInfo(postInfo);
      } catch (error) {
        console.log(error);
      }
    }
    getPostInfo();
  }, [postId]);

  function onEditHandler() {
    redirect(`/edit/${postInfo._id}`);
  }

  function onDeleteHandler() {
    return activateModal("Are you sure you want to delete this post?", deletePost)
  }

  async function deletePost() {
    try {
      setLoading(true);
      const { message } = await httpDeletePostById(postId!);
      setLoading(false);
      activateAlert(`${message}`, "green");
      redirect("/");
    } catch (error) {
      setLoading(false);
      activateAlert("An error occured", "red");
      console.log(error);
    }
  }
  return (
    <>
    <ModalWindow/>
      <div className="w-[90%] max-w-[900px] mx-auto">
        <h2 className="text-4xl sm:text-5xl font-semibold my-2">{postInfo.title}</h2>
        <div className="my-2">
          <p className="font-bold">{postInfo.author?.authorname}</p>
          <p className="font-light">{}</p>
        </div>
        <article className="text-lg text-lightgray">{postInfo.content}</article>
        <div>
          {userInfo?.id === postInfo.author?._id && (
            <div className="flex flex-col phone:w-[200px] mt-4">
              <button
                onClick={onEditHandler}
                className="bg-white text-black rounded-xl border-2 border-transparent hover:border-white hover:bg-transparent hover:text-white py-3 px-5 mb-2 font-bold"
              >
                Edit Post
              </button>
              <button onClick={onDeleteHandler} className="bg-red rounded-xl border-2 border-transparent hover:bg-transparent hover:border-red hover:text-red py-3 px-5 font-bold">Delete post</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
//format(new Date(postInfo.createdAt), "MMM d, yyyy")
