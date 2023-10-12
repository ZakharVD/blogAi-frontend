import { useEffect, useState } from "react";
import { TPost } from "../types/post.types";
import PostCard from "../component/PostCard";
import { httpGetAllPosts } from "../api/posts.api";
import PostCardLoading from "../component/PostCardLoading";
import GetStartedBtn from "../component/shared/GetStartedBtn";

export default function Home() {
  const [posts, setPosts] = useState<TPost[]>([]);
  const [loading, setLoading] = useState(false);
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
          <GetStartedBtn/>
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
