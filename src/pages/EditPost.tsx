import { useState, useEffect, ChangeEvent } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Container, Button, Form } from "semantic-ui-react";

import PostService from "../services/Post.service";
import IPostData from "../types/Post";

import Spinner from "../components/Spinner";
import Notification from "../components/Notification";

const EditPost = () => {
  const { id } = useParams();

  const initialPostData = {
    id: "",
    title: "",
    body: "",
  };

  const [post, setPost] = useState<IPostData>(initialPostData);
  const [loading, setLoading] = useState<Boolean>(false);
  const [error, setError] = useState<string>("");
  const [submitted, setSubmitted] = useState<Boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const handleSubmit = async () => {
    const data = {
      title: post.title,
      body: post.body,
    };

    try {
      await PostService.updatePost(post.id, data);
      setSubmitted(true);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPost = async () => {
    setLoading(true);
    try {
      const response = await PostService.getPost(id as string);
      setPost(response.data);
      setLoading(false);
    } catch (error) {
      {
        error instanceof Error ? setError(error.message) : setError("");
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <Container>
      <>
        {loading && <Spinner>Fetching post details...</Spinner>}
        <Form>
          <Form.Field>
            <label>Id</label>
            <input name="id" value={post.id} disabled />
          </Form.Field>
          <Form.Field>
            <label>Title</label>
            <input
              name="title"
              placeholder="Title"
              onChange={handleChange}
              defaultValue={post.title}
            />
          </Form.Field>
          <Form.Field>
            <label>Body</label>
            <input
              placeholder="Body"
              name="body"
              onChange={handleChange}
              defaultValue={post.body}
            />
          </Form.Field>
          <Button type="submit" onClick={handleSubmit}>
            Edit
          </Button>
        </Form>
        {submitted ? (
          <Notification success title="Success" text="Post updated" />
        ) : null}
      </>
    </Container>
  );
};

export default EditPost;
