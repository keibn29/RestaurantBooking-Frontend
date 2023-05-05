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
import ChatRealTime from "./ChatRealTime/ChatRealTime";
import TopHandbook from "./HomeSections/TopHandbook";

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    document.getElementById("homepage-top").scrollIntoView({
      block: "end",
    });
  }

  render() {
    return (
      <>
        <HomeHeader isShowBanner={true} />
        <RestaurantHighScore />
        <DishHighOrder />
        <HaNoiRestaurant />
        <TopHandbook />
        <ChatRealTime />
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

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
