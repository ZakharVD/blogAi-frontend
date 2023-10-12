import { Route, Routes } from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import EditPost from "./pages/EditPost";
import Alert from "./component/Alert";
import Loading from "./component/Loading";
import MyPosts from "./pages/MyPosts";

export default function App() {
  return (
   <> 
   <Alert/>
   <Loading/>
     <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/create-post" element={<CreatePost/>}/>
        <Route path="/:postId" element={<Post/>}/>
        <Route path="/edit/:postId" element={<EditPost/>}/>
        <Route path="/my-posts" element={<MyPosts/>}/>
      </Route>
    </Routes>
   </>
  );
}
