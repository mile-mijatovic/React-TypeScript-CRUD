import React from "react";
import { Outlet } from "react-router-dom";
import { Grid } from "semantic-ui-react";

import PostService from "../services/Post.service";

import IPostData from "../types/Post";

import Title from "../components/Title";
import Spinner from "../components/Spinner";
import Notification from "../components/Notification";
import List from "../components/List";

const PostsList: React.FC = () => {
  const [posts, setPosts] = React.useState<Array<IPostData>>([]);
  const [loading, setLoading] = React.useState<Boolean>(false);
  const [error, setError] = React.useState<string>("");

  React.useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await PostService.getPosts();
      setPosts(response.data);
      setLoading(false);
    } catch (error) {
      {
        error instanceof Error ? setError(error.message) : setError("");
      }
      setLoading(false);
    }
  };

  return (
    <Grid centered>
      {loading && <Spinner>Fetching posts...</Spinner>}
      <Grid.Column mobile={12} tablet={6} computer={5}>
        <Title as="h2">Posts List</Title>
        {error ? (
          <Notification error title="Error" text={error} />
        ) : (
          <List posts={posts} />
        )}
      </Grid.Column>
      <Grid.Column mobile={12} tablet={6} computer={5}>
        <Outlet />
      </Grid.Column>
    </Grid>
  );
};

export default PostsList;
