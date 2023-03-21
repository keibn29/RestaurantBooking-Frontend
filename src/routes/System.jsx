import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import UserManagement from "../views/System/Admin/UserManagement";
import RestaurantManagement from "../views/System/Admin/RestaurantManagement";
import Header from "../views/System/Header/Header";
import DishManagement from "../views/System/Admin/DishManagement";
import ScheduleManagement from "../views/System/RestaurantManager/ScheduleManagement";
import { SYSTEM_PATH } from "../utils";
import BookingManagement from "../views/System/RestaurantManager/BookingManagement";

class System extends Component {
  render() {
    const { systemMenuPath, isLoggedInSystem } = this.props;
    return (
      <>
        {isLoggedInSystem && <Header />}
        <div className="system-container">
          <div className="system-list">
            <Switch>
              <Route
                path={SYSTEM_PATH.USER_MANAGEMENT}
                component={UserManagement}
              />
              <Route
                path={SYSTEM_PATH.RESTAURANT_MANAGEMENT}
                component={RestaurantManagement}
              />
              <Route
                path={SYSTEM_PATH.DISH_MANAGEMENT}
                component={DishManagement}
              />
              <Route
                path={SYSTEM_PATH.SCHEDULE_MANAGEMENT}
                component={ScheduleManagement}
              />
              <Route
                path={SYSTEM_PATH.BOOKING_MANAGEMENT}
                component={BookingManagement}
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
