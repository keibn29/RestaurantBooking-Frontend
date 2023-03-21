import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import { isExistArrayAndNotEmpty, LANGUAGES } from "../../../../utils";
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
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import "./MenuContent.scss";
import DetailDish from "./DetailDish";
import CustomerLogin from "../../Auth/CustomerLogin";
import { toast } from "react-toastify";

class MenuContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenDetailDishDialog: false,
      isOpenCustomerLoginDialog: false,
      listDish: [],
      dishIndex: 1,
      dishSelected: {},
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.isOpenCustomerLoginDialog !==
      this.props.isOpenCustomerLoginDialog
    ) {
      this.setState({
        isOpenCustomerLoginDialog: this.props.isOpenCustomerLoginDialog,
      });
    }
    if (prevProps.listDish !== this.props.listDish) {
      this.setState({
        listDish: this.props.listDish,
      });
    }
  }

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
      delete dish.avatarBase64;
      this.props.addDishOrder(dish);
    }
  };

  handleCloseCustomerLoginDialog = () => {
    this.setState({
      isOpenCustomerLoginDialog: false,
    });
  };

  render() {
    const { language } = this.props;
    const {
      isOpenDetailDishDialog,
      isOpenCustomerLoginDialog,
      listDish,
      dishIndex,
      dishSelected,
    } = this.state;

    return (
      <>
        <Grid className="menu-content-container">
          <Grid className="list-dish">
            {isExistArrayAndNotEmpty(listDish) &&
              listDish.map((item, index) => {
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
                          Giá:{" "}
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
                        Đặt món
                      </Button>
                    </Grid>
                  </Grid>
                );
              })}
          </Grid>
          {isOpenDetailDishDialog && (
            <DetailDish
              isOpen={isOpenDetailDishDialog}
              handleCloseDialog={this.handleCloseDetailDishDialog}
              dishIndex={dishIndex}
              dishData={dishSelected}
            />
          )}
          {isOpenCustomerLoginDialog && (
            <CustomerLogin
              isOpen={isOpenCustomerLoginDialog}
              handleCloseDialog={this.handleCloseCustomerLoginDialog}
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
    isOpenCustomerLoginDialog: state.user.isOpenCustomerLoginDialog,
    listDish: state.dish.listDish,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addDishOrder: (dish) => dispatch(actions.addDishOrder(dish)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuContent);
