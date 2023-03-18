import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../Homepage/HomeHeader/HomeHeader";
// import HomeFooter from "./HomeFooter";
import "./DetailRestaurant.scss";
import { NAV_DETAIL_RESTAURANT } from "../../../utils";
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
import RestaurantGeneralInformation from "./GeneralInformation/RestaurantGeneralInformation";
import RestaurantSchedule from "./Schedule/RestaurantSchedule";
import RestaurantAbout from "./About/RestaurantAbout";
import RestaurantMenu from "./Menu/RestaurantMenu";
import RestaurantPhoto from "./Photos/RestaurantPhoto";
import RestaurantReview from "./Reviews/RestaurantReview";
import RestaurantNav from "./RestaurantNav";

class DetailRestaurant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navSelected: NAV_DETAIL_RESTAURANT.ABOUT,
      restaurantId: "",
    };
  }

  componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.restaurantId
    ) {
      let restaurantId = this.props.match.params.restaurantId;
      this.setState({
        restaurantId: restaurantId,
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  handleChangeNavSelected = (navSelected) => {
    this.setState({
      navSelected: navSelected,
    });
  };

  render() {
    const { navSelected, restaurantId } = this.state;

    return (
      <>
        <HomeHeader isShowHeaderSearch={true} />
        <Grid className="restaurant-container pt-4">
          <Container>
            <Grid container spacing={3}>
              <Grid item xs={8} container>
                <Grid
                  item
                  xs={12}
                  className="restaurant-content restaurant-general"
                >
                  <RestaurantGeneralInformation />
                </Grid>
                <Grid item xs={12} className="restaurant-nav">
                  <RestaurantNav
                    handleChangeNavSelected={this.handleChangeNavSelected}
                    navSelected={navSelected}
                  />
                </Grid>
                <Grid item xs={12} id="detail-restaurant-top">
                  {navSelected === NAV_DETAIL_RESTAURANT.ABOUT && (
                    <RestaurantAbout
                      handleChangeNavSelected={this.handleChangeNavSelected}
                      restaurantId={restaurantId}
                    />
                  )}
                  {navSelected === NAV_DETAIL_RESTAURANT.MENU && (
                    <Grid className="restaurant-content restaurant-menu mt-4">
                      <RestaurantMenu restaurantId={restaurantId} />
                    </Grid>
                  )}
                  {navSelected === NAV_DETAIL_RESTAURANT.PHOTOS && (
                    <Grid className="restaurant-content restaurant-photo mt-4">
                      <RestaurantPhoto />
                    </Grid>
                  )}
                  {navSelected === NAV_DETAIL_RESTAURANT.REVIEWS && (
                    <Grid className="restaurant-content restaurant-review mt-4">
                      <RestaurantReview />
                    </Grid>
                  )}
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Grid className="restaurant-content restaurant-schedule">
                  <RestaurantSchedule restaurantId={restaurantId} />
                </Grid>
              </Grid>
            </Grid>
          </Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailRestaurant);
