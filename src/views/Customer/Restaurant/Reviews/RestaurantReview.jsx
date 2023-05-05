import React, { Component } from "react";
import { connect } from "react-redux";
import { PAGE_SIZE_PAGINATION } from "../../../../utils";
import { Grid } from "@material-ui/core";
import ReviewContent from "./ReviewContent";
import { FormattedMessage } from "react-intl";

class RestaurantReview extends Component {
  render() {
    const { restaurantId, totalReview } = this.props;

    return (
      <>
        <Grid className="restaurant-content-title">
          <FormattedMessage id="customer.restaurant.reviews.review" /> (
          {totalReview})
        </Grid>
        <Grid className="restaurant-review-description mt-3 text-justify">
          <FormattedMessage id="customer.restaurant.reviews.review-description" />
        </Grid>
        <ReviewContent
          restaurantId={restaurantId}
          pageSize={PAGE_SIZE_PAGINATION}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    totalReview: state.restaurant.totalReview,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantReview);
