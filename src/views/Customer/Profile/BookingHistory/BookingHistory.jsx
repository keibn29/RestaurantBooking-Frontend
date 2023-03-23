import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../Homepage/HomeHeader/HomeHeader";
import HomeFooter from "../../Homepage/HomeFooter/HomeFooter";
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
import "./BookingHistory.scss";

class BookingHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {}
  render() {
    const {} = this.state;

    return (
      <>
        <Grid className="booking-history-container">
          <Grid className="customer-profile-title">Reservations</Grid>
          <Grid className="list-booking"></Grid>
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingHistory);
