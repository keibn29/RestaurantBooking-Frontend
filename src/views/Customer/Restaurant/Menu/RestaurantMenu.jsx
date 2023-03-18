import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import { LANGUAGE, LANGUAGES, NUMBER_MAX_VALUE } from "../../../../utils";
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
import MenuContent from "./MenuContent";

class RestaurantMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.fetchListFoodByRestaurant();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  fetchListFoodByRestaurant = () => {
    const { language, restaurantId } = this.props;
    let data = {
      pageSize: NUMBER_MAX_VALUE,
      pageOrder: 1,
      restaurantId,
    };
    this.props.getListFoodByRestaurant(data, language);
  };

  render() {
    const { language } = this.props;

    return (
      <>
        <Grid className="restaurant-content-title">Menu</Grid>
        <Grid className="restaurant-menu-description mt-3 text-justify">
          Check out the menu at Il Cucciolo Restaurant and explore the popular
          dishes people are craving! From appetizers to something sweet, take a
          look at what’s in store for you when you book a table at Il Cucciolo
          Restaurant. You can even check out the prices so you know what to
          expect, besides the flavours.Browse the menu highlights from Il
          Cucciolo Restaurant and when your mouth starts to water, so you can
          get in on the flavour action. Mmmm we’re getting hungry already…
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
    getListFoodByRestaurant: (data, language) =>
      dispatch(actions.getListFood(data, language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantMenu);
