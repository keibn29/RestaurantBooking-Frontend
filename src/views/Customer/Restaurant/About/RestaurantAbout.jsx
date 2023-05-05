import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import { withRouter } from "react-router";
import {
  isExistArrayAndNotEmpty,
  LANGUAGES,
  LIST_DISH_TYPE,
  NAV_DETAIL_RESTAURANT,
  OBJECT,
} from "../../../../utils";
import { Grid, Icon } from "@material-ui/core";
import moment from "moment";
import "moment/locale/vi";
import "./RestaurantAbout.scss";
import ReviewContent from "../Reviews/ReviewContent";
import MenuContent from "../Menu/MenuContent";
import ScheduleNextWeek from "./ScheduleNextWeek";
import _ from "lodash";
import { FormattedMessage } from "react-intl";

class RestaurantAbout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDay: [],
    };
  }

  componentDidMount() {
    setTimeout(() => {
      if (this.props.restaurantId) {
        this.fetchListDishByRestaurant();
        this.fetchListPhotoByRestaurant();
      }
    }, 500);

    let listDayNextWeek = this.customDayShowNextWeek();
    this.setState({
      listDay: listDayNextWeek,
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.restaurantId !== this.props.restaurantId) {
      this.fetchListDishByRestaurant();
      this.fetchListPhotoByRestaurant();
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

  fetchListDishByRestaurant = () => {
    const { language, restaurantId } = this.props;
    let data = {
      pageSize: 2,
      pageOrder: 1,
      restaurantId: +restaurantId,
      dishType: LIST_DISH_TYPE.FOOD,
    };
    this.props.getListDishByRestaurant(data, language);
  };

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

  fetchListPhotoByRestaurant = () => {
    this.props.getAllPhotoByRestaurant(
      OBJECT.RESTAURANT,
      this.props.restaurantId
    );
  };

  render() {
    const { language, restaurantId, restaurantData, listPhoto, totalReview } =
      this.props;
    const { listDay } = this.state;

    return (
      <>
        <Grid className="restaurant-about-container">
          <Grid className="restaurant-content restaurant-about-about mt-4">
            <Grid className="restaurant-content-title">
              <FormattedMessage id="customer.restaurant.about.about" />
            </Grid>
            <Grid
              className="restaurant-about-about-top mt-3 text-justify"
              dangerouslySetInnerHTML={
                language === LANGUAGES.VI
                  ? {
                      __html:
                        !_.isEmpty(restaurantData) &&
                        restaurantData.descriptionVi,
                    }
                  : {
                      __html:
                        !_.isEmpty(restaurantData) &&
                        restaurantData.descriptionEn,
                    }
              }
            ></Grid>
            <Grid container className="restaurant-about-about-center">
              <Grid item xs={6} className="restaurant-about-about-center-left">
                <Grid className="grid-mui-icon">
                  <Icon>language</Icon> Website
                </Grid>
                <Grid className="grid-mui-icon">
                  <Icon>phone</Icon>{" "}
                  {!_.isEmpty(restaurantData) &&
                    restaurantData.managerData &&
                    restaurantData.managerData.phone}
                </Grid>
                <Grid className="grid-mui-icon">
                  <Icon>pin_drop_outlined</Icon>{" "}
                  {!_.isEmpty(restaurantData) && (
                    <>
                      {language === LANGUAGES.VI
                        ? restaurantData.addressVi
                        : restaurantData.addressEn}
                    </>
                  )}
                </Grid>
              </Grid>
              <Grid item xs={6} className="restaurant-about-about-center-right">
                <Grid className="restaurant-about-about-center-right-header">
                  <FormattedMessage id="customer.restaurant.about.next-7-day" />
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
          </Grid>
          <Grid className="restaurant-content restaurant-about-menu mt-4">
            <Grid className="restaurant-content-title">Menu</Grid>
            <MenuContent limit={true} />
            <Grid className="restaurant-about-menu-see-more">
              <span
                onClick={() => {
                  this.handleChangeNavSelected(NAV_DETAIL_RESTAURANT.MENU);
                }}
              >
                <FormattedMessage id="customer.restaurant.about.see-all-menu" />
              </span>
            </Grid>
          </Grid>
          <Grid className="restaurant-content restaurant-about-photo mt-4">
            <Grid className="restaurant-content-title">
              Photos ({listPhoto.length})
            </Grid>
            {isExistArrayAndNotEmpty(listPhoto) ? (
              <Grid className="restaurant-about-photo-list-photo">
                {listPhoto.slice(0, 3).map((item) => {
                  return (
                    <Grid
                      key={item.id}
                      className="photo-content background-image-center-cover"
                      style={{
                        backgroundImage: `url(${
                          process.env.REACT_APP_BACKEND_URL + item.link
                        })`,
                      }}
                    ></Grid>
                  );
                })}
                <Grid className="see-more-photo">
                  <span
                    onClick={() => {
                      this.handleChangeNavSelected(
                        NAV_DETAIL_RESTAURANT.PHOTOS
                      );
                    }}
                  >
                    <FormattedMessage id="customer.restaurant.about.see-more-photo" />
                    ...
                  </span>
                </Grid>
              </Grid>
            ) : (
              <Grid className="list-content-empty-text">
                <FormattedMessage id="customer.restaurant.about.photo-empty-text" />
              </Grid>
            )}
          </Grid>
          <Grid className="restaurant-content restaurant-about-review mt-4">
            <Grid className="restaurant-content-title">
              Reviews ({totalReview})
            </Grid>
            <ReviewContent restaurantId={restaurantId} pageSize={3} />
            <Grid className="restaurant-about-review-see-more">
              <span
                onClick={() => {
                  this.handleChangeNavSelected(NAV_DETAIL_RESTAURANT.REVIEWS);
                }}
              >
                <FormattedMessage id="customer.restaurant.about.see-all-review" />
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
    restaurantData: state.restaurant.restaurantData,
    listPhoto: state.allCode.listPhoto,
    totalReview: state.restaurant.totalReview,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListDishByRestaurant: (data, language) =>
      dispatch(actions.getListDish(data, language)),
    getAllPhotoByRestaurant: (objectId, restaurantId) =>
      dispatch(actions.getAllPhotoByObject(objectId, restaurantId)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RestaurantAbout)
);
