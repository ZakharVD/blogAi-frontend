import { useEffect, useState } from "react";
import { useUserInfo } from "../hooks/useUserInfo";
import { TPost } from "../types/post.types";
import PostCard from "../component/PostCard";
import { httpGetPostsByUserId } from "../api/posts.api";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../hooks/useLoading";

export default function MyPosts() {
  const [userPosts, setUserPost] = useState<TPost[]>([]);
  const { userInfo } = useUserInfo();
  const redirect = useNavigate();
  const {setLoading} = useLoading();
  useEffect(() => {
    if (!userInfo) {
      redirect("/")
    }
  }, [redirect, userInfo])
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
    </div>
  );
}
