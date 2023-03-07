import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { LANGUAGE } from "../../../utils";
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
import {
  CalendarToday,
  QueryBuilder,
  PeopleAltOutlined,
  ExpandMore,
  ExpandLess,
  ChevronLeft,
  ChevronRight,
} from "@material-ui/icons";
import "./RestaurantSchedule.scss";

class RestaurantSchedule extends Component {
  render() {
    return (
      <>
        <Grid className="restaurant-schedule-container">
          <Grid className="restaurant-content-title">Book a table</Grid>
          <Grid className="restaurant-schedule-infor people">
            <Grid>
              <PeopleAltOutlined className="material-icon" />
              <span>2 people</span>
            </Grid>
            <ExpandMore className="drop-down" />
          </Grid>
          <Grid className="restaurant-schedule-infor date">
            <Grid>
              <CalendarToday className="material-icon" />
              <span>Today (Saturday)</span>
            </Grid>
            <ExpandMore className="drop-down" />
          </Grid>
          <Grid className="restaurant-schedule-infor time">
            <Grid>
              <QueryBuilder className="material-icon" />
              Choose a time:
              <Grid container spacing={2} className="list-schedule">
                <Grid item xs={4}>
                  <Grid className="schedule-content time-active">11:00</Grid>
                </Grid>
                <Grid item xs={4}>
                  <Grid className="schedule-content">11:00</Grid>
                </Grid>
                <Grid item xs={4}>
                  <Grid className="schedule-content">11:00</Grid>
                </Grid>
                <Grid item xs={4}>
                  <Grid className="schedule-content">11:00</Grid>
                </Grid>
                <Grid item xs={4}>
                  <Grid className="schedule-content">11:00</Grid>
                </Grid>
                <Grid item xs={4}>
                  <Grid className="schedule-content">11:00</Grid>
                </Grid>
                <Grid item xs={4}>
                  <Grid className="schedule-content">11:00</Grid>
                </Grid>
                <Grid item xs={4}>
                  <Grid className="schedule-content">11:00</Grid>
                </Grid>
                <Grid item xs={4}>
                  <Grid className="schedule-content">11:00</Grid>
                </Grid>
                <Grid item xs={4}>
                  <Grid className="schedule-content">11:00</Grid>
                </Grid>
                <Grid item xs={4}>
                  <Grid className="schedule-content">11:00</Grid>
                </Grid>
                <Grid item xs={4}>
                  <Grid className="schedule-content">11:00</Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid className="restaurant-schedule-book">Book now</Grid>
        </Grid>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantSchedule);
