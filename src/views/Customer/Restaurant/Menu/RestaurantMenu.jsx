import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import { NUMBER_MAX_VALUE } from "../../../../utils";
import { Grid } from "@material-ui/core";
import MenuContent from "./MenuContent";
import { FormattedMessage } from "react-intl";

class RestaurantMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    setTimeout(() => {
      this.fetchListDishByRestaurant();
    }, 300);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  fetchListDishByRestaurant = () => {
    const { language, restaurantId } = this.props;
    let data = {
      pageSize: NUMBER_MAX_VALUE,
      pageOrder: 1,
      restaurantId,
    };
    this.props.getListDishByRestaurant(data, language);
  };

  render() {
    return (
      <>
        <Grid className="restaurant-content-title">
          <FormattedMessage id="customer.restaurant.menu.menu" />
        </Grid>
        <Grid className="restaurant-menu-description mt-3 text-justify">
          <FormattedMessage id="customer.restaurant.menu.menu-description" />
        </Grid>
        <MenuContent />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListDishByRestaurant: (data, language) =>
      dispatch(actions.getListDish(data, language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantMenu);
