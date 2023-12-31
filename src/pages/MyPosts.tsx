import { useEffect, useState } from "react";
import { useUserInfo } from "../hooks/useUserInfo";
import { TPost } from "../types/post.types";
import PostCard from "../component/PostCard";
import { httpGetPostsByUserId } from "../api/posts.api";
import { useNavigate } from "react-router-dom";
import PostCardLoading from "../component/PostCardLoading";
import GetStartedBtn from "../component/shared/GetStartedBtn";

export default function MyPosts() {
  const [userPosts, setUserPost] = useState<TPost[]>([]);
  const [loading, setLoading] = useState(false);
  const { userInfo } = useUserInfo();
  const redirect = useNavigate();
  useEffect(() => {
    if (!userInfo) {
      redirect("/");
    }
  }, [redirect, userInfo]);
  useEffect(() => {
    async function getUserPosts() {
      try {
        setLoading(true);
        const posts = await httpGetPostsByUserId(userInfo?.id!);
        setUserPost(posts);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
    getUserPosts();
  }, [setLoading, userInfo?.id]);
  return (
    <div className="w-[90%] max-w-[900px] mx-auto">
      <>
        {loading === true && (
          <div>
            <PostCardLoading />
            <PostCardLoading />
            <PostCardLoading />
          </div>
        )}
      </>
      <>
          {userPosts.length === 0 && (
            <div className="flex justify-center items-center flex-col">
              <div className="text-lg font-bold">Looks like you don't have any posts...<span className="text-lg">&#128064;</span></div>
              <GetStartedBtn/>
            </div>
          )}
      </>
      <>
        {userPosts.length > 0 &&
          userPosts.map((post) => (
            <PostCard
              key={post._id}
              id={post._id}
              authorname={post.author.authorname}
              content={post.content}
              title={post.title}
              createdAt={post.createdAt}
            />
          ))}
      </>
    </div>
  );
}
