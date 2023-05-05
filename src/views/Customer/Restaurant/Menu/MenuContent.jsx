import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import {
  isExistArrayAndNotEmpty,
  LANGUAGES,
  LIST_DISH_TYPE,
} from "../../../../utils";
import { Grid, Button } from "@material-ui/core";
import { Skeleton } from "@mui/material";
import "./MenuContent.scss";
import DetailDish from "./DetailDish";
import CustomerLogin from "../../Auth/CustomerLogin";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";

class MenuContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenDetailDishDialog: false,
      isOpenCustomerLoginDialog: false,
      listDish: [],
      listFood: [],
      listDrink: [],
      dishIndex: 1,
      dishSelected: {},
      isLoadingDish: true,
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.isOpenCustomerLoginDialog !==
      this.props.isOpenCustomerLoginDialog
    ) {
      this.setState({
        isOpenCustomerLoginDialog: false,
      });
    }
    if (prevProps.listDish !== this.props.listDish) {
      this.getListFoodAndListDrink();
      this.setState({
        listDish: this.props.listDish,
      });
    }
    if (prevProps.isLoadingDish !== this.props.isLoadingDish) {
      this.setState({
        isLoadingDish: this.props.isLoadingDish,
      });
    }
  }

  getListFoodAndListDrink = () => {
    const { listDish } = this.props;
    if (isExistArrayAndNotEmpty(listDish)) {
      let listFood = listDish.filter(
        (item) => item.dishType === LIST_DISH_TYPE.FOOD
      );
      let listDrink = listDish.filter(
        (item) => item.dishType === LIST_DISH_TYPE.DRINK
      );

      this.setState({
        listFood: listFood,
        listDrink: listDrink,
      });
    }
  };

  handleViewDetailDish = (dishData, index) => {
    this.setState({
      isOpenDetailDishDialog: true,
      dishIndex: index + 1,
      dishSelected: dishData,
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

  render() {
    const { language, limit } = this.props;
    const {
      isOpenDetailDishDialog,
      isOpenCustomerLoginDialog,
      listFood,
      listDrink,
      dishIndex,
      dishSelected,
      isLoadingDish,
    } = this.state;

    return (
      <>
        {isLoadingDish ? (
          <>
            {!limit && (
              <Skeleton
                variant="text"
                width={100}
                sx={{
                  fontSize: "35px",
                  marginTop: "5px",
                }}
              />
            )}
            <Grid className="mt-3 px-3" container>
              <Grid>
                <Skeleton variant="rounded" width={80} height={80} />
              </Grid>
              <Grid item xs className="ml-3">
                <Skeleton
                  variant="text"
                  sx={{
                    fontSize: "30px",
                    marginTop: "-5px",
                  }}
                />
                <Skeleton variant="text" sx={{ fontSize: "13px" }} />
                <Skeleton variant="text" sx={{ fontSize: "13px" }} />
              </Grid>
            </Grid>
            <Grid className="mt-3 px-3" container>
              <Grid>
                <Skeleton variant="rounded" width={80} height={80} />
              </Grid>
              <Grid item xs className="ml-3">
                <Skeleton
                  variant="text"
                  sx={{
                    fontSize: "30px",
                    marginTop: "-5px",
                  }}
                />
                <Skeleton variant="text" sx={{ fontSize: "13px" }} />
                <Skeleton variant="text" sx={{ fontSize: "13px" }} />
              </Grid>
            </Grid>
            <Grid className="mt-3 px-3" container>
              <Grid>
                <Skeleton variant="rounded" width={80} height={80} />
              </Grid>
              <Grid item xs className="ml-3">
                <Skeleton
                  variant="text"
                  sx={{
                    fontSize: "30px",
                    marginTop: "-5px",
                  }}
                />
                <Skeleton variant="text" sx={{ fontSize: "13px" }} />
                <Skeleton variant="text" sx={{ fontSize: "13px" }} />
              </Grid>
            </Grid>
            <Grid className="mt-3 px-3" container>
              <Grid>
                <Skeleton variant="rounded" width={80} height={80} />
              </Grid>
              <Grid item xs className="ml-3">
                <Skeleton
                  variant="text"
                  sx={{
                    fontSize: "30px",
                    marginTop: "-5px",
                  }}
                />
                <Skeleton variant="text" sx={{ fontSize: "13px" }} />
                <Skeleton variant="text" sx={{ fontSize: "13px" }} />
              </Grid>
            </Grid>
          </>
        ) : (
          <Grid className="menu-content-container">
            {isExistArrayAndNotEmpty(listFood) ? (
              <>
                {!limit && (
                  <Grid className="dish-type-title">
                    <FormattedMessage id="customer.restaurant.menu.food" />
                  </Grid>
                )}
                <Grid className="list-dish">
                  {listFood.map((item, index) => {
                    return (
                      <Grid key={item.id} className="dish-content">
                        <Grid
                          className="dish-content-left"
                          onClick={() => {
                            this.handleViewDetailDish(item, index);
                          }}
                        >
                          <Grid
                            className="dish-avatar background-image-center-cover"
                            style={{
                              backgroundImage: `url(${item.avatarBase64})`,
                            }}
                          ></Grid>
                          <Grid className="dish-information ml-3">
                            <Grid className="dish-name">
                              {language === LANGUAGES.VI
                                ? item.nameVi
                                : item.nameEn}
                            </Grid>
                            <Grid className="dish-price">
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
                            <Grid className="dish-country">
                              {language === LANGUAGES.VI
                                ? item.countryData.valueVi
                                : item.countryData.valueEn}
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid className="dish-content-right">
                          <Button
                            className="w-100 btn-order"
                            variant="outlined"
                            onClick={() => {
                              this.handleOrderDish(item);
                            }}
                          >
                            <FormattedMessage id="customer.restaurant.menu.order" />
                          </Button>
                        </Grid>
                      </Grid>
                    );
                  })}
                </Grid>
              </>
            ) : (
              <Grid className="list-content-empty-text">
                <FormattedMessage id="customer.restaurant.menu.menu-empty-text" />
              </Grid>
            )}
            {!limit && isExistArrayAndNotEmpty(listFood) && (
              <Grid>
                {isExistArrayAndNotEmpty(listDrink) && (
                  <>
                    <Grid className="dish-type-title">
                      <FormattedMessage id="customer.restaurant.menu.drink" />
                    </Grid>
                    <Grid className="list-dish">
                      {listDrink.map((item, index) => {
                        return (
                          <Grid key={item.id} className="dish-content">
                            <Grid
                              className="dish-content-left"
                              onClick={() => {
                                this.handleViewDetailDish(item, index);
                              }}
                            >
                              <Grid
                                className="dish-avatar background-image-center-cover"
                                style={
                                  item.avatarBase64
                                    ? {
                                        backgroundImage: `url(${item.avatarBase64})`,
                                      }
                                    : {}
                                }
                              ></Grid>
                              <Grid className="dish-information ml-3">
                                <Grid className="dish-name">
                                  {language === LANGUAGES.VI
                                    ? item.nameVi
                                    : item.nameEn}
                                </Grid>
                                <Grid className="dish-price">
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
                                <Grid className="dish-country">
                                  {language === LANGUAGES.VI
                                    ? item.countryData.valueVi
                                    : item.countryData.valueEn}
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid className="dish-content-right">
                              <Button
                                className="w-100 btn-order"
                                variant="outlined"
                                onClick={() => {
                                  this.handleOrderDish(item);
                                }}
                              >
                                <FormattedMessage id="customer.restaurant.menu.order" />
                              </Button>
                            </Grid>
                          </Grid>
                        );
                      })}
                    </Grid>
                  </>
                )}
              </Grid>
            )}
            {isOpenDetailDishDialog && (
              <DetailDish
                isOpen={isOpenDetailDishDialog}
                handleCloseDialog={this.handleCloseDetailDishDialog}
                dishIndex={dishIndex}
                dishData={dishSelected}
                orderDish={this.handleOrderDish}
              />
            )}
            {isOpenCustomerLoginDialog && (
              <CustomerLogin
                isOpen={isOpenCustomerLoginDialog}
                handleCloseDialog={this.handleCloseCustomerLoginDialog}
              />
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
    customerInfo: state.user.customerInfo,
    isOpenCustomerLoginDialog: state.user.isOpenCustomerLoginDialog,
    listDish: state.dish.listDish,
    isLoadingDish: state.dish.isLoadingDish,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addDishOrder: (dish) => dispatch(actions.addDishOrder(dish)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuContent);
