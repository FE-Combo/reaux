import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Main as AboutMain } from "module/about";
import { Main as HomeMain } from "module/home";

class Main extends React.PureComponent {
  render() {
    return (
      <div>
        <div>
          <a onClick={() => (location.href = "/home")}>Home</a>
          <a onClick={() => (location.href = "/about")}>About</a>
        </div>
        <Router>
          <Switch>
            <Route
              exact
              path="/home"
              render={props => <HomeMain {...props} />}
            />
            <Route
              exact
              path="/about"
              render={props => <AboutMain {...props} />}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default Main;
