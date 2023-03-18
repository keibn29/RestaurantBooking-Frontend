import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "./HomeHeader/HomeHeader";
// import HomeFooter from "./HomeFooter";
import "./Homepage.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RestaurantHighScore from "./HomeSections/RestaurantHighScore";
import FoodHighOrder from "./HomeSections/FoodHighOrder";
import HaNoiRestaurant from "./HomeSections/HaNoiRestaurant";
import DaNangRestaurant from "./HomeSections/DaNangRestaurant";
import HoChiMinhRestaurant from "./HomeSections/HoChiMinhRestaurant";

class HomePage extends Component {
  componentDidMount() {
    // document.getElementById("home-header").scrollIntoView({
    //   // behavior: "smooth",
    //   block: "end",
    // });
  }

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
      <div>
        <HomeHeader isShowBanner={true} />
        <RestaurantHighScore settings={settings} />
        <FoodHighOrder settings={settings} />
        <HaNoiRestaurant settings={settings} />
        <DaNangRestaurant settings={settings} />
        <HoChiMinhRestaurant settings={settings} />
        {/* <HomeFooter
                    isShowFanpage={true}
                /> */}
      </div>
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
