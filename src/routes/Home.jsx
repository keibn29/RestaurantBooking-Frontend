import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { PATH } from "../utils";

class Home extends Component {
  render() {
    const { isLoggedInSystem } = this.props;
    let linkToRedirect = isLoggedInSystem
      ? "/system/manage-user"
      : PATH.HOMEPAGE;

    // let linkToRedirect = PATH.HOMEPAGE;

    return <Redirect to={linkToRedirect} />;
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedInSystem: state.user.isLoggedInSystem,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
