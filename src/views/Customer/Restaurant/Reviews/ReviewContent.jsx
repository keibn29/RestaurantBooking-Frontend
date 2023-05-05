import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import {
  LANGUAGES,
  PAGE_SIZE_PAGINATION,
  isExistArrayAndNotEmpty,
} from "../../../../utils";
import { Grid, Icon, Button } from "@material-ui/core";
import dateFormat from "dateformat";
import { Pagination } from "@mui/material";
import { Rating } from "@material-ui/lab";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import "./ReviewContent.scss";
import { Chart, registerables } from "chart.js";
import ReviewDialog from "./ReviewDialog";
import { getReviewByCustomerAndRestaurant } from "../../../../services/restaurantService";
import { FormattedMessage } from "react-intl";

Chart.register(...registerables);

class ReviewContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenReviewDialog: false,
      reviewData: "",
      pageOrder: 1,
      totalPage: 1,
      listReview: [],
      totalReview: "",
      listNumberScore: [0, 0, 0, 0, 0],
    };
  }

  componentDidMount() {
    if (this.props.restaurantId) {
      this.getReviewByCustomerAndRestaurant();
      this.fetchListReviewByRestaurant();
      this.getListNumberScore();
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.restaurantId !== this.props.restaurantId ||
      prevProps.customerInfo !== this.props.customerInfo
    ) {
      this.getReviewByCustomerAndRestaurant();
      this.fetchListReviewByRestaurant();
      this.getListNumberScore();
    }
    if (prevProps.listReview !== this.props.listReview) {
      this.setState({
        listReview: this.props.listReview,
        totalPage: Math.ceil(this.props.totalReview / PAGE_SIZE_PAGINATION),
      });
    }
    if (prevProps.pageSize !== this.props.pageSize) {
      this.fetchListReviewByRestaurant();
    }
  }

  getListNumberScore = () => {
    const { restaurantId } = this.props;
    if (!restaurantId) {
      return;
    }

    this.props.getListScoreByRestaurant(restaurantId);
  };

  fetchListReviewByRestaurant = async () => {
    const { restaurantId, pageSize } = this.props;
    const { pageOrder } = this.state;
    if (!restaurantId || !pageSize) {
      return;
    }

    let data = {
      pageSize: pageSize,
      pageOrder,
      restaurantId: +restaurantId,
    };
    this.props.getListReviewByRestaurant(data);
  };

  getReviewByCustomerAndRestaurant = async () => {
    const { restaurantId, customerInfo } = this.props;
    if (!customerInfo || !restaurantId) {
      return;
    }

    const res = await getReviewByCustomerAndRestaurant(
      +restaurantId,
      customerInfo.id
    );
    if (res && res.errCode === 0) {
      this.setState({
        reviewData: res.reviewData,
      });
    } else {
      this.setState({
        reviewData: "",
      });
    }
  };

  handleOpenReviewDialog = () => {
    this.setState({
      isOpenReviewDialog: true,
    });
  };

  handleCloseReviewDialog = () => {
    this.setState({
      isOpenReviewDialog: false,
    });
    this.getReviewByCustomerAndRestaurant();
    this.fetchListReviewByRestaurant();
    this.getListNumberScore();
  };

  handleChangePageOrder = (newPage) => {
    this.setState(
      {
        pageOrder: newPage,
      },
      () => {
        this.fetchListReviewByRestaurant();
      }
    );

    document.getElementById("restaurant-nav-top").scrollIntoView();
  };

  render() {
    const {
      language,
      customerInfo,
      restaurantId,
      totalReview,
      averageScore,
      listNumberScore,
      pageSize,
    } = this.props;
    const { isOpenReviewDialog, reviewData, totalPage, pageOrder, listReview } =
      this.state;

    return (
      <>
        <Grid className="review-content-container">
          {isExistArrayAndNotEmpty(listReview) ? (
            <>
              <Grid className="review-content-top">
                <Grid className="review-content-top-left">
                  <Grid className="review-content-top-left-up">
                    {averageScore}
                  </Grid>
                  <Grid className="review-content-top-left-center">
                    <Rating value={+averageScore} precision={0.1} readOnly />
                  </Grid>
                  <Grid className="review-content-top-left-down">
                    {totalReview}{" "}
                    {totalReview === 1 ? (
                      <FormattedMessage id="customer.restaurant.reviews.review-normal-one" />
                    ) : (
                      <FormattedMessage id="customer.restaurant.reviews.review-normal-many" />
                    )}
                  </Grid>
                </Grid>
                <Grid className="review-content-top-right">
                  <Bar
                    data={{
                      labels: [5, 4, 3, 2, 1],
                      datasets: [
                        {
                          backgroundColor: [
                            "#3FAF6C",
                            "#53CB82",
                            "#B4DC7E",
                            "#F9B233",
                            "#F87C32",
                          ],
                          data: [...listNumberScore].reverse(),
                          datalabels: {
                            anchor: "start",
                            align: "end",
                          },
                        },
                      ],
                    }}
                    options={{
                      indexAxis: "y",
                      events: null,
                      plugins: {
                        legend: {
                          display: false,
                        },
                      },
                      scales: {
                        x: {
                          grid: {
                            drawBorder: false,
                            display: false,
                          },
                          ticks: {
                            display: false,
                          },
                        },
                        y: {
                          grid: {
                            drawBorder: false,
                            display: false,
                          },
                        },
                      },
                    }}
                    plugins={[ChartDataLabels]}
                    width={"380px"}
                    height={"190px"}
                  />
                </Grid>
              </Grid>
              <Grid className="review-content-bottom">
                {customerInfo && (
                  <Grid className="review-content-bottom-up">
                    <Button
                      className="btn-write-review"
                      variant="outlined"
                      onClick={() => {
                        this.handleOpenReviewDialog();
                      }}
                    >
                      <Icon className="write-review-icon">create_outlined</Icon>
                      <span>
                        {reviewData ? (
                          <FormattedMessage id="customer.restaurant.reviews.edit-review" />
                        ) : (
                          <FormattedMessage id="customer.restaurant.reviews.write-review" />
                        )}
                      </span>
                    </Button>
                  </Grid>
                )}
                <Grid className="review-content-bottom-down">
                  <Grid className="list-review">
                    {listReview.map((item) => {
                      const dateVi = dateFormat(item.updatedAt, "dd/mm/yyyy");
                      const dateEn = dateFormat(item.updatedAt, "mm/dd/yyyy");

                      return (
                        <Grid key={item.id} className="content">
                          <Grid className="customer-information-and-score">
                            <Grid className="customer-information">
                              <Grid
                                className="customer-information-left background-image-center-cover"
                                style={
                                  item.customerData && item.customerData.avatar
                                    ? {
                                        backgroundImage: `url(${
                                          process.env.REACT_APP_BACKEND_URL +
                                          item.customerData.avatar
                                        })`,
                                      }
                                    : {}
                                }
                              ></Grid>
                              <Grid className="customer-information-right">
                                <Grid className="customer-name">
                                  {item.customerData && (
                                    <>
                                      {language === LANGUAGES.VI ? (
                                        <>
                                          {item.customerData?.lastName}{" "}
                                          {item.customerData?.firstName}
                                        </>
                                      ) : (
                                        <>
                                          {item.customerData?.firstName}{" "}
                                          {item.customerData?.lastName}
                                        </>
                                      )}
                                    </>
                                  )}
                                </Grid>
                                <Grid className="customer-date">
                                  {language === LANGUAGES.VI ? dateVi : dateEn}
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid className="review-score">
                              {item.star}/<span>5</span>
                            </Grid>
                          </Grid>
                          <Grid className="review-text">
                            {item.detail || (
                              <i>
                                <FormattedMessage id="customer.restaurant.reviews.no-comment" />
                              </i>
                            )}
                          </Grid>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Grid>
                {pageSize === PAGE_SIZE_PAGINATION &&
                  totalReview > PAGE_SIZE_PAGINATION && (
                    <Grid
                      className="booking-pagination mt-4"
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
            </>
          ) : (
            <>
              <Grid className="list-content-empty-text">
                <FormattedMessage id="customer.restaurant.reviews.review-empty-text" />
              </Grid>
              <Button
                className="btn-write-review mt-2"
                variant="outlined"
                onClick={() => {
                  this.handleOpenReviewDialog();
                }}
              >
                <Icon className="write-review-icon">create_outlined</Icon>
                <span>
                  {reviewData ? (
                    <FormattedMessage id="customer.restaurant.reviews.edit-review" />
                  ) : (
                    <FormattedMessage id="customer.restaurant.reviews.write-review" />
                  )}
                </span>
              </Button>
            </>
          )}
          {isOpenReviewDialog && (
            <ReviewDialog
              isOpen={isOpenReviewDialog}
              handleCloseDialog={this.handleCloseReviewDialog}
              restaurantId={restaurantId}
              reviewData={reviewData || ""}
            />
          )}
        </Grid>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    customerInfo: state.user.customerInfo,
    listReview: state.restaurant.listReview,
    totalReview: state.restaurant.totalReview,
    listNumberScore: state.restaurant.listNumberScore,
    averageScore: state.restaurant.averageScore,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListReviewByRestaurant: (data) =>
      dispatch(actions.getListReviewByRestaurant(data)),
    getListScoreByRestaurant: (restaurantId) =>
      dispatch(actions.getListScoreByRestaurant(restaurantId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewContent);
