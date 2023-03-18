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
import ReviewContent from "./ReviewContent";

class RestaurantReview extends Component {
  render() {
    const { language } = this.props;

    return (
      <>
        <Grid className="restaurant-content-title">Reviews (369)</Grid>
        <Grid className="restaurant-review-description mt-3 text-justify">
          Read what people think about Il Cucciolo Restaurant. All restaurant
          reviews are written by verified Quandoo diners. Learn more about Il
          Cucciolo Restaurant before you go by getting tips and ratings from
          other restaurant-goers. With real-life reviews, you can see what other
          diners loved about Il Cucciolo Restaurant and book a table with
          confidence!
        </Grid>
        <ReviewContent />
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

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantReview);
