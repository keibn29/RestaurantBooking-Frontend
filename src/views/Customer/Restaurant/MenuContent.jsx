import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { LANGUAGE, LANGUAGES } from "../../../utils";
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
import { Language, Phone, PinDropOutlined } from "@material-ui/icons";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import "./MenuContent.scss";

class MenuContent extends Component {
  render() {
    let { language } = this.props;

    return (
      <>
        <Grid className="menu-content-container">
          <Grid className="restaurant-content-title">Menu</Grid>
          <Grid className="list-food">
            <Grid className="food-content">
              <Grid container className="food-content-left">
                <Grid
                  item
                  className="food-avatar background-image-center-cover"
                ></Grid>
                <Grid item className="food-information ml-3">
                  <Grid className="food-name">Món ăn số 1</Grid>
                  <Grid className="food-price">Giá: 200000VND</Grid>
                  <Grid className="food-country">Nhật Bản</Grid>
                </Grid>
              </Grid>
              <Grid className="food-content-right">
                <Button className="btn-order" variant="outlined">
                  Đặt món
                </Button>
              </Grid>
            </Grid>
            <Grid className="food-content">
              <Grid container className="food-content-left">
                <Grid
                  item
                  className="food-avatar background-image-center-cover"
                ></Grid>
                <Grid item className="food-information ml-3">
                  <Grid className="food-name">Món ăn số 2</Grid>
                  <Grid className="food-price">Giá: 300000VND</Grid>
                  <Grid className="food-country">Nhật Bản</Grid>
                </Grid>
              </Grid>
              <Grid className="food-content-right">
                <Button className="btn-order" variant="outlined">
                  Đặt món
                </Button>
              </Grid>
            </Grid>
            <Grid className="food-content">
              <Grid container className="food-content-left">
                <Grid
                  item
                  className="food-avatar background-image-center-cover"
                ></Grid>
                <Grid item className="food-information ml-3">
                  <Grid className="food-name">Món ăn số 2</Grid>
                  <Grid className="food-price">Giá: 300000VND</Grid>
                  <Grid className="food-country">Nhật Bản</Grid>
                </Grid>
              </Grid>
              <Grid className="food-content-right">
                <Button className="btn-order" variant="outlined">
                  Đặt món
                </Button>
              </Grid>
            </Grid>
            <Grid className="food-content">
              <Grid container className="food-content-left">
                <Grid
                  item
                  className="food-avatar background-image-center-cover"
                ></Grid>
                <Grid item className="food-information ml-3">
                  <Grid className="food-name">Món ăn số 2</Grid>
                  <Grid className="food-price">Giá: 300000VND</Grid>
                  <Grid className="food-country">Nhật Bản</Grid>
                </Grid>
              </Grid>
              <Grid className="food-content-right">
                <Button className="btn-order" variant="outlined">
                  Đặt món
                </Button>
              </Grid>
            </Grid>
            <Grid className="food-content">
              <Grid container className="food-content-left">
                <Grid
                  item
                  className="food-avatar background-image-center-cover"
                ></Grid>
                <Grid item className="food-information ml-3">
                  <Grid className="food-name">Món ăn số 2</Grid>
                  <Grid className="food-price">Giá: 300000VND</Grid>
                  <Grid className="food-country">Nhật Bản</Grid>
                </Grid>
              </Grid>
              <Grid className="food-content-right">
                <Button className="btn-order" variant="outlined">
                  Đặt món
                </Button>
              </Grid>
            </Grid>
            <Grid className="food-content">
              <Grid container className="food-content-left">
                <Grid
                  item
                  className="food-avatar background-image-center-cover"
                ></Grid>
                <Grid item className="food-information ml-3">
                  <Grid className="food-name">Món ăn số 2</Grid>
                  <Grid className="food-price">Giá: 300000VND</Grid>
                  <Grid className="food-country">Nhật Bản</Grid>
                </Grid>
              </Grid>
              <Grid className="food-content-right">
                <Button className="btn-order" variant="outlined">
                  Đặt món
                </Button>
              </Grid>
            </Grid>
            <Grid className="food-content">
              <Grid container className="food-content-left">
                <Grid
                  item
                  className="food-avatar background-image-center-cover"
                ></Grid>
                <Grid item className="food-information ml-3">
                  <Grid className="food-name">Món ăn số 2</Grid>
                  <Grid className="food-price">Giá: 300000VND</Grid>
                  <Grid className="food-country">Nhật Bản</Grid>
                </Grid>
              </Grid>
              <Grid className="food-content-right">
                <Button className="btn-order" variant="outlined">
                  Đặt món
                </Button>
              </Grid>
            </Grid>
            <Grid className="food-content">
              <Grid container className="food-content-left">
                <Grid
                  item
                  className="food-avatar background-image-center-cover"
                ></Grid>
                <Grid item className="food-information ml-3">
                  <Grid className="food-name">Món ăn số 2</Grid>
                  <Grid className="food-price">Giá: 300000VND</Grid>
                  <Grid className="food-country">Nhật Bản</Grid>
                </Grid>
              </Grid>
              <Grid className="food-content-right">
                <Button className="btn-order" variant="outlined">
                  Đặt món
                </Button>
              </Grid>
            </Grid>
            <Grid className="food-content">
              <Grid container className="food-content-left">
                <Grid
                  item
                  className="food-avatar background-image-center-cover"
                ></Grid>
                <Grid item className="food-information ml-3">
                  <Grid className="food-name">Món ăn số 2</Grid>
                  <Grid className="food-price">Giá: 300000VND</Grid>
                  <Grid className="food-country">Nhật Bản</Grid>
                </Grid>
              </Grid>
              <Grid className="food-content-right">
                <Button className="btn-order" variant="outlined">
                  Đặt món
                </Button>
              </Grid>
            </Grid>
            <Grid className="food-content">
              <Grid container className="food-content-left">
                <Grid
                  item
                  className="food-avatar background-image-center-cover"
                ></Grid>
                <Grid item className="food-information ml-3">
                  <Grid className="food-name">Món ăn số 2</Grid>
                  <Grid className="food-price">Giá: 300000VND</Grid>
                  <Grid className="food-country">Nhật Bản</Grid>
                </Grid>
              </Grid>
              <Grid className="food-content-right">
                <Button className="btn-order" variant="outlined">
                  Đặt món
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuContent);
