import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import { Grid, Icon } from "@material-ui/core";
import { withRouter } from "react-router";
import { Pagination, Skeleton } from "@mui/material";
import {
  isExistArrayAndNotEmpty,
  LANGUAGES,
  PAGE,
  NAV_DETAIL_RESTAURANT,
  PAGE_SIZE_PAGINATION,
} from "../../../../utils";
import "./Result.scss";
import { toast } from "react-toastify";
import DetailDish from "../../Restaurant/Menu/DetailDish";
import CustomerLogin from "../../Auth/CustomerLogin";
import { FormattedMessage } from "react-intl";

class DishResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDish: [],
      totalPage: 1,
      isOpenDetailDishDialog: false,
      dishSelected: {},
      isOpenCustomerLoginDialog: false,
      restaurantId: "",
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listDish !== this.props.listDish) {
      this.setState({
        listDish: this.props.listDish,
        totalPage: Math.ceil(this.props.totalDish / PAGE_SIZE_PAGINATION),
      });
    }
    if (
      prevProps.isOpenCustomerLoginDialog !==
      this.props.isOpenCustomerLoginDialog
    ) {
      this.setState({
        isOpenCustomerLoginDialog: false,
      });
    }
  }

  handleChangePageOrder = (newPage) => {
    this.props.changePageOrder(newPage);
  };

  handleViewDetailDish = (dishData) => {
    this.setState({
      isOpenDetailDishDialog: true,
      dishSelected: dishData,
      restaurantId: dishData.restaurantId,
    });
  };

  handleCloseDetailDishDialog = () => {
    this.setState({
      isOpenDetailDishDialog: false,
    });
  };

  handleOrderDish = (dish) => {
    const { customerInfo } = this.props;
    if (!customerInfo) {
      toast.info("Vui lòng đăng nhập để đặt món");
      this.setState({
        isOpenCustomerLoginDialog: true,
      });
    } else {
      let copyDish = { ...dish };
      delete copyDish.avatarBase64;
      this.props.addDishOrder(copyDish);
    }
  };

  handleCloseCustomerLoginDialog = () => {
    this.setState({
      isOpenCustomerLoginDialog: false,
    });
  };

  handleOpenRestaurantPage = () => {
    const { customerInfo } = this.props;
    const { restaurantId } = this.state;

    if (!customerInfo) {
      return;
    }

    if (this.props.history) {
      this.props.history.push({
        pathname: `/restaurant/${restaurantId}`,
        hash: NAV_DETAIL_RESTAURANT.MENU,
      });
    }
  };

  render() {
    const { language, pageOrder, totalDish, isLoadingDish } = this.props;
    const {
      listDish,
      totalPage,
      isOpenDetailDishDialog,
      dishSelected,
      isOpenCustomerLoginDialog,
    } = this.state;

    return (
      <>
        {isLoadingDish ? (
          <>
            <Grid className="mt-4" container>
              <Grid>
                <Skeleton variant="rounded" width={200} height={175} />
              </Grid>
              <Grid item xs className="mx-3">
                <Skeleton
                  variant="text"
                  sx={{
                    fontSize: "40px",
                    marginTop: "-7px",
                  }}
                />
                <Skeleton variant="text" sx={{ fontSize: "20px" }} />
                <Skeleton variant="text" sx={{ fontSize: "20px" }} />
                <Skeleton variant="text" sx={{ fontSize: "20px" }} />
                <Skeleton variant="text" sx={{ fontSize: "20px" }} />
              </Grid>
            </Grid>
            <Grid className="mt-4" container>
              <Grid>
                <Skeleton variant="rounded" width={200} height={175} />
              </Grid>
              <Grid item xs className="mx-3">
                <Skeleton
                  variant="text"
                  sx={{
                    fontSize: "40px",
                    marginTop: "-7px",
                  }}
                />
                <Skeleton variant="text" sx={{ fontSize: "20px" }} />
                <Skeleton variant="text" sx={{ fontSize: "20px" }} />
                <Skeleton variant="text" sx={{ fontSize: "20px" }} />
                <Skeleton variant="text" sx={{ fontSize: "20px" }} />
              </Grid>
            </Grid>
            <Grid className="mt-4" container>
              <Grid>
                <Skeleton variant="rounded" width={200} height={175} />
              </Grid>
              <Grid item xs className="mx-3">
                <Skeleton
                  variant="text"
                  sx={{
                    fontSize: "40px",
                    marginTop: "-7px",
                  }}
                />
                <Skeleton variant="text" sx={{ fontSize: "20px" }} />
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
                {totalDish || 0}{" "}
                {totalDish === 1 ? (
                  <FormattedMessage id="customer.search.result.result-one" />
                ) : (
                  <FormattedMessage id="customer.search.result.result-many" />
                )}
              </Grid>
              <Grid>
                <FormattedMessage id="customer.search.result.most-order" />
              </Grid>
            </Grid>
            {isExistArrayAndNotEmpty(listDish) ? (
              <Grid className="list-result mt-3">
                {listDish.map((item) => {
                  return (
                    <Grid
                      key={item.id}
                      className="result-content dish"
                      onClick={() => {
                        this.handleViewDetailDish(item);
                      }}
                    >
                      <Grid className="dish-left" container alignItems="center">
                        <Grid
                          className="dish-avatar background-image-center-cover"
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
                        <Grid className="dish-text">
                          <Grid className="content-name">
                            {language === LANGUAGES.VI
                              ? item.nameVi
                              : item.nameEn}
                          </Grid>
                          <Grid className="dish-infor">
                            <Grid container alignItems="center">
                              <i className="icon fas fa-utensils mr-1"></i>{" "}
                              <FormattedMessage id="customer.restaurant.menu.price" />{" "}
                              {language === LANGUAGES.VI ? (
                                <>
                                  {Number(item.priceVi).toLocaleString()}
                                  <sup>đ</sup>
                                </>
                              ) : (
                                <>
                                  <span>&#36;</span>
                                  {Number(item.priceEn).toLocaleString()}
                                </>
                              )}
                            </Grid>
                            <Grid container alignItems="center">
                              <Icon className="icon restaurant mr-1">
                                home_work
                              </Icon>{" "}
                              {language === LANGUAGES.VI
                                ? item.restaurantData?.nameVi
                                : item.restaurantData?.nameEn}{" "}
                              &bull;{" "}
                              {language === LANGUAGES.VI
                                ? item.restaurantData?.provinceData?.valueVi
                                : item.restaurantData?.provinceData?.valueEn}
                            </Grid>
                            <Grid container alignItems="center">
                              <i className="icon fas fa-utensils mr-1"></i>{" "}
                              {language === LANGUAGES.VI
                                ? item.countryData?.valueVi
                                : item.countryData?.valueEn}
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={2} className="dish-right">
                        <Grid
                          className="h-100 right-body"
                          container
                          direction="column"
                          justify="center"
                          alignItems="center"
                        >
                          <Grid className="dish-right-number">
                            {item.totalOrder}
                          </Grid>
                          <Grid className="dish-right-text">
                            <FormattedMessage id="customer.search.result.number-order-search" />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  );
                })}
              </Grid>
            ) : (
              <Grid className="list-result-empty-text">
                <FormattedMessage id="customer.search.result.no-result" />
              </Grid>
            )}
            {totalDish > PAGE_SIZE_PAGINATION && (
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

        {isOpenDetailDishDialog && (
          <DetailDish
            isOpen={isOpenDetailDishDialog}
            handleCloseDialog={this.handleCloseDetailDishDialog}
            dishData={dishSelected}
            orderDish={this.handleOrderDish}
            page={PAGE.HOMEPAGE}
            openRestaurantPage={this.handleOpenRestaurantPage}
          />
        )}
        {isOpenCustomerLoginDialog && (
          <CustomerLogin
            isOpen={isOpenCustomerLoginDialog}
            handleCloseDialog={this.handleCloseCustomerLoginDialog}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    listDish: state.dish.listDish,
    totalDish: state.dish.totalDish,
    customerInfo: state.user.customerInfo,
    isOpenCustomerLoginDialog: state.user.isOpenCustomerLoginDialog,
    isLoadingDish: state.dish.isLoadingDish,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addDishOrder: (dish) => dispatch(actions.addDishOrder(dish)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DishResult)
);
