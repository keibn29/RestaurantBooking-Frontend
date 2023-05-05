import React, { Component } from "react";
import { connect } from "react-redux";
import { NAV_DETAIL_RESTAURANT } from "../../../utils";
import { withRouter } from "react-router";
import { Grid } from "@material-ui/core";
import { FormattedMessage } from "react-intl";

class RestaurantNav extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {}

  handleChangeNavSelected = async (navSelected) => {
    if (this.props.history && this.props.restaurantId) {
      await this.props.history.push({
        pathname: `/restaurant/${this.props.restaurantId}`,
        hash: navSelected,
      });
      document.getElementById("restaurant-nav-top").scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  render() {
    const { language, navSelected } = this.props;

    return (
      <>
        <Grid
          container
          justify="space-evenly"
          className="restaurant-nav-container"
        >
          <Grid
            className={
              navSelected === NAV_DETAIL_RESTAURANT.ABOUT
                ? "nav-item nav-active"
                : "nav-item"
            }
            onClick={() => {
              this.handleChangeNavSelected(NAV_DETAIL_RESTAURANT.ABOUT);
            }}
          >
            <FormattedMessage id="customer.restaurant.about.about" />
            {navSelected === NAV_DETAIL_RESTAURANT.ABOUT && <hr />}
          </Grid>
          <Grid
            className={
              navSelected === NAV_DETAIL_RESTAURANT.MENU
                ? "nav-item nav-active"
                : "nav-item"
            }
            onClick={() => {
              this.handleChangeNavSelected(NAV_DETAIL_RESTAURANT.MENU);
            }}
          >
            <FormattedMessage id="customer.restaurant.menu.menu" />
            {navSelected === NAV_DETAIL_RESTAURANT.MENU && <hr />}
          </Grid>
          <Grid
            className={
              navSelected === NAV_DETAIL_RESTAURANT.PHOTOS
                ? "nav-item nav-active"
                : "nav-item"
            }
            onClick={() => {
              this.handleChangeNavSelected(NAV_DETAIL_RESTAURANT.PHOTOS);
            }}
          >
            <FormattedMessage id="customer.restaurant.photos.photo" />
            {navSelected === NAV_DETAIL_RESTAURANT.PHOTOS && <hr />}
          </Grid>
          <Grid
            className={
              navSelected === NAV_DETAIL_RESTAURANT.REVIEWS
                ? "nav-item nav-active"
                : "nav-item"
            }
            onClick={() => {
              this.handleChangeNavSelected(NAV_DETAIL_RESTAURANT.REVIEWS);
            }}
          >
            <FormattedMessage id="customer.restaurant.reviews.review" />
            {navSelected === NAV_DETAIL_RESTAURANT.REVIEWS && <hr />}
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RestaurantNav)
);
