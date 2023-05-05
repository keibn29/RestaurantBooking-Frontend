import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import { withRouter } from "react-router";
import { Grid, Button } from "@material-ui/core";
import { Pagination, Skeleton } from "@mui/material";
import {
  isExistArrayAndNotEmpty,
  LANGUAGES,
  PAGE_SIZE_PAGINATION,
  NUMBER_MAX_VALUE,
} from "../../../../utils";
import "./Result.scss";
import RestaurantCountry from "../../../../components/RestaurantCountry";
import { FormattedMessage } from "react-intl";

class RestaurantResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listRestaurant: [],
      totalPage: 1,
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listRestaurant !== this.props.listRestaurant) {
      this.setState(
        {
          listRestaurant: this.props.listRestaurant,
          totalPage: Math.ceil(
            this.props.totalRestaurant / PAGE_SIZE_PAGINATION
          ),
        },
        () => {
          this.handleGetListDishByListRestaurant();
          this.handleGetListScheduelByDate();
        }
      );
    }
    if (prevProps.listDish !== this.props.listDish) {
      this.addListDishFieldToRestaurant();
    }
    if (prevProps.listSchedule !== this.props.listSchedule) {
      this.addListScheduleFieldToRestaurant();
    }
  }

  handleGetListDishByListRestaurant = () => {
    const { language } = this.props;
    const { listRestaurant } = this.state;
    if (!isExistArrayAndNotEmpty(listRestaurant)) {
      return;
    }

    const listRestaurantId = listRestaurant.map((item) => item.id);
    this.props.getListDishByListRestaurant(
      {
        pageSize: NUMBER_MAX_VALUE,
        pageOrder: 1,
        listRestaurantId,
      },
      language
    );
  };

  addListDishFieldToRestaurant = () => {
    const { listDish } = this.props;
    const { listRestaurant } = this.state;

    let newListRestaurant = listRestaurant.map((restaurantItem) => {
      let listDishOfRestaurant = listDish.filter(
        (dishItem) => dishItem.restaurantId === restaurantItem.id
      );
      if (isExistArrayAndNotEmpty(listDishOfRestaurant)) {
        restaurantItem.listDishOfRestaurant = listDishOfRestaurant;
      }
      return restaurantItem;
    });

    this.setState({
      listRestaurant: newListRestaurant,
    });
  };

  handleGetListScheduelByDate = () => {
    const { date } = this.props;
    const { listRestaurant } = this.state;
    if (!isExistArrayAndNotEmpty(listRestaurant)) {
      return;
    }

    if (!date) {
      return;
    }
    const listRestaurantId = listRestaurant.map((item) => item.id);
    this.props.getListScheduleByDate({
      listRestaurantId,
      date,
    });
  };

  addListScheduleFieldToRestaurant = () => {
    const { listSchedule } = this.props;
    const { listRestaurant } = this.state;

    let newListRestaurant = listRestaurant.map((restaurantItem) => {
      let listScheduleOfRestaurant = listSchedule.filter(
        (scheduleItem) => scheduleItem.restaurantId === restaurantItem.id
      );
      if (isExistArrayAndNotEmpty(listScheduleOfRestaurant)) {
        restaurantItem.listScheduleOfRestaurant = listScheduleOfRestaurant;
      }
      return restaurantItem;
    });

    this.setState({
      listRestaurant: newListRestaurant,
    });
  };

  handleChangePageOrder = (newPage) => {
    this.props.changePageOrder(newPage);
  };

  handleOpenRestaurantPage = (restaurantId) => {
    if (this.props.history) {
      this.props.history.push(`/restaurant/${restaurantId}`);
    }
  };

  render() {
    const { language, pageOrder, totalRestaurant, isLoadingRestaurant } =
      this.props;
    const { listRestaurant, totalPage } = this.state;

    return (
      <>
        {isLoadingRestaurant ? (
          <>
            <Grid className="mt-4" container>
              <Grid>
                <Skeleton variant="rounded" width={230} height={150} />
              </Grid>
              <Grid item xs className="mx-3">
                <Skeleton
                  variant="text"
                  sx={{
                    fontSize: "40px",
                    marginTop: "-4px",
                  }}
                />
                <Skeleton variant="text" sx={{ fontSize: "20px" }} />
                <Skeleton variant="text" sx={{ fontSize: "20px" }} />
                <Skeleton variant="text" sx={{ fontSize: "20px" }} />
              </Grid>
            </Grid>
            <Grid className="mt-4" container>
              <Grid>
                <Skeleton variant="rounded" width={230} height={150} />
              </Grid>
              <Grid item xs className="mx-3">
                <Skeleton
                  variant="text"
                  sx={{
                    fontSize: "40px",
                    marginTop: "-4px",
                  }}
                />
                <Skeleton variant="text" sx={{ fontSize: "20px" }} />
                <Skeleton variant="text" sx={{ fontSize: "20px" }} />
                <Skeleton variant="text" sx={{ fontSize: "20px" }} />
              </Grid>
            </Grid>
            <Grid className="mt-4" container>
              <Grid>
                <Skeleton variant="rounded" width={230} height={150} />
              </Grid>
              <Grid item xs className="mx-3">
                <Skeleton
                  variant="text"
                  sx={{
                    fontSize: "40px",
                    marginTop: "-4px",
                  }}
                />
                <Skeleton variant="text" sx={{ fontSize: "20px" }} />
                <Skeleton variant="text" sx={{ fontSize: "20px" }} />
                <Skeleton variant="text" sx={{ fontSize: "20px" }} />
              </Grid>
            </Grid>
          </>
        ) : (
          <Grid className="result-container">
            <Grid
              className="result-text mt-2"
              container
              justify="space-between"
            >
              <Grid>
                {totalRestaurant || 0}{" "}
                {totalRestaurant === 1 ? (
                  <FormattedMessage id="customer.search.result.result-one" />
                ) : (
                  <FormattedMessage id="customer.search.result.result-many" />
                )}
              </Grid>
              <Grid>
                <FormattedMessage id="customer.search.result.most-score" />
              </Grid>
            </Grid>
            {isExistArrayAndNotEmpty(listRestaurant) ? (
              <Grid className="list-result mt-3">
                {listRestaurant.map((item) => {
                  return (
                    <Grid
                      key={item.id}
                      className="result-content restaurant"
                      container
                      onClick={() => {
                        this.handleOpenRestaurantPage(item.id);
                      }}
                    >
                      <Grid
                        item
                        xs={10}
                        className="restaurant-left"
                        container
                        alignItems="center"
                      >
                        <Grid
                          className={
                            isExistArrayAndNotEmpty(
                              item.listScheduleOfRestaurant
                            )
                              ? "restaurant-avatar background-image-center-cover reset-border"
                              : "restaurant-avatar background-image-center-cover"
                          }
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
                        <Grid className="restaurant-text">
                          <Grid className="content-name">
                            {language === LANGUAGES.VI
                              ? item.nameVi
                              : item.nameEn}
                          </Grid>
                          <Grid className="restaurant-province-country">
                            <Grid>
                              <i className="icon fas fa-map-marker-alt"></i>{" "}
                              {item.provinceData && (
                                <>
                                  {language === LANGUAGES.VI
                                    ? item.provinceData.valueVi
                                    : item.provinceData.valueEn}
                                </>
                              )}
                            </Grid>
                            <Grid>
                              <i className="icon fas fa-utensils"></i>{" "}
                              {item.listDishOfRestaurant && (
                                <>
                                  <RestaurantCountry
                                    data={item.listDishOfRestaurant}
                                    language={language}
                                  />
                                </>
                              )}
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={2} className="restaurant-right">
                        <Grid
                          className="h-100 right-body"
                          container
                          direction="column"
                          justify="center"
                          alignItems="center"
                        >
                          <Grid className="score">
                            {item.averageScore}/<span>5</span>
                          </Grid>
                          <Grid className="number-review">
                            {item.totalReview}{" "}
                            {item.totalReview === 1 ? (
                              <FormattedMessage id="customer.restaurant.reviews.review-normal-one" />
                            ) : (
                              <FormattedMessage id="customer.restaurant.reviews.review-normal-many" />
                            )}
                          </Grid>
                        </Grid>
                      </Grid>
                      {isExistArrayAndNotEmpty(
                        item.listScheduleOfRestaurant
                      ) && (
                        <Grid
                          item
                          xs={12}
                          className="restaurant-bottom"
                          container
                        >
                          {item.listScheduleOfRestaurant.map((item) => {
                            return (
                              <Button key={item.id} className="btn-time">
                                {item.timeTypeData && (
                                  <>
                                    {language === LANGUAGES.VI
                                      ? item.timeTypeData?.valueVi
                                      : item.timeTypeData?.valueEn}
                                  </>
                                )}
                              </Button>
                            );
                          })}
                        </Grid>
                      )}
                    </Grid>
                  );
                })}
              </Grid>
            ) : (
              <Grid className="list-result-empty-text">
                Không tìm thấy kết quả phù hợp
              </Grid>
            )}
            {totalRestaurant > PAGE_SIZE_PAGINATION && (
              <Grid
                className="result-pagination mt-5"
                container
                justify="center"
              >
                <Pagination
                  color="colorhome"
                  size="large"
                  count={totalPage}
                  page={pageOrder}
                  onChange={(event, newPage) => {
                    this.handleChangePageOrder(newPage);
                  }}
                />
              </Grid>
            )}
          </Grid>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    listRestaurant: state.restaurant.listRestaurant,
    totalRestaurant: state.restaurant.totalRestaurant,
    listDish: state.dish.listDish,
    listSchedule: state.restaurant.listSchedule,
    isLoadingRestaurant: state.restaurant.isLoadingRestaurant,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListDishByListRestaurant: (data) => dispatch(actions.getListDish(data)),
    getListScheduleByDate: (data) => dispatch(actions.getScheduleByDate(data)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RestaurantResult)
);
