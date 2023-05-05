import React, { Component } from "react";
import { connect } from "react-redux";
import { LANGUAGES, isExistArrayAndNotEmpty } from "../../../../utils";
import { Grid } from "@material-ui/core";
import "./RestaurantGeneralInformation.scss";
import _ from "lodash";
import RestaurantCountry from "../../../../components/RestaurantCountry";
import { Skeleton } from "@mui/material";
import { FormattedMessage } from "react-intl";

class RestaurantGeneralInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      averagePrice: "",
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.restaurantData !== this.props.restaurantData ||
      prevProps.language !== this.props.language
    ) {
      this.caculateAveragePrice();
    }
  }

  caculateAveragePrice = () => {
    const { language } = this.props;
    const { dishData } = this.props.restaurantData;
    let average = "";

    if (isExistArrayAndNotEmpty(dishData)) {
      let totalPrice = dishData.reduce((acc, curr) => {
        if (language === LANGUAGES.VI) {
          return acc + curr.priceVi;
        }
        return acc + curr.priceEn;
      }, 0);

      let averageVi = Math.ceil(totalPrice / dishData.length / 5000) * 5000;
      let averageEn = parseFloat(
        (Math.ceil((totalPrice / dishData.length) * 2) / 2).toFixed(1)
      );

      average = language === LANGUAGES.VI ? averageVi : averageEn;
    }

    this.setState({
      averagePrice: average,
    });
  };

  render() {
    const {
      language,
      restaurantData,
      totalReview,
      averageScore,
      isLoadingRestaurant,
    } = this.props;
    const { averagePrice } = this.state;

    return (
      <>
        <Grid className="restaurant-general-container">
          <Grid className="restaurant-general-top">
            <Grid className="restaurant-general-top-left">
              <Grid className="restaurant-name" id="detail-restaurant-top">
                {isLoadingRestaurant ? (
                  <Skeleton
                    variant="text"
                    width={400}
                    sx={{
                      fontSize: "35px",
                      marginTop: "-5px",
                    }}
                  />
                ) : (
                  <>
                    {!_.isEmpty(restaurantData) && (
                      <>
                        {language === LANGUAGES.VI
                          ? restaurantData.nameVi
                          : restaurantData.nameEn}
                      </>
                    )}
                  </>
                )}
              </Grid>
              <Grid className="restaurant-province-country">
                {isLoadingRestaurant ? (
                  <Skeleton
                    variant="text"
                    width={200}
                    sx={{
                      fontSize: "15px",
                      marginTop: "-5px",
                    }}
                  />
                ) : (
                  <>
                    {restaurantData.provinceData && (
                      <>
                        {language === LANGUAGES.VI
                          ? restaurantData.provinceData.valueVi
                          : restaurantData.provinceData.valueEn}
                      </>
                    )}{" "}
                    &bull;{" "}
                    <RestaurantCountry
                      className="country"
                      data={restaurantData.dishData}
                      language={language}
                    />
                  </>
                )}
              </Grid>
              <Grid className="restaurant-average-price">
                {isLoadingRestaurant ? (
                  <Skeleton
                    variant="text"
                    width={200}
                    sx={{
                      fontSize: "15px",
                      marginTop: "-5px",
                    }}
                  />
                ) : (
                  <>
                    <FormattedMessage id="customer.restaurant.general.average-price" />{" "}
                    {language === LANGUAGES.VI ? (
                      <>
                        {Number(averagePrice).toLocaleString()}
                        <sup>đ</sup>
                      </>
                    ) : (
                      <>
                        <span>&#36;</span>
                        {Number(averagePrice).toLocaleString()}
                      </>
                    )}
                  </>
                )}
              </Grid>
            </Grid>
            <Grid className="restaurant-general-top-right">
              {isLoadingRestaurant ? (
                <Skeleton
                  variant="rounded"
                  width={60}
                  height={40}
                  sx={{
                    marginTop: "-5px",
                  }}
                />
              ) : (
                <>
                  <Grid className="score">
                    {averageScore || 0}/<span>5</span>
                  </Grid>
                  <Grid className="number-review">
                    {totalReview}{" "}
                    {totalReview === 1 ? (
                      <FormattedMessage id="customer.restaurant.reviews.review-normal-one" />
                    ) : (
                      <FormattedMessage id="customer.restaurant.reviews.review-normal-many" />
                    )}
                  </Grid>
                </>
              )}
            </Grid>
          </Grid>
          {isLoadingRestaurant ? (
            <Skeleton
              variant="rounded"
              height={450}
              sx={{
                marginTop: "15px",
              }}
            />
          ) : (
            <Grid
              className="restaurant-general-center background-image-center-cover"
              style={
                restaurantData.avatar
                  ? {
                      backgroundImage: `url(${
                        process.env.REACT_APP_BACKEND_URL +
                        restaurantData.avatar
                      })`,
                    }
                  : {}
              }
            ></Grid>
          )}
        </Grid>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    restaurantData: state.restaurant.restaurantData,
    listReview: state.restaurant.listReview,
    totalReview: state.restaurant.totalReview,
    averageScore: state.restaurant.averageScore,
    isLoadingRestaurant: state.restaurant.isLoadingRestaurant,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantGeneralInformation);
