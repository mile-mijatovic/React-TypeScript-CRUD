import React from "react";

import { useParams } from "react-router-dom";

import PostService from "../services/Post.service";
import IPostData from "../types/Post";

import Title from "../components/Title";
import Spinner from "../components/Spinner";
import Notification from "../components/Notification";

import { Button } from "semantic-ui-react";

const Post: React.FC = () => {
  const { id } = useParams();
  const [post, setPost] = React.useState<IPostData>();
  const [loading, setLoading] = React.useState<Boolean>(false);
  const [message, setMessage] = React.useState<any>({
    type: "error" || "success",
    text: "",
  });

  const fetchPostById = async (id: string) => {
    setLoading(true);
    try {
      const response = await PostService.getPost(id as string);
      setPost(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const deletePost = async () => {
    setLoading(true);
    try {
      await PostService.deletePost(id as string);
      setLoading(false);
      setMessage({ type: "success", text: "Post deleted successfully" });
    } catch (error) {
      {
        error instanceof Error
          ? setMessage({ type: "error", text: error.message })
          : setMessage({ type: "error", text: "" });
      }
      setLoading(false);
    }
  };

  React.useEffect(() => {
    {
      id && fetchPostById(id);
    }
  }, [id]);

  return (
    <>
      <Title as="h2">Post details</Title>
      {loading && <Spinner>Fetching post details...</Spinner>}
      <Title as="h3">
        {post?.id}. {post?.title}
      </Title>
      <p>{post?.body}</p>

      <Button.Group>
        <Button>Edit</Button>
        <Button.Or />
        <Button color="red" onClick={deletePost}>
          Delete
        </Button>
      </Button.Group>
      {message.text && (
        <Notification
          error={message.type === "error"}
          success={message.type === "success"}
          title={message.type === "error" ? "Error" : "Success"}
          text={message.text}
        />
      )}
    </>
  );
};

export default Post;
