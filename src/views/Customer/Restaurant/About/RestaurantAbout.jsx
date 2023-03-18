import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import {
  isExistArrayAndNotEmpty,
  LANGUAGE,
  LANGUAGES,
  NAV_DETAIL_RESTAURANT,
  TIMETYPE,
} from "../../../../utils";
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
import moment from "moment";
import "moment/locale/vi";
import "./RestaurantAbout.scss";
import ReviewContent from "../Reviews/ReviewContent";
import MenuContent from "../Menu/MenuContent";
import ScheduleNextWeek from "./ScheduleNextWeek";

class RestaurantAbout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDay: [],
    };
  }

  componentDidMount() {
    if (this.props.restaurantId) {
      this.fetchListFoodByRestaurant();
    }
    let listDayNextWeek = this.customDayShowNextWeek();
    this.setState({
      listDay: listDayNextWeek,
    });
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.restaurantId !== this.props.restaurantId) {
      this.fetchListFoodByRestaurant();
    }
  }

  customDayShowNextWeek = () => {
    let listDay = [];

    for (let i = 0; i < 7; i++) {
      let obj = {};
      let labelViToday = `Hôm nay`;
      let labelEnToday = `Today`;

      let labelViNext = moment(new Date()).add(i, "days").format("dddd");
      let labelEnNext = moment(new Date())
        .add(i, "days")
        .locale("en")
        .format("dddd");

      // let labelVi = i === 0 ? labelViToday : labelViNext;
      // let labelEn = i === 0 ? labelEnToday : labelEnNext;
      // obj.label =
      //   language === LANGUAGES.VI
      //     ? this.capitalizeFirstLetter(labelVi)
      //     : labelEn;
      obj.labelVi =
        i === 0
          ? this.capitalizeFirstLetter(labelViToday)
          : this.capitalizeFirstLetter(labelViNext);
      obj.labelEn = i === 0 ? labelEnToday : labelEnNext;
      obj.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
      listDay.push(obj);
    }

    return listDay;
  };

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  fetchListFoodByRestaurant = () => {
    const { language, restaurantId } = this.props;
    let data = {
      pageSize: 2,
      pageOrder: 1,
      restaurantId: +restaurantId,
    };
    this.props.getListFoodByRestaurant(data, language);
  };

  handleChangeNavSelected = (navSelected) => {
    this.props.handleChangeNavSelected(navSelected);
    const element = document.getElementById("detail-restaurant-top");
    element.scrollIntoView({
      behavior: "smooth",
    });
  };

  render() {
    const { language, restaurantId } = this.props;
    const { listDay } = this.state;

    return (
      <>
        <Grid className="restaurant-about-container">
          <Grid className="restaurant-content restaurant-about-about mt-4">
            <Grid className="restaurant-content-title">About</Grid>
            <Grid className="restaurant-about-about-top mt-3 text-justify">
              Great Nepalese Restaurant in London's Euston serves excellent
              Himalayan cuisine with tradition in mind. Since the age of 12,
              restaurateur Gopal Manandhar has been honing his skills in the
              kitchen, successfully providing for his whole family in Kathmandu
              at such a young age. Since 1982, he has been running the show with
              his family at Great Nepalese Restaurant in the heart of London.
              Recommended dishes here include the homemade vegetable momos
              (Nepalese dumplings), the hairyo fish or the khursani, a tasty
              dish consisting of duck with green chilli, tomato, onion,
              capiscum, ginger and a special sauce. Sound like a plan? Then book
              your table ahead of time and head to Great Nepalese Restaurant on
              Eversholt Street.
            </Grid>
            <Grid container className="restaurant-about-about-center">
              <Grid item xs={6} className="restaurant-about-about-center-left">
                <Grid className="grid-mui-icon">
                  <Icon>language</Icon> Website
                </Grid>
                <Grid className="grid-mui-icon">
                  <Icon>phone</Icon> 0123123123
                </Grid>
                <Grid className="grid-mui-icon">
                  <Icon>pin_drop_outlined</Icon> 207 - Giai Phong - Hai Ba Trung
                  - Ha Noi
                </Grid>
              </Grid>
              <Grid item xs={6} className="restaurant-about-about-center-right">
                <Grid className="restaurant-about-about-center-right-header">
                  Schedule for next 7 days
                </Grid>
                {isExistArrayAndNotEmpty(listDay) &&
                  listDay.map((item, index) => {
                    return (
                      <Grid
                        key={item.value}
                        container
                        className={index === 0 ? "day-active" : ""}
                      >
                        <Grid item xs={6}>
                          {language === LANGUAGES.VI
                            ? item.labelVi
                            : item.labelEn}
                        </Grid>
                        <Grid item xs={6}>
                          <ScheduleNextWeek
                            restaurantId={restaurantId}
                            date={item.value}
                          />
                        </Grid>
                      </Grid>
                    );
                  })}
              </Grid>
            </Grid>
            <Grid className="restaurant-about-about-bottom background-image-center-cover"></Grid>
          </Grid>
          <Grid className="restaurant-content restaurant-about-menu mt-4">
            <Grid className="restaurant-content-title">Menu</Grid>
            <MenuContent />
            <Grid className="restaurant-about-menu-see-more">
              <span
                onClick={() => {
                  this.handleChangeNavSelected(NAV_DETAIL_RESTAURANT.MENU);
                }}
              >
                View Full Menu
              </span>
            </Grid>
          </Grid>
          <Grid className="restaurant-content restaurant-about-photo mt-4">
            <Grid className="restaurant-content-title">Photos (5)</Grid>
            <Grid className="restaurant-about-photo-list-photo">
              <Grid className="photo-content background-image-center-cover"></Grid>
              <Grid className="photo-content background-image-center-cover"></Grid>
              <Grid className="photo-content background-image-center-cover"></Grid>
              <Grid className="see-more-photo">
                <span
                  onClick={() => {
                    this.handleChangeNavSelected(NAV_DETAIL_RESTAURANT.PHOTOS);
                  }}
                >
                  See more photos...
                </span>
              </Grid>
            </Grid>
          </Grid>
          <Grid className="restaurant-content restaurant-about-review mt-4">
            <Grid className="restaurant-content-title">Reviews (369)</Grid>
            <ReviewContent />
            <Grid className="restaurant-about-review-see-more">
              <span
                onClick={() => {
                  this.handleChangeNavSelected(NAV_DETAIL_RESTAURANT.REVIEWS);
                }}
              >
                All Restaurant Reviews
              </span>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListFoodByRestaurant: (data, language) =>
      dispatch(actions.getListFood(data, language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantAbout);
