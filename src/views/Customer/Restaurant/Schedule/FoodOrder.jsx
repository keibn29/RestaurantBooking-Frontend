import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import {
  isExistArrayAndNotEmpty,
  LANGUAGE,
  LANGUAGES,
} from "../../../../utils";
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
  Dialog,
} from "@material-ui/core";
import "./FoodOrder.scss";
import Flatpickr from "react-flatpickr";
// import "flatpickr/dist/themes/material_white.css";
import "flatpickr/dist/flatpickr.css";

class FoodOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {}

  handleRemoveFoodOrderItem = (foodId) => {
    this.props.removeFoodOrderItem(foodId);
  };

  render() {
    const { language, isOpen, handleCloseDialog, listFoodOrder } = this.props;
    const {} = this.state;

    return (
      <>
        <Dialog
          open={isOpen}
          maxWidth="xs"
          fullWidth={true}
          onClose={handleCloseDialog}
        >
          <Grid className="food-order-container">
            <Grid className="food-order-header">
              Danh sách món ăn dự định đặt
              <IconButton
                className="btn-close-dialog"
                onClick={() => {
                  handleCloseDialog();
                }}
              >
                <Icon color="error" title="Đóng">
                  close
                </Icon>
              </IconButton>
            </Grid>
            <Grid className="food-order-body">
              <Grid className="list-food-order">
                {isExistArrayAndNotEmpty(listFoodOrder) &&
                  [...listFoodOrder].reverse().map((item) => {
                    return (
                      <Grid key={item.id} className="food-order-content">
                        <Grid className="food-order-content-left">
                          <Grid
                            className="food-order-avatar background-image-center-cover"
                            style={{
                              backgroundImage: `url(${
                                process.env.REACT_APP_BACKEND_URL + item.avatar
                              })`,
                            }}
                          ></Grid>
                          <Grid className="food-order-name-price-country">
                            <Grid className="food-order-name">
                              {language === LANGUAGES.VI
                                ? item.nameVi
                                : item.nameEn}
                            </Grid>
                            <Grid className="food-order-price">
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
                            <Grid className="food-order-country">
                              {language === LANGUAGES.VI
                                ? item.countryData.valueVi
                                : item.countryData.valueEn}
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid className="food-order-content-right">
                          <Icon
                            className="btn-remove-food-order"
                            onClick={() => {
                              this.handleRemoveFoodOrderItem(item.id);
                            }}
                          >
                            highlight_off
                          </Icon>
                        </Grid>
                      </Grid>
                    );
                  })}
              </Grid>
            </Grid>
            <Grid className="food-order-footer">
              <Button
                className="btn-confirm"
                variant="outlined"
                onClick={() => {
                  handleCloseDialog();
                }}
              >
                Xác nhận
              </Button>
            </Grid>
          </Grid>
        </Dialog>
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
  return {
    removeFoodOrderItem: (foodId) => dispatch(actions.updateFoodOrder(foodId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FoodOrder);
