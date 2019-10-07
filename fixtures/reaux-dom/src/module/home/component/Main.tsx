import React from "react";
import { connect } from "react-redux";

interface Props {
  name: string;
}

class Main extends React.PureComponent<Props> {
  render() {
    console.info(this.props);
    return <div>{this.props.name}</div>;
  }
}

const mapStateToProps = (state:any): Props => {
  return {
    name: state.app.home.name
  };
};

export default connect(mapStateToProps)(Main);
