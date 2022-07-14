import { Message } from "semantic-ui-react";

interface Props {
  error?: boolean;
  success?: boolean;
  title: string;
  text: string;
}

const Notification = ({ text, title, error, success }: Props) => {
  return (
    <Message error={error} success={success} header={title} content={text} />
  );
};

export default Notification;
