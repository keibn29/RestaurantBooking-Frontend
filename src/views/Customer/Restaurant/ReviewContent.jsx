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
import "./ReviewContent.scss";

class ReviewContent extends Component {
  render() {
    let { language } = this.props;

    return (
      <>
        <Grid className="review-content-container">
          <Grid className="restaurant-content-title">Reviews</Grid>
          <Grid className="review-content-top">
            <Grid className="review-content-top-left">
              <Grid className="review-content-top-left-up">4.5</Grid>
              <Grid className="review-content-top-left-center">*****</Grid>
              <Grid className="review-content-top-left-down">100 reviews</Grid>
            </Grid>
            <Grid className="review-content-top-right">
              <Bar
                data={{
                  labels: ["5", "4", "3", "2", "1"],
                  datasets: [
                    {
                      backgroundColor: [
                        "#3FAF6C",
                        "#53CB82",
                        "#B4DC7E",
                        "#F9B233",
                        "#F87C32",
                      ],
                      data: [349, 133, 25, 13, 5],
                      datalabels: {
                        anchor: "start",
                        clamp: true,
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
                      max: 349 + 50,
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
            <Grid className="review-content-bottom-up"></Grid>
            <Grid className="review-content-bottom-down">
              <Grid className="list-review">
                <Grid className="content">
                  <Grid className="customer-information-and-score">
                    <Grid className="customer-information">
                      <Grid className="customer-information-left background-image-center-cover"></Grid>
                      <Grid className="customer-information-right">
                        <Grid className="customer-name">Nguyen Duc Long</Grid>
                        <Grid className="customer-date">6/3/2023</Grid>
                      </Grid>
                    </Grid>
                    <Grid className="review-score">
                      4/<span>5</span>
                    </Grid>
                  </Grid>
                  <Grid className="review-text">
                    Service impeccable et nourriture fraîche et bonnes !
                  </Grid>
                </Grid>
                <Grid className="content">
                  <Grid className="customer-information-and-score">
                    <Grid className="customer-information">
                      <Grid className="customer-information-left background-image-center-cover"></Grid>
                      <Grid className="customer-information-right">
                        <Grid className="customer-name">Nguyen Duc Long</Grid>
                        <Grid className="customer-date">6/3/2023</Grid>
                      </Grid>
                    </Grid>
                    <Grid className="review-score">
                      4/<span>5</span>
                    </Grid>
                  </Grid>
                  <Grid className="review-text">
                    Service impeccable et nourriture fraîche et bonnes !
                  </Grid>
                </Grid>
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

export default connect(mapStateToProps, mapDispatchToProps)(ReviewContent);
