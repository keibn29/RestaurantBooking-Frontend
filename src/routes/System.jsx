import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import UserManagement from "../views/System/Admin/UserManagement";
import RestaurantManagement from "../views/System/Admin/RestaurantManagement";
import Header from "../views/System/Header/Header";
import FoodManagement from "../views/System/Admin/FoodManagement";
import ScheduleManagement from "../views/System/RestaurantManager/ScheduleManagement";

class System extends Component {
  render() {
    const { systemMenuPath, isLoggedInSystem } = this.props;
    return (
      <>
        {isLoggedInSystem && <Header />}
        <div className="system-container">
          <div className="system-list">
            <Switch>
              <Route path="/system/manage-user" component={UserManagement} />
              <Route
                path="/system/manage-restaurant"
                component={RestaurantManagement}
              />
              <Route path="/system/manage-food" component={FoodManagement} />
              <Route
                path="/system/manage-schedule"
                component={ScheduleManagement}
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
