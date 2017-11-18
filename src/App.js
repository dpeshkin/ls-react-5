import React, { Component } from "react";
import { Link, Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import { addListener, removeListener, isAuthorized } from "./AuthorizeApi";
import Private from "./Private";
import Home from "./Home";
import Auth from "./Auth";
import Public from "./Public";

class App extends Component {
  state = {
    isAuthorized
  };

  componentDidMount() {
    addListener(this.handleAuthorize);
  }

  componentWillUnmount() {
    removeListener(this.handleAuthorize);
  }

  handleAuthorize = isAuthorized => {
    this.setState({ isAuthorized });
  };

  render() {
    const isAuthorized = this.state.isAuthorized;
    return (
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Главная</Link>
            </li>
            <li>
              <Link to="/auth">Авторизоваться</Link>
            </li>
            <li>
              <Link to="/private">Секретная страница</Link>
            </li>
            <li>
              <Link to="/public">Публичная страница</Link>
            </li>
          </ul>
        </nav>
        <hr />
        <Switch>
          <Route exact path="/" component={Home} />
          {isAuthorized ? (
            <Route path="/private" component={Private} />
          ) : (
            <Redirect from="/private" to="/auth" />
          )}
          <Route
            path="/auth"
            render={props => <Auth {...props} isAuthorized={isAuthorized} />}
          />
          <Route path="/public" component={Public} />
          <Redirect from="*" to="/" />
        </Switch>
      </div>
    );
  }
}

export default App;
