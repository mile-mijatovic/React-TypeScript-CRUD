import { Routes, Route, Navigate } from "react-router-dom";

import Posts from "./pages/Posts";
import Post from "./pages/Post";
import NewPost from "./pages/NewPost";
import EditPost from "./pages/EditPost";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="posts" element={<Posts />}>
        <Route path=":id" element={<Post />} />
      </Route>
      <Route path="posts/:id/edit" element={<EditPost />} />
      <Route path="new-post" element={<NewPost />} />
      <Route path="*" element={<Navigate to="/posts" />} />
    </Routes>
  );
};

export default AppRoutes;
