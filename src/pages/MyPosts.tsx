import { useEffect, useState } from "react";
import { useUserInfo } from "../hooks/useUserInfo";
import { TPost } from "../types/post.types";
import PostCard from "../component/PostCard";
import { httpGetPostsByUserId } from "../api/posts.api";
import { useNavigate } from "react-router-dom";

export default function MyPosts() {
  const [userPosts, setUserPost] = useState<TPost[]>([]);
  const { userInfo } = useUserInfo();
  const redirect = useNavigate();
  useEffect(() => {
    if (!userInfo) {
      redirect("/")
    }
  }, [])
  useEffect(() => {
    async function getUserPosts() {
      try {
        const posts = await httpGetPostsByUserId(userInfo?.id!);
        setUserPost(posts);
      } catch (error) {
        console.log(error);
      }
    }
    getUserPosts();
  }, []);
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
