import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import UserManagement from "../views/System/Admin/UserManagement";
import RestaurantManagement from "../views/System/Admin/RestaurantManagement";
import Header from "../views/System/Header/Header";
import DishManagement from "../views/System/Admin/DishManagement";
import ScheduleManagement from "../views/System/RestaurantManager/ScheduleManagement";
import { SYSTEM_PATH, USER_ROLE } from "../utils";
import BookingManagement from "../views/System/RestaurantManager/BookingManagement";
import CustomerSupport from "../views/System/Admin/CustomerSupport";
import HandbookManagement from "../views/System/Admin/HandbookManagement";

class System extends Component {
  render() {
    const { isLoggedInSystem, userInfo } = this.props;
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
                path={SYSTEM_PATH.CUSTOMER_SUPPORT}
                component={CustomerSupport}
              />
              <Route
                path={SYSTEM_PATH.HANDBOOK_MANAGEMENT}
                component={HandbookManagement}
              />

              <Route
                component={() => {
                  const redirectLink =
                    userInfo.roleId === USER_ROLE.RESTAURANT_MANAGER
                      ? SYSTEM_PATH.DISH_MANAGEMENT
                      : SYSTEM_PATH.USER_MANAGEMENT;
                  return <Redirect to={redirectLink} />;
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
    isLoggedInSystem: state.user.isLoggedInSystem,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
