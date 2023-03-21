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
import "./DishOrder.scss";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";

class DishOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {}

  handleRemoveDishOrderItem = (dishId) => {
    const { listDishOrder, handleCloseDialog } = this.props;
    this.props.removeDishOrderItem(dishId);
    if (listDishOrder.length <= 1) {
      handleCloseDialog();
    }
  };

  render() {
    const { language, isOpen, handleCloseDialog, listDishOrder } = this.props;
    const {} = this.state;

    return (
      <>
        <Dialog
          open={isOpen}
          maxWidth="xs"
          fullWidth={true}
          onClose={handleCloseDialog}
        >
          <Grid className="dish-order-container">
            <Grid className="dish-order-header">
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
            <Grid className="dish-order-body">
              <Grid className="list-dish-order">
                {isExistArrayAndNotEmpty(listDishOrder) &&
                  [...listDishOrder].reverse().map((item) => {
                    return (
                      <Grid key={item.id} className="dish-order-content">
                        <Grid className="dish-order-content-left">
                          <Grid
                            className="dish-order-avatar background-image-center-cover"
                            style={{
                              backgroundImage: `url(${
                                process.env.REACT_APP_BACKEND_URL + item.avatar
                              })`,
                            }}
                          ></Grid>
                          <Grid className="dish-order-name-price-country">
                            <Grid className="dish-order-name">
                              {language === LANGUAGES.VI
                                ? item.nameVi
                                : item.nameEn}
                            </Grid>
                            <Grid className="dish-order-price">
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
                            <Grid className="dish-order-country">
                              {language === LANGUAGES.VI
                                ? item.countryData.valueVi
                                : item.countryData.valueEn}
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid className="dish-order-content-right">
                          <Icon
                            className="btn-remove-dish-order"
                            onClick={() => {
                              this.handleRemoveDishOrderItem(item.id);
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
            <Grid className="dish-order-footer">
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
    removeDishOrderItem: (dishId) => dispatch(actions.updateDishOrder(dishId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DishOrder);
