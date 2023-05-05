import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import {
  LANGUAGES,
  NAV_DETAIL_RESTAURANT,
  OBJECT,
  PAGE,
  PATH,
  isExistArrayAndNotEmpty,
  sliderSettings,
} from "../../../../utils";
import { withRouter } from "react-router";
import * as actions from "../../../../store/actions";
import { Grid, Icon, Button, Container } from "@material-ui/core";
import Slider from "react-slick";
import DetailDish from "../../Restaurant/Menu/DetailDish";
import { toast } from "react-toastify";
import CustomerLogin from "../../Auth/CustomerLogin";

class DishHighOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenDetailDishDialog: false,
      dishIndex: 1,
      dishSelected: {},
      isOpenCustomerLoginDialog: false,
      restaurantId: "",
    };
  }

  componentDidMount() {
    this.props.getListDishByNumberOrder(
      {
        pageSize: process.env.REACT_APP_NUMBER_ITEM_SLIDE_HOMEPAGE,
        pageOrder: 1,
        page: PAGE.HOMEPAGE,
      },
      this.props.language
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.isOpenCustomerLoginDialog !==
      this.props.isOpenCustomerLoginDialog
    ) {
      this.setState({
        isOpenCustomerLoginDialog: false,
      });
    }
  }

  handleOpenSearchpage = async () => {
    if (this.props.history) {
      this.props.history.push({
        pathname: PATH.SEARCHPAGE,
        state: {
          object: OBJECT.DISH,
        },
      });
    }
  };

  handleViewDetailDish = (dishData, index) => {
    this.setState({
      isOpenDetailDishDialog: true,
      dishIndex: index + 1,
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
    const { language, listDish } = this.props;
    const {
      isOpenDetailDishDialog,
      dishIndex,
      dishSelected,
      isOpenCustomerLoginDialog,
    } = this.state;

    return (
      <>
        <Container className="section-container">
          <Grid className="section-header home-container">
            <Grid className="section-header-title">
              <FormattedMessage id="customer.homepage.home-sections.dish-most-order-title" />
            </Grid>
            <Grid className="section-header-text">
              <FormattedMessage id="customer.homepage.home-sections.dish-most-order-text" />
            </Grid>
          </Grid>
          <Grid className="section-body">
            <Slider {...sliderSettings}>
              {isExistArrayAndNotEmpty(listDish) &&
                listDish.map((item, index) => {
                  return (
                    <Grid key={item.id} className="section-body-outer">
                      <Grid
                        className="content"
                        onClick={() => {
                          this.handleViewDetailDish(item, index);
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
                          <Grid className="content-bottom-down dish">
                            <Grid className="dish-information">
                              <Grid container alignItems="center">
                                <Icon className="icon restaurant">
                                  home_work
                                </Icon>{" "}
                                {language === LANGUAGES.VI
                                  ? item.restaurantData?.nameVi
                                  : item.restaurantData?.nameEn}
                              </Grid>
                              <Grid container alignItems="center">
                                <i className="icon fas fa-utensils"></i>{" "}
                                {language === LANGUAGES.VI
                                  ? item.countryData?.valueVi
                                  : item.countryData?.valueEn}
                              </Grid>
                            </Grid>
                            <Grid className="total-order-container">
                              <span className="number">{item.totalOrder}</span>{" "}
                              <span className="text">
                                <FormattedMessage id="customer.homepage.home-sections.number-order" />
                              </span>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  );
                })}
            </Slider>
          </Grid>
          <Grid className="section-footer home-container">
            <Button
              className="btn-more"
              variant="outlined"
              onClick={() => {
                this.handleOpenSearchpage();
              }}
            >
              <FormattedMessage id="customer.homepage.home-sections.see-more-dish" />
            </Button>
          </Grid>
          {isOpenDetailDishDialog && (
            <DetailDish
              isOpen={isOpenDetailDishDialog}
              handleCloseDialog={this.handleCloseDetailDishDialog}
              dishIndex={dishIndex}
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
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    listDish: state.dish.listDish,
    customerInfo: state.user.customerInfo,
    isOpenCustomerLoginDialog: state.user.isOpenCustomerLoginDialog,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListDishByNumberOrder: (data, language) =>
      dispatch(actions.getListDish(data, language)),
    addDishOrder: (dish) => dispatch(actions.addDishOrder(dish)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DishHighOrder)
);
