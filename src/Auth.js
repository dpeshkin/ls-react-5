import React, { Component } from "react";
import { authorizeUser } from "./AuthorizeApi";
import { Redirect } from "react-router-dom";

class Auth extends Component {
  constructor(props) {
    super(props);
    const initialState = this.props.isAuthorized;
    this.state = {
      email: "",
      password: "",
      isAuthorized: initialState,
      error: false
    };
  }
  handleOnChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    // e.preventDefault();
    const { email, password } = this.state;
    authorizeUser(email, password);
    this.setState({ error: !this.state.isAuthorized });
  };

  componentWillReceiveProps = nextProps =>
    this.setState({ isAuthorized: nextProps.isAuthorized });

  render() {
    const { isAuthorized, error } = this.state;
    return isAuthorized ? (
      <Redirect from="/auth" to="/" />
    ) : (
      <form action="">
        <input
          type="text"
          name="email"
          placeholder="email"
          onChange={this.handleOnChange}
        />
        <input
          type="text"
          name="password"
          placeholder="password"
          onChange={this.handleOnChange}
        />
        <button type="button" onClick={this.handleSubmit}>
          Войти
        </button>
        {error && <p className="error">Неправильно введен email/пароль</p>}
      </form>
    );
  }
}

export default Auth;
