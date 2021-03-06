import { useState, ChangeEvent } from "react";
import { Container, Button, Form } from "semantic-ui-react";
import { v4 as uuid } from "uuid";

import PostService from "../services/Post.service";
import IPostData from "../types/Post";

import Notification from "../components/Notification";

const AddPost = () => {
  const initialPostData: IPostData = {
    id: uuid(),
    title: "",
    body: "",
  };

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
            Submit
          </Button>
        </Form>
        {submitted ? (
          <>
            <Notification success title="Success" text="Post created" />
            {console.log(post)}
            <pre>{JSON.stringify(post, null, 4)}</pre>
          </>
        ) : null}
      </>
    </Container>
  );
};

export default AddPost;
