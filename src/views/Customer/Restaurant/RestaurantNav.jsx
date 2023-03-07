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
import { Language, Phone, PinDropOutlined } from "@material-ui/icons";
import ReviewContent from "./ReviewContent";
// import "./RestaurantNav.scss";
import MenuContent from "./MenuContent";

class RestaurantNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navSelected: NAV_DETAIL_RESTAURANT.ABOUT,
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {}

  handleChangeNavSelected = (navSelected) => {
    this.props.changeNavSelectedFromParent(navSelected);
    this.setState({
      navSelected: navSelected,
    });
    const element = document.getElementById("top");
    // element.scrollIntoView({
    //   behavior: "smooth",
    //   block: "end",
    // });
    element.scrollTo(0, 500);
  };

  render() {
    let { language } = this.props;
    let { navSelected } = this.state;

    return (
      <>
        <Grid className="restaurant-nav-container">
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
