import { useState, useRef, ChangeEvent } from "react";
import { Container, Button, Form } from "semantic-ui-react";

import PostService from "../services/Post.service";
import IPostData from "../types/Post";

import Notification from "../components/Notification";

const initialPostData: IPostData = {
  id: null,
  title: "",
  body: "",
};

const AddPost = () => {
  const ref = useRef<HTMLTextAreaElement>(null);

  const [post, setPost] = useState<IPostData>(initialPostData);
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
      await PostService.createPost(data);
      setSubmitted(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <>
        <Form>
          <Form.Field>
            <label>Title</label>
            <input name="title" placeholder="Title" onChange={handleChange} />
          </Form.Field>
          <Form.Field>
            <label>Body</label>
            <input placeholder="Body" name="body" onChange={handleChange} />
          </Form.Field>
          <Button type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
        {submitted ? (
          <Notification success title="Success" text="Post created" />
        ) : null}
      </>
    </Container>
  );
};

export default AddPost;
