import { Header } from "semantic-ui-react";

interface Props {
  as: string;
  children: React.ReactNode;
}

const Title = ({ as, children }: Props) => {
  return <Header as={as}>{children}</Header>;
};

export default Title;
