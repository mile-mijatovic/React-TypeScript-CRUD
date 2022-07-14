import { Link } from "react-router-dom";
import { List } from "semantic-ui-react";

import IPostData from "../types/Post";

interface Props {
  posts: Array<IPostData>;
}

const OrderedList = ({ posts }: Props) => {
  return (
    <List ordered>
      {posts.map((post) => {
        const capitalized =
          post.title.charAt(0).toUpperCase() + post.title.slice(1);
        return (
          <List.Item key={post.id}>
            <Link to={`${post.id}`}>{capitalized}</Link>
          </List.Item>
        );
      })}
    </List>
  );
};

export default OrderedList;
