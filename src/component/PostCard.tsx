import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

type Props = {
  id: string;
  authorname: string;
  content: string;
  title: string;
  createdAt: string;
};

export default function PostCard({
  id,
  authorname,
  content,
  title,
  createdAt,
}: Props) {
    const redirect = useNavigate();
  function onPostClickHandler() {
    return redirect(`/${id}`);
  }
  return (
    <div className="bg-secondary rounded-xl my-4 p-4 w-full cursor-pointer" onClick={onPostClickHandler}>
      <h2 className="text-3xl sm:text-4xl font-bold my-2 hover:underline">{title}</h2>
      <p className="my-2">{`${content.substring(0, 250)}...`}</p>
      <div className="w-full flex justify-between my-2">
        <p className="font-light">{authorname}</p>
        <p className="font-light">
          {format(new Date(createdAt), "MMM d, yyyy")}
        </p>
      </div>
    </div>
  );
}

// to={`/${id}`}
