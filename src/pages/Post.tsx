import React from "react";

import { useParams } from "react-router-dom";

import PostService from "../services/Post.service";
import IPostData from "../types/Post";

import Title from "../components/Title";
import Spinner from "../components/Spinner";

import { Button } from "semantic-ui-react";

const Post: React.FC = () => {
  const { id } = useParams();
  const [post, setPost] = React.useState<IPostData>();
  const [loading, setLoading] = React.useState<Boolean>(false);

  const fetchPostById = async (id: string) => {
    setLoading(true);
    try {
      const response = await PostService.getPost(id);
      setPost(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
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
        <Button color="red">Delete</Button>
      </Button.Group>
    </>
  );
};

export default Post;
