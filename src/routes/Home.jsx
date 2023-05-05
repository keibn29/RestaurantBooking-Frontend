import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { PATH } from "../utils";

class Home extends Component {
  render() {
    let linkToRedirect = PATH.HOMEPAGE;

    return <Redirect to={linkToRedirect} />;
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
