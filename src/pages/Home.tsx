import { useEffect, useState } from "react";
import { TPost } from "../types/post.types";
import PostCard from "../component/PostCard";
import { httpGetAllPosts } from "../api/posts.api";
import { useNavigate } from "react-router-dom";
import { useUserInfo } from "../hooks/useUserInfo";
import PostCardLoading from "../component/PostCardLoading";

export default function Home() {
  const [posts, setPosts] = useState<TPost[]>([]);
  const [loading, setLoading] = useState(false);
  const redirect = useNavigate();
  const { userInfo } = useUserInfo();
  useEffect(() => {
    async function getPosts() {
      setLoading(true);
      try {
        const posts: TPost[] = await httpGetAllPosts();
        setPosts(posts);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
    getPosts();
  }, [setLoading]);

  function onGetStartedHandler() {
    if (userInfo === null) {
      return redirect("register");
    } else {
      return redirect("/create-post");
    }
  }

  return (
    <>
      <div className="h-[40vh] w-full flex justify-center items-center">
        <div className="w-[90%] max-w-[900px] mx-auto">
          <h1 className="text-5xl sm:text-7xl font-semibold text-white">
            Start discovering unique stories.
          </h1>
          <h4 className="text-2xl sm:text-4xl font-lightgray text-gray-500">
            Or create your own...
          </h4>
          <button
            onClick={onGetStartedHandler}
            className="my-2 p-3 bg-blue border-2 border-transparent hover:border-blue hover:text-blue hover:bg-transparent rounded-xl font-bold"
          >
            Get Started &#128640;
          </button>
        </div>
      </div>
      <div className="w-[90%] max-w-[900px] mx-auto">
        <>
          {loading === true && (
            <div>
              <PostCardLoading/>
              <PostCardLoading/>
              <PostCardLoading/>
              <PostCardLoading/>
            </div>
          )}
        </>
        <>
          {posts.length > 0 &&
            posts?.map((post) => (
              <PostCard
                id={post._id}
                key={post._id}
                authorname={post.author?.authorname}
                content={post.content}
                title={post.title}
                createdAt={String(post.createdAt)}
              />
            ))}
        </>
      </div>
    </>
  );
}
