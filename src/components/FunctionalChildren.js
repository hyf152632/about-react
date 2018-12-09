import React, { Component } from "react";
import { ShowName } from "./pattern/RenderProps";

class FunctionalChildren extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "andy huo"
    };
  }

  render() {
    const { children } = this.props;
    const state = this.state;
    return <div>{children(state)}</div>;
  }
}

const FunctionalChildrenShowName = () => (
  <FunctionalChildren>
    {data => <ShowName name={data.name} />}
  </FunctionalChildren>
);

export default FunctionalChildrenShowName;
