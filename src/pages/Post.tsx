import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TPost } from "../types/post.types";
import { useUserInfo } from "../hooks/useUserInfo";
// import { format } from "date-fns";
import { useModalWindow } from "../hooks/useModalWindow";
import ModalWindow from "../component/ModalWindow";
import { useAlert } from "../hooks/useAlert";
import { httpDeletePostById, httpGetPostById } from "../api/posts.api";
import PostCardLoading from "../component/PostCardLoading";

export default function Post() {
  const [postInfo, setPostInfo] = useState<TPost>({} as TPost);
  const [loading, setLoading] = useState(true);
  const { userInfo } = useUserInfo();
  const { postId } = useParams();
  const redirect = useNavigate();
  const { activateModal } = useModalWindow();
  const { activateAlert } = useAlert();
  useEffect(() => {
    async function getPostInfo() {
      try {
        setLoading(true);
        const postInfo = await httpGetPostById(postId!);
        setPostInfo(postInfo);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
    getPostInfo();
  }, [postId]);

  function onEditHandler() {
    redirect(`/edit/${postInfo._id}`);
  }

  function onDeleteHandler() {
    return activateModal(
      "Are you sure you want to delete this post?",
      deletePost
    );
  }

  async function deletePost() {
    try {
      setLoading(true);
      const res = await httpDeletePostById(postId!);
      if (res?.status === 200) {
        setLoading(false);
        activateAlert(`${res.data.message}`, "green");
        redirect("/");
      } else {
        setLoading(false);
        activateAlert("Post could not be delited", "red");
      }
    } catch (error) {
      setLoading(false);
      activateAlert("An error occured", "red");
      console.log(error);
    }
  }
  if (loading) {
    return (
      <div className="w-[90%] max-w-[900px] mx-auto">
        <div>
          <PostCardLoading />
          <PostCardLoading />
          <PostCardLoading />
          <PostCardLoading />
        </div>
    </div>
    )
  }

  return (
    <>
      <ModalWindow />
      <div className="w-[90%] max-w-[900px] mx-auto">
        <h2 className="text-4xl sm:text-5xl font-semibold my-2">
          {postInfo.title}
        </h2>
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
              <button
                onClick={onDeleteHandler}
                className="bg-red rounded-xl border-2 border-transparent hover:bg-transparent hover:border-red hover:text-red py-3 px-5 font-bold"
              >
                Delete post
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
//format(new Date(postInfo.createdAt), "MMM d, yyyy")
