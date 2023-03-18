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
import DetailFood from "./DetailFood";
import CustomerLogin from "../../Auth/CustomerLogin";
import { toast } from "react-toastify";

class MenuContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenDetailFoodDialog: false,
      isOpenCustomerLoginDialog: false,
      listFood: [],
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
    if (prevProps.listFood !== this.props.listFood) {
      this.setState({
        listFood: this.props.listFood,
      });
    }
  }

  handleViewDetailFood = () => {
    this.setState({
      isOpenDetailFoodDialog: true,
    });
  };

  handleCloseDetailFoodDialog = () => {
    this.setState({
      isOpenDetailFoodDialog: false,
    });
  };

  handleOrderFood = (food) => {
    const { customerInfo } = this.props;
    if (!customerInfo) {
      toast.info("Vui lòng đăng nhập trước", { theme: "light" });
      this.setState({
        isOpenCustomerLoginDialog: true,
      });
    } else {
      this.props.addFoodOrder(food);
    }
  };

  handleCloseCustomerLoginDialog = () => {
    this.setState({
      isOpenCustomerLoginDialog: false,
    });
  };

  render() {
    const { language } = this.props;
    const { isOpenDetailFoodDialog, isOpenCustomerLoginDialog, listFood } =
      this.state;

    return (
      <>
        <Grid className="menu-content-container">
          <Grid className="list-food">
            {isExistArrayAndNotEmpty(listFood) &&
              listFood.map((item) => {
                return (
                  <Grid key={item.id} className="food-content">
                    <Grid
                      className="food-content-left"
                      onClick={() => {
                        this.handleViewDetailFood();
                      }}
                    >
                      <Grid
                        className="food-avatar background-image-center-cover"
                        style={{
                          backgroundImage: `url(${
                            process.env.REACT_APP_BACKEND_URL + item.avatar
                          })`,
                        }}
                      ></Grid>
                      <Grid className="food-information ml-3">
                        <Grid className="food-name">
                          {language === LANGUAGES.VI
                            ? item.nameVi
                            : item.nameEn}
                        </Grid>
                        <Grid className="food-price">
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
                        <Grid className="food-country">
                          {language === LANGUAGES.VI
                            ? item.countryData.valueVi
                            : item.countryData.valueEn}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid className="food-content-right">
                      <Button
                        className="btn-order"
                        variant="outlined"
                        onClick={() => {
                          this.handleOrderFood(item);
                        }}
                      >
                        Đặt món
                      </Button>
                    </Grid>
                  </Grid>
                );
              })}
          </Grid>
          {isOpenDetailFoodDialog && (
            <DetailFood
              isOpen={isOpenDetailFoodDialog}
              handleCloseDialog={this.handleCloseDetailFoodDialog}
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
    listFood: state.food.listFood,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addFoodOrder: (food) => dispatch(actions.addFoodOrder(food)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuContent);
