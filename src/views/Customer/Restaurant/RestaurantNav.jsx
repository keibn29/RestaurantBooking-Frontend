import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { LANGUAGES, NAV_DETAIL_RESTAURANT } from "../../../utils";
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
import ReviewContent from "./Reviews/ReviewContent";
import MenuContent from "./Menu/MenuContent";

class RestaurantNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navSelected: "",
    };
  }

  componentDidMount() {
    this.getNavSelectedFromParent();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.navSelected !== this.props.navSelected) {
      this.setState({
        navSelected: this.props.navSelected,
      });
    }
  }

  getNavSelectedFromParent = () => {
    this.setState({
      navSelected: this.props.navSelected,
    });
  };

  handleChangeNavSelected = (navSelected) => {
    this.props.handleChangeNavSelected(navSelected);
    const element = document.getElementById("detail-restaurant-top");
    element.scrollIntoView({
      behavior: "smooth",
    });
  };

  render() {
    const { language } = this.props;
    const { navSelected } = this.state;

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
            About
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
            Menu
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
            Photos
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
            Reviews
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

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantNav);
