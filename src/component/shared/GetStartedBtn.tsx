import { useNavigate } from "react-router-dom";
import { useUserInfo } from "../../hooks/useUserInfo";

export default function GetStartedBtn() {
  const { userInfo } = useUserInfo();
  const redirect = useNavigate();
  function onGetStartedHandler() {
    if (userInfo === null) {
      return redirect("register");
    } else {
      return redirect("/create-post");
    }
  }
  return (
    <button
      onClick={onGetStartedHandler}
      className="my-2 p-3 bg-blue border-2 border-transparent hover:border-blue hover:text-blue hover:bg-transparent rounded-xl font-bold"
    >
      Get Started &#128640;
    </button>
  );
}
