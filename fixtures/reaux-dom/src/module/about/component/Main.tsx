import React from "react";
import { connect,DispatchProp } from "react-redux";

interface StateProps {
  name: string;
}
interface Props extends StateProps,DispatchProp {
}

class Main extends React.PureComponent<Props> {
  render() {
    console.info(this.props);
    return (
      <div>
        {this.props.name}
        <button
          onClick={() =>
            this.props.dispatch({
              type: "setState",
              name: "about",
              payload: {
                name: "new about"
              }
            })
          }
        >
          change
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state:any): StateProps => {
  return {
    name: state.app.about.name
  };
};

export default connect(mapStateToProps)(Main);
