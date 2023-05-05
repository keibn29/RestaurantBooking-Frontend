import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import {
  PAGE,
  PATH,
  PROVINCES,
  buildProvinceReactSelect,
} from "../../../../utils";
import { withRouter } from "react-router";
import * as actions from "../../../../store/actions";
import { Grid, Button, Container } from "@material-ui/core";
import RestaurantSlider from "./RestaurantSlider";
import { searchRestaurant } from "../../../../services/restaurantService";
import { toast } from "react-toastify";

class HaNoiRestaurant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listHaNoiRestaurant: [],
      provinceSelected: "",
    };
  }

  componentDidMount() {
    this.fetchListRestaurantInHaNoi();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listProvince !== this.props.listProvince) {
      this.getProvinceSelectedPassToSearchpage();
    }
    if (prevProps.language !== this.props.language) {
      this.getProvinceSelectedPassToSearchpage();
    }
  }

  getProvinceSelectedPassToSearchpage = () => {
    const newListProvince = buildProvinceReactSelect(
      this.props.listProvince,
      this.props.language
    );
    let provinceSelected = newListProvince.find(
      (item) => item.value === PROVINCES.HANOI
    );
    this.setState({
      provinceSelected: provinceSelected,
    });
  };

  fetchListRestaurantInHaNoi = async () => {
    const res = await searchRestaurant(
      {
        pageSize: process.env.REACT_APP_NUMBER_ITEM_SLIDE_HOMEPAGE,
        pageOrder: 1,
        page: PAGE.HOMEPAGE,
        provinceId: PROVINCES.HANOI,
      },
      this.props.language
    );
    if (res && res.errCode === 0) {
      this.setState({
        listHaNoiRestaurant: res.listRestaurant,
      });
    } else {
      toast.error(res.errMessage);
    }
  };

  handleOpenSearchpage = () => {
    const { provinceSelected } = this.state;
    if (this.props.history) {
      this.props.history.push({
        pathname: PATH.SEARCHPAGE,
        state: {
          province: provinceSelected,
        },
      });
    }
  };

  render() {
    const { listHaNoiRestaurant } = this.state;

    return (
      <>
        <Container className="section-container">
          <Grid className="section-header home-container">
            <Grid className="section-header-title">
              <FormattedMessage id="customer.homepage.home-sections.restaurant-in-hanoi-title" />
            </Grid>
            <Grid className="section-header-text">
              <FormattedMessage id="customer.homepage.home-sections.restaurant-in-hanoi-text" />
            </Grid>
          </Grid>
          <RestaurantSlider listRestaurant={listHaNoiRestaurant} />
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
    listProvince: state.allCode.listProvince,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListRestaurant: (data, language) =>
      dispatch(actions.getListRestaurant(data, language)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HaNoiRestaurant)
);
