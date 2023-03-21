import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "./HomeHeader/HomeHeader";
import HomeFooter from "./HomeFooter/HomeFooter";
import "./Homepage.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RestaurantHighScore from "./HomeSections/RestaurantHighScore";
import DishHighOrder from "./HomeSections/DishHighOrder";
import HaNoiRestaurant from "./HomeSections/HaNoiRestaurant";
import _ from "lodash";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: true,
    };

    return (
      <>
        <HomeHeader isShowBanner={true} />
        <RestaurantHighScore settings={settings} />
        <DishHighOrder settings={settings} />
        <HaNoiRestaurant settings={settings} />
        <HomeFooter />
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
