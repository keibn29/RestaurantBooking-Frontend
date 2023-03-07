import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import ManageUser from "../views/System/Admin/ManageUser";
import ManageRestaurant from "../views/System/Admin/ManageRestaurant";
import Header from "../views/System/Header/Header";

class System extends Component {
  render() {
    const { systemMenuPath, isLoggedInSystem } = this.props;
    return (
      <>
        {isLoggedInSystem && <Header />}
        <div className="system-container">
          <div className="system-list">
            <Switch>
              <Route path="/system/manage-user" component={ManageUser} />
              <Route
                path="/system/manage-restaurant"
                component={ManageRestaurant}
              />

              <Route
                component={() => {
                  return <Redirect to={systemMenuPath} />;
                }}
              />
            </Switch>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    isLoggedInSystem: state.user.isLoggedInSystem,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
