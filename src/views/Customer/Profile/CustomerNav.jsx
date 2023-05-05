import React, { Component } from "react";
import { connect } from "react-redux";
import { NAV_CUSTOMER_PROFILE, PATH } from "../../../utils";
import * as actions from "../../../store/actions";
import { withRouter } from "react-router";
import { Grid } from "@material-ui/core";
import { FormattedMessage } from "react-intl";

class CustomerNav extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {}

  handleChangeCustomerProfileNavSelected = async (navSelected) => {
    if (this.props.history) {
      await this.props.history.push({
        pathname: PATH.BOOKING_HISTORY,
        hash: navSelected,
      });
      document.getElementById("customer-profile-top").scrollIntoView();
    }
  };

  handleCustomerLogout = () => {
    this.props.customerLogout();
    if (this.props.history) {
      this.props.history.push(PATH.HOMEPAGE);
    }
  };

  render() {
    const { navSelected, customerInfo } = this.props;

    return (
      <>
        <Grid className="customer-nav-container">
          <Grid className="nav-infor">
            <Grid
              className="nav-infor-avatar background-image-center-cover"
              style={
                customerInfo.avatar
                  ? {
                      backgroundImage: `url(${
                        process.env.REACT_APP_BACKEND_URL + customerInfo.avatar
                      })`,
                    }
                  : {}
              }
            ></Grid>
            <Grid className="nav-infor-text">
              <FormattedMessage id="customer.homepage.chat-real-time.hello" />,{" "}
              {customerInfo.firstName}
            </Grid>
          </Grid>
          <Grid
            className={
              navSelected === NAV_CUSTOMER_PROFILE.RESERVATION
                ? "nav-active nav-item mt-4"
                : "nav-item mt-4"
            }
            container
            justify="space-between"
            alignItems="center"
            onClick={() => {
              this.handleChangeCustomerProfileNavSelected(
                NAV_CUSTOMER_PROFILE.RESERVATION
              );
            }}
          >
            <FormattedMessage id="customer.homepage.home-header.booking-history" />
          </Grid>
          <Grid
            className={
              navSelected === NAV_CUSTOMER_PROFILE.ACCOUNT
                ? "nav-active nav-item"
                : "nav-item"
            }
            container
            justify="space-between"
            alignItems="center"
            onClick={() => {
              this.handleChangeCustomerProfileNavSelected(
                NAV_CUSTOMER_PROFILE.ACCOUNT
              );
            }}
          >
            <FormattedMessage id="customer.homepage.home-header.account-information" />
          </Grid>
          <Grid
            className="nav-item logout"
            onClick={() => {
              this.handleCustomerLogout();
            }}
            container
            justify="space-between"
            alignItems="center"
          >
            <span>
              <FormattedMessage id="customer.homepage.home-header.logout" />
            </span>
            <i className="fas fa-sign-out-alt"></i>
          </Grid>
        </Grid>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    customerInfo: state.user.customerInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    customerLogout: () => dispatch(actions.customerLogout()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CustomerNav)
);
