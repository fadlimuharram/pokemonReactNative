import React from "react";
import { connect } from "react-redux";
import { logout } from "../_redux/actions/users";
export default WrappedComponent => {
  class HOC extends React.Component {
    componentDidMount() {
      this.props.navigation.addListener("didFocus", () => {
        this.isAuthenticated();
      });
    }

    isAuthenticated = () => {
      if (!this.props.isLoadingUser) {
        if (!this.props.isLoggedIn) {
          this.props.navigation.navigate("AuthStack");
        }
      }
    };

    render() {
      this.isAuthenticated();

      return <WrappedComponent {...this.props} />;
    }
  }

  const mapStateToProps = state => {
    return {
      isLoggedIn: state.users.isLoggedIn,
      isLoadingUser: state.users.isLoading,
      socket_access_token: state.users.access_token.token,
      user: state.users.data,
      access_token:
        state.users.access_token.type + " " + state.users.access_token.token
    };
  };

  return connect(mapStateToProps)(HOC);
};
