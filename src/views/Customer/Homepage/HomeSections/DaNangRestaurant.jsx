import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { LANGUAGES, isExistArrayAndNotEmpty } from "../../../../utils";
import { withRouter } from "react-router";
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
import Slider from "react-slick";

class DaNangRestaurant extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { language, settings } = this.props;

    return (
      <>
        <Container className="section-container">
          <Grid className="section-header home-container">
            <Grid className="section-header-title">Nhà hàng tại Đà Nẵng</Grid>
            <Grid className="section-header-text">
              Tổng hợp những nhà hàng nổi tiếng tại Đà Nẵng
            </Grid>
          </Grid>
          <Grid className="section-body">
            <Slider {...settings}>
              <Grid className="section-body-outer">
                <Grid className="content">
                  <Grid className="content-top background-image-center-cover"></Grid>
                  <Grid className="content-bottom">
                    <Grid className="content-bottom-up">
                      Augustus Harris restaurant
                    </Grid>
                    <Grid className="content-bottom-down">
                      <Grid className="restaurant-information">
                        <Grid className="restaurant-province">Hà Nội</Grid>
                        <Grid className="restaurant-country">Nhật Bản</Grid>
                      </Grid>
                      <Grid className="restaurant-score">5/5</Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid className="section-body-outer">
                <Grid className="content">
                  <Grid className="content-top background-image-center-cover"></Grid>
                  <Grid className="content-bottom">
                    <Grid className="content-bottom-up">
                      Augustus Harris restaurant
                    </Grid>
                    <Grid className="content-bottom-down">
                      <Grid className="restaurant-information">
                        <Grid className="restaurant-province">Hà Nội</Grid>
                        <Grid className="restaurant-country">Nhật Bản</Grid>
                      </Grid>
                      <Grid className="restaurant-score">5/5</Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid className="section-body-outer">
                <Grid className="content">
                  <Grid className="content-top background-image-center-cover"></Grid>
                  <Grid className="content-bottom">
                    <Grid className="content-bottom-up">
                      Augustus Harris restaurant
                    </Grid>
                    <Grid className="content-bottom-down">
                      <Grid className="restaurant-information">
                        <Grid className="restaurant-province">Hà Nội</Grid>
                        <Grid className="restaurant-country">Nhật Bản</Grid>
                      </Grid>
                      <Grid className="restaurant-score">5/5</Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid className="section-body-outer">
                <Grid className="content">
                  <Grid className="content-top background-image-center-cover"></Grid>
                  <Grid className="content-bottom">
                    <Grid className="content-bottom-up">
                      Augustus Harris restaurant
                    </Grid>
                    <Grid className="content-bottom-down">
                      <Grid className="restaurant-information">
                        <Grid className="restaurant-province">Hà Nội</Grid>
                        <Grid className="restaurant-country">Nhật Bản</Grid>
                      </Grid>
                      <Grid className="restaurant-score">5/5</Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid className="section-body-outer">
                <Grid className="content">
                  <Grid className="content-top background-image-center-cover"></Grid>
                  <Grid className="content-bottom">
                    <Grid className="content-bottom-up">
                      Augustus Harris restaurant
                    </Grid>
                    <Grid className="content-bottom-down">
                      <Grid className="restaurant-information">
                        <Grid className="restaurant-province">Hà Nội</Grid>
                        <Grid className="restaurant-country">Nhật Bản</Grid>
                      </Grid>
                      <Grid className="restaurant-score">5/5</Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid className="section-body-outer">
                <Grid className="content">
                  <Grid className="content-top background-image-center-cover"></Grid>
                  <Grid className="content-bottom">
                    <Grid className="content-bottom-up">
                      Augustus Harris restaurant
                    </Grid>
                    <Grid className="content-bottom-down">
                      <Grid className="restaurant-information">
                        <Grid className="restaurant-province">Hà Nội</Grid>
                        <Grid className="restaurant-country">Nhật Bản</Grid>
                      </Grid>
                      <Grid className="restaurant-score">5/5</Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Slider>
          </Grid>
        </Container>
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
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DaNangRestaurant)
);
