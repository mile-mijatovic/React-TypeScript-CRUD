import axios from "axios";

// Axios instance
const API = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Get posts (limit 10)
export const getPosts = () => API.get("/posts?_start=0&_limit=10");

// Get post by id
export const getPost = (id: string) => API.get(`/posts/${id}`);

// Create post
export const createPost = (post: any) => API.post("/posts", post);

// Update post
export const updatePost = (post: any) => API.put(`/posts/${post.id}`, post);

// Delete post
export const deletePost = (id: number) => API.delete(`/posts/${id}`);

const PostService = {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
};

export default PostService;
