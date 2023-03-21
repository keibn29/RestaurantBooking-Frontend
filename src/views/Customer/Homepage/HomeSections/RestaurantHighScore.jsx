import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { LANGUAGES, isExistArrayAndNotEmpty } from "../../../../utils";
import { withRouter } from "react-router";
import * as actions from "../../../../store/actions";
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

class RestaurantHighScore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listRestaurant: [],
    };
  }

  componentDidMount() {
    this.props.getListRestaurant(
      {
        pageSize: process.env.REACT_APP_NUMBER_ITEM_SLIDE_HOMEPAGE,
        pageOrder: 1,
      },
      this.props.language
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listRestaurant !== this.props.listRestaurant) {
      this.setState({
        listRestaurant: this.props.listRestaurant,
      });
    }
  }

  handleOpenRestaurantPage = (restaurant) => {
    if (this.props.history) {
      this.props.history.push(`/restaurant/${restaurant.id}`);
    }
  };

  render() {
    const { language, settings } = this.props;
    const { listRestaurant } = this.state;

    return (
      <>
        <Container className="section-container">
          <Grid className="section-banner">
            Hãy cùng nhau khám phá các nhà hàng
          </Grid>
          <Grid className="section-header home-container">
            <Grid className="section-header-title">
              Nhà hàng có điểm cao nhất
            </Grid>
            <Grid className="section-header-text">
              Tổng hợp những nhà hàng được đánh giá cao nhất trên Chope
            </Grid>
          </Grid>
          <Grid className="section-body">
            <Slider {...settings}>
              {isExistArrayAndNotEmpty(listRestaurant) &&
                listRestaurant.map((item) => {
                  return (
                    <Grid className="section-body-outer" key={item.id}>
                      <Grid
                        className="content"
                        onClick={() => {
                          this.handleOpenRestaurantPage(item);
                        }}
                      >
                        <Grid
                          className="content-top background-image-center-cover"
                          style={{
                            backgroundImage: `url(${
                              process.env.REACT_APP_BACKEND_URL + item.avatar
                            })`,
                          }}
                        ></Grid>
                        <Grid className="content-bottom">
                          <Grid className="content-bottom-up">
                            {language === LANGUAGES.VI
                              ? item.nameVi
                              : item.nameEn}
                          </Grid>
                          <Grid className="content-bottom-down">
                            <Grid className="restaurant-information">
                              <Grid className="restaurant-province">
                                <i className="icon fas fa-map-marker-alt"></i>{" "}
                                {language === LANGUAGES.VI
                                  ? item.provinceData.valueVi
                                  : item.provinceData.valueEn}
                              </Grid>
                              <Grid className="restaurant-country">
                                <i className="icon fas fa-utensils"></i> Nhật
                                Bản
                              </Grid>
                            </Grid>
                            <Grid className="restaurant-score">
                              4.5/<span>5</span>
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
            <Button className="btn-more" variant="outlined">
              More Restaurants
            </Button>
          </Grid>
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    listRestaurant: state.restaurant.listRestaurant,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListRestaurant: (data, language) =>
      dispatch(actions.getListRestaurant(data, language)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RestaurantHighScore)
);
