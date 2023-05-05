import React, { Component } from "react";
import { connect } from "react-redux";
import {
  LANGUAGES,
  PAGE,
  isExistArrayAndNotEmpty,
  sliderSettings,
} from "../../../../utils";
import { withRouter } from "react-router";
import { Grid } from "@material-ui/core";
import Slider from "react-slick";
import RestaurantCountry from "../../../../components/RestaurantCountry";

class RestaurantSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleOpenRestaurantPage = (restaurantId) => {
    if (this.props.history) {
      this.props.history.push(`/restaurant/${restaurantId}`);
    }
  };

  render() {
    const { language, listRestaurant } = this.props;

    return (
      <>
        <Grid className="section-body">
          <Slider {...sliderSettings}>
            {isExistArrayAndNotEmpty(listRestaurant) &&
              listRestaurant.map((item) => {
                return (
                  <Grid className="section-body-outer" key={item.id}>
                    <Grid
                      className="content"
                      onClick={() => {
                        this.handleOpenRestaurantPage(item.id);
                      }}
                    >
                      <Grid
                        className="content-top background-image-center-cover"
                        style={
                          item.avatar
                            ? {
                                backgroundImage: `url(${
                                  process.env.REACT_APP_BACKEND_URL +
                                  item.avatar
                                })`,
                              }
                            : {}
                        }
                      ></Grid>
                      <Grid className="content-bottom">
                        <Grid className="content-bottom-up">
                          {language === LANGUAGES.VI
                            ? item.nameVi
                            : item.nameEn}
                        </Grid>
                        <Grid className="content-bottom-down">
                          <Grid className="restaurant-information">
                            <Grid className="restaurant-province">
                              <i className="icon fas fa-map-marker-alt"></i>{" "}
                              {language === LANGUAGES.VI
                                ? item.provinceData.valueVi
                                : item.provinceData.valueEn}
                            </Grid>
                            <Grid className="restaurant-country">
                              <i className="icon fas fa-utensils"></i>{" "}
                              <RestaurantCountry
                                data={item.dishData}
                                language={language}
                                page={PAGE.HOMEPAGE}
                              />
                            </Grid>
                          </Grid>
                          <Grid className="restaurant-score">
                            {item.averageScore}/<span>5</span>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                );
              })}
          </Slider>
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
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RestaurantSlider)
);
