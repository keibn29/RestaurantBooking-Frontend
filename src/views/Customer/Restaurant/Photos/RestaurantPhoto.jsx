import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import { OBJECT, isExistArrayAndNotEmpty } from "../../../../utils";
import { Grid } from "@material-ui/core";
import "./RestaurantPhoto.scss";
import { FormattedMessage } from "react-intl";

class RestaurantPhoto extends Component {
  componentDidMount() {
    this.props.getAllPhotoByRestaurant(
      OBJECT.RESTAURANT,
      this.props.restaurantId
    );
  }

  render() {
    const { listPhoto } = this.props;

    return (
      <>
        <Grid className="restaurant-photo-container">
          <Grid className="restaurant-content-title">
            <FormattedMessage id="customer.restaurant.photos.photo" /> (
            {listPhoto.length})
          </Grid>
          <Grid className="restaurant-photo-description mt-3 text-justify">
            <FormattedMessage id="customer.restaurant.photos.photo-description" />
          </Grid>
          {isExistArrayAndNotEmpty(listPhoto) ? (
            <Grid className="list-photo">
              {listPhoto.map((item) => {
                return (
                  <Grid
                    key={item.id}
                    className="photo-content w-100 background-image-center-cover"
                    style={{
                      backgroundImage: `url(${
                        process.env.REACT_APP_BACKEND_URL + item.link
                      })`,
                    }}
                  ></Grid>
                );
              })}
            </Grid>
          ) : (
            <Grid className="list-content-empty-text">
              <FormattedMessage id="customer.restaurant.about.photo-empty-text" />
            </Grid>
          )}
        </Grid>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    listPhoto: state.allCode.listPhoto,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllPhotoByRestaurant: (objectId, restaurantId) =>
      dispatch(actions.getAllPhotoByObject(objectId, restaurantId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantPhoto);
