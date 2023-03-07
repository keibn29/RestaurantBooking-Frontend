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
import ReviewContent from "./ReviewContent";
import "./RestaurantAbout.scss";
import MenuContent from "./MenuContent";

class RestaurantAbout extends Component {
  render() {
    let { language } = this.props;

    return (
      <>
        <Grid className="restaurant-about-container">
          <Grid
            className="restaurant-content restaurant-about-about mt-4"
            id="top"
          >
            <Grid className="restaurant-content-title">About</Grid>
            <Grid className="restaurant-about-about-top">
              Great Nepalese Restaurant in London's Euston serves excellent
              Himalayan cuisine with tradition in mind. Since the age of 12,
              restaurateur Gopal Manandhar has been honing his skills in the
              kitchen, successfully providing for his whole family in Kathmandu
              at such a young age. Since 1982, he has been running the show with
              his family at Great Nepalese Restaurant in the heart of London.
              Recommended dishes here include the homemade vegetable momos
              (Nepalese dumplings), the hairyo fish or the khursani, a tasty
              dish consisting of duck with green chilli, tomato, onion,
              capiscum, ginger and a special sauce. Sound like a plan? Then book
              your table ahead of time and head to Great Nepalese Restaurant on
              Eversholt Street.
            </Grid>
            <Grid container className="restaurant-about-about-center">
              <Grid item xs={6} className="restaurant-about-about-center-left">
                <Grid>
                  <Language className="material-icon" /> Website
                </Grid>
                <Grid>
                  <Phone className="material-icon" /> 0123123123
                </Grid>
                <Grid>
                  <PinDropOutlined className="material-icon" /> 207 - Giai Phong
                  - Hai Ba Trung - Ha Noi
                </Grid>
              </Grid>
              <Grid item xs={6} className="restaurant-about-about-center-right">
                <Grid className="restaurant-about-about-center-right-header">
                  Open today
                </Grid>
                <Grid container>
                  <Grid item xs={6}>
                    Monday
                  </Grid>
                  <Grid item xs={6}>
                    11:00-22:00
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={6}>
                    Monday
                  </Grid>
                  <Grid item xs={6}>
                    11:00-22:00
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={6}>
                    Monday
                  </Grid>
                  <Grid item xs={6}>
                    11:00-22:00
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={6}>
                    Monday
                  </Grid>
                  <Grid item xs={6}>
                    11:00-22:00
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={6}>
                    Monday
                  </Grid>
                  <Grid item xs={6}>
                    11:00-22:00
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={6}>
                    Monday
                  </Grid>
                  <Grid item xs={6}>
                    11:00-22:00
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={6}>
                    Monday
                  </Grid>
                  <Grid item xs={6}>
                    11:00-22:00
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid className="restaurant-about-about-bottom background-image-center-cover"></Grid>
          </Grid>
          <Grid className="restaurant-content restaurant-about-menu mt-4">
            <MenuContent />
            <Grid className="restaurant-about-menu-see-more">
              <span>View Full Menu</span>
            </Grid>
          </Grid>
          <Grid className="restaurant-content restaurant-about-photo mt-4">
            <Grid className="restaurant-content-title">Photos</Grid>
            <Grid className="restaurant-about-photo-list-photo">
              <Grid className="photo-content background-image-center-cover"></Grid>
              <Grid className="photo-content background-image-center-cover"></Grid>
              <Grid className="photo-content background-image-center-cover"></Grid>
              <Grid className="see-more-photo">
                <span>See more photos...</span>
              </Grid>
            </Grid>
          </Grid>
          <Grid className="restaurant-content restaurant-about-review mt-4">
            <ReviewContent />
            <Grid className="restaurant-about-review-see-more">
              <span>All Restaurant Reviews</span>
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

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantAbout);
