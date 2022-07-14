import React from "react";

import { Dimmer, Loader } from "semantic-ui-react";

interface Props {
  children: React.ReactNode;
}

const Spinner = ({ children }: Props) => {
  return (
    <Dimmer active inverted>
      <Loader>{children}</Loader>
    </Dimmer>
  );
};

export default Spinner;
