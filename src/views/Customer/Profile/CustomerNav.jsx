import React, { Component } from "react";
import { connect } from "react-redux";
import { NAV_CUSTOMER_PROFILE, PATH } from "../../../utils";
import * as actions from "../../../store/actions";
import { withRouter } from "react-router";
import HomeHeader from "../Homepage/HomeHeader/HomeHeader";
import HomeFooter from "../Homepage/HomeFooter/HomeFooter";
import {
  Grid,
  IconButton,
  Icon,
  Button,
  InputAdornment,
  Input,
  TablePagination,
  MenuItem,
  TextField,
  InputLabel,
  Box,
  FormControl,
  Container,
} from "@material-ui/core";

class CustomerNav extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {}

  handleChangeCustomerProfileNavSelected = (navSelected) => {
    if (this.props.history) {
      this.props.history.push({
        pathname: PATH.BOOKING_HISTORY,
        state: navSelected,
      });
    }
  };

  render() {
    const { customerLogout, navSelected } = this.props;

    return (
      <>
        <Grid className="customer-nav-container">
          <Grid className="nav-infor">
            <Grid className="nav-infor-avatar background-image-center-cover"></Grid>
            <Grid className="nav-infor-text">Welcome, Long</Grid>
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
            Reservations
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
            Account
          </Grid>
          <Grid
            className="nav-item logout"
            onClick={customerLogout}
            container
            justify="space-between"
            alignItems="center"
          >
            <span>Log out</span>
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
