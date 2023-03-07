import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { LANGUAGE, NAV_DETAIL_RESTAURANT } from "../../../utils";
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
import "./RestaurantGeneralInformation.scss";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

class RestaurantGeneralInformation extends Component {
  render() {
    return (
      <>
        <Grid className="restaurant-general-container">
          <Grid className="restaurant-general-top">
            <Grid className="restaurant-general-top-left">
              <Grid className="restaurant-name">Great Nepalese Restaurant</Grid>
              <Grid className="restaurant-province-country">
                Hà Nội &bull; <span className="country">Nhật Bản</span>
              </Grid>
              <Grid className="restaurant-average-price">
                Giá trung bình: £9
              </Grid>
            </Grid>
            <Grid className="restaurant-general-top-right">
              <Grid className="score">
                4.5/<span>5</span>
              </Grid>
              <Grid className="number-review">100 reviews</Grid>
            </Grid>
          </Grid>
          <Grid className="restaurant-general-center background-image-center-cover"></Grid>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantGeneralInformation);
