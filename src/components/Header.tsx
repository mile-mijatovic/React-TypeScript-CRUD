import { Icon, Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Menu>
      <Menu.Item>
        <Link to="/">
          <Icon name="paper plane outline" size="large" />
        </Link>
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item>
          <Link to="/new-post">New post</Link>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default Header;
