import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../Homepage/HomeHeader/HomeHeader";
import HomeFooter from "../Homepage/HomeFooter/HomeFooter";
import * as actions from "../../../store/actions";
import "./DetailRestaurant.scss";
import { NAV_DETAIL_RESTAURANT } from "../../../utils";
import { Grid, Container } from "@material-ui/core";
import RestaurantGeneralInformation from "./GeneralInformation/RestaurantGeneralInformation";
import RestaurantSchedule from "./Schedule/RestaurantSchedule";
import RestaurantAbout from "./About/RestaurantAbout";
import RestaurantMenu from "./Menu/RestaurantMenu";
import RestaurantPhoto from "./Photos/RestaurantPhoto";
import RestaurantReview from "./Reviews/RestaurantReview";
import RestaurantNav from "./RestaurantNav";
import ChatRealTime from "../Homepage/ChatRealTime/ChatRealTime";
import { Backdrop, CircularProgress } from "@mui/material";

class DetailRestaurant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navSelected: NAV_DETAIL_RESTAURANT.ABOUT,
      restaurantId: "",
      isLoadingSendEmail: false,
    };
  }

  componentDidMount() {
    if (this.props.match?.params?.restaurantId) {
      const restaurantId = this.props.match.params.restaurantId;
      this.setState({
        restaurantId: +restaurantId,
      });
      this.props.getRestaurantById(+restaurantId);
    }

    if (this.props.location?.hash) {
      this.setState(
        {
          navSelected: this.props.location.hash,
        },
        () => {
          this.setMenuPositionScrollIntoView();
        }
      );
    }

    document.getElementById("detail-restaurant-top").scrollIntoView({
      block: "end",
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      this.props.location &&
      prevProps.location.hash !== this.props.location.hash
    ) {
      this.setState({
        navSelected: this.props.location.hash,
      });
    }
  }

  setMenuPositionScrollIntoView = () => {
    const { navSelected } = this.state;
    if (navSelected === NAV_DETAIL_RESTAURANT.MENU) {
      document.getElementById("restaurant-nav-top").scrollIntoView({});
      return;
    }
  };

  handleChangeBackropLoading = (boolean) => {
    this.setState({
      isLoadingSendEmail: boolean,
    });
  };

  render() {
    const { navSelected, restaurantId, isLoadingSendEmail } = this.state;

    return (
      <>
        <Grid className="restaurant-container">
          <HomeHeader isShowHeaderSearch={true} />
          <Container>
            <Grid container spacing={3}>
              <Grid item xs={8}>
                <Grid className="restaurant-content restaurant-general mt-4">
                  <RestaurantGeneralInformation />
                </Grid>
                <Grid className="restaurant-nav">
                  <RestaurantNav
                    restaurantId={restaurantId}
                    navSelected={navSelected}
                  />
                </Grid>
                <Grid id="restaurant-nav-top">
                  {navSelected === NAV_DETAIL_RESTAURANT.ABOUT && (
                    <RestaurantAbout restaurantId={restaurantId} />
                  )}
                  {navSelected === NAV_DETAIL_RESTAURANT.MENU && (
                    <Grid className="restaurant-content restaurant-menu mt-4">
                      <RestaurantMenu restaurantId={restaurantId} />
                    </Grid>
                  )}
                  {navSelected === NAV_DETAIL_RESTAURANT.PHOTOS && (
                    <Grid className="restaurant-content restaurant-photo mt-4">
                      <RestaurantPhoto restaurantId={restaurantId} />
                    </Grid>
                  )}
                  {navSelected === NAV_DETAIL_RESTAURANT.REVIEWS && (
                    <Grid className="restaurant-content restaurant-review mt-4">
                      <RestaurantReview restaurantId={restaurantId} />
                    </Grid>
                  )}
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Grid className="restaurant-content restaurant-schedule">
                  <RestaurantSchedule
                    restaurantId={restaurantId}
                    changeBackropLoading={this.handleChangeBackropLoading}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Container>
          <Backdrop open={isLoadingSendEmail} style={{ zIndex: 9999 }}>
            <CircularProgress color="colorhome" size={70} />
          </Backdrop>
          <ChatRealTime />
          <HomeFooter />
        </Grid>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRestaurantById: (restaurantId) =>
      dispatch(actions.getRestaurantById(restaurantId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailRestaurant);
