import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { PAGE, PATH } from "../../../../utils";
import { withRouter } from "react-router";
import * as actions from "../../../../store/actions";
import { Grid, Button, Container } from "@material-ui/core";
import RestaurantSlider from "./RestaurantSlider";
import { searchRestaurant } from "../../../../services/restaurantService";
import { toast } from "react-toastify";

class RestaurantHighScore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listRestaurantHighScore: [],
    };
  }

  componentDidMount() {
    this.fetchListRestaurantHighScore();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  fetchListRestaurantHighScore = async () => {
    const res = await searchRestaurant(
      {
        pageSize: process.env.REACT_APP_NUMBER_ITEM_SLIDE_HOMEPAGE,
        pageOrder: 1,
        page: PAGE.HOMEPAGE,
      },
      this.props.language
    );
    if (res && res.errCode === 0) {
      this.setState({
        listRestaurantHighScore: res.listRestaurant,
      });
    } else {
      toast.error(res.errMessage);
    }
  };

  handleOpenSearchpage = async () => {
    if (this.props.history) {
      this.props.history.push(PATH.SEARCHPAGE);
    }
  };

  render() {
    const { listRestaurantHighScore } = this.state;

    return (
      <>
        <Container className="section-container">
          <Grid className="section-banner">
            <FormattedMessage id="customer.homepage.home-sections.together-text" />
          </Grid>
          <Grid className="section-header home-container">
            <Grid className="section-header-title">
              <FormattedMessage id="customer.homepage.home-sections.restaurant-most-score-title" />
            </Grid>
            <Grid className="section-header-text">
              <FormattedMessage id="customer.homepage.home-sections.restaurant-most-score-text" />
            </Grid>
          </Grid>
          <RestaurantSlider listRestaurant={listRestaurantHighScore} />
          <Grid className="section-footer home-container">
            <Button
              className="btn-more"
              variant="outlined"
              onClick={() => {
                this.handleOpenSearchpage();
              }}
            >
              <FormattedMessage id="customer.homepage.home-sections.see-more-restaurant" />
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
