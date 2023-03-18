import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import { LANGUAGE, LANGUAGES } from "../../../../utils";
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
import "./RestaurantPhoto.scss";

class RestaurantPhoto extends Component {
  render() {
    const { language } = this.props;

    return (
      <>
        <Grid className="restaurant-photo-container">
          <Grid className="restaurant-content-title">Photos (5)</Grid>
          <Grid className="restaurant-photo-description mt-3 text-justify">
            Looking for pictures of the food and vibe at Il Cucciolo Restaurant?
            Take a peek at these real-life photos and images of the atmosphere
            and dishes at Il Cucciolo Restaurant so you know what to expect for
            your next reservation.
          </Grid>
          <Grid className="list-photo">
            <Grid className="photo-content w-100 background-image-center-cover"></Grid>
            <Grid className="photo-content w-100 background-image-center-cover"></Grid>
            <Grid className="photo-content w-100 background-image-center-cover"></Grid>
            <Grid className="photo-content w-100 background-image-center-cover"></Grid>
            <Grid className="photo-content w-100 background-image-center-cover"></Grid>
          </Grid>
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

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantPhoto);
