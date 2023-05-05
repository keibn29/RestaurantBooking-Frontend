import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import {
  LANGUAGES,
  OBJECT,
  PAGE,
  isExistArrayAndNotEmpty,
} from "../../../../utils";
import { Grid, Button, Dialog } from "@material-ui/core";
import "./DetailDish.scss";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { FormattedMessage } from "react-intl";

class DetailDish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listPhotoPreviewURL: [],
      photoIndex: 0,
      isOpenPhotosLightbox: false,
    };
  }

  componentDidMount() {
    this.props.getAllPhotoByDish(OBJECT.DISH, this.props.dishData.id);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listPhoto !== this.props.listPhoto) {
      this.getListPhotoPreviewURL();
    }
  }

  getListPhotoPreviewURL = () => {
    const { listPhoto } = this.props;
    let listPhotoPreviewURL = [];
    if (isExistArrayAndNotEmpty(listPhoto)) {
      listPhoto.map((item) => {
        let photoPreviewURLItem = process.env.REACT_APP_BACKEND_URL + item.link;
        listPhotoPreviewURL.push(photoPreviewURLItem);
        return listPhotoPreviewURL;
      });
    }
    this.setState({
      listPhotoPreviewURL: listPhotoPreviewURL,
    });
  };

  handleShowHidePhotosLightbox = (action) => {
    const { listPhotoPreviewURL } = this.state;
    if (action === "open" && listPhotoPreviewURL.length === 0) {
      return;
    }
    this.setState({
      isOpenPhotosLightbox: !this.state.isOpenPhotosLightbox,
    });
  };

  handleOrderDish = (dish) => {
    this.props.orderDish(dish);
    this.props.handleCloseDialog();

    if (this.props.page === PAGE.HOMEPAGE) {
      this.props.openRestaurantPage();
    }
  };

  render() {
    const { language, isOpen, handleCloseDialog, dishIndex, dishData } =
      this.props;
    const { listPhotoPreviewURL, photoIndex, isOpenPhotosLightbox } =
      this.state;

    return (
      <>
        <Dialog
          open={isOpen}
          maxWidth="md"
          fullWidth={true}
          onClose={handleCloseDialog}
        >
          <Grid
            container
            direction={dishIndex && dishIndex % 2 ? "row-reverse" : "row"}
            className="detail-dish-container"
          >
            <Grid item xs={5} className="detail-dish-left">
              <Grid className="detail-dish-left-top">
                <Grid className="dish-name">
                  {language === LANGUAGES.VI
                    ? dishData?.nameVi
                    : dishData?.nameEn}
                </Grid>
                <Grid className="dish-price">
                  <FormattedMessage id="customer.restaurant.menu.price" />{" "}
                  {language === LANGUAGES.VI ? (
                    <>
                      {Number(dishData.priceVi).toLocaleString()}
                      <sup>đ</sup>
                    </>
                  ) : (
                    <>
                      <span>&#36;</span>
                      {Number(dishData.priceEn).toLocaleString()}
                    </>
                  )}
                </Grid>
                <Grid className="dish-country">
                  {language === LANGUAGES.VI
                    ? dishData?.countryData?.valueVi
                    : dishData?.countryData?.valueEn}
                </Grid>
                <Grid
                  className="dish-description"
                  dangerouslySetInnerHTML={
                    language === LANGUAGES.VI
                      ? {
                          __html: dishData?.descriptionVi,
                        }
                      : {
                          __html: dishData?.descriptionEn,
                        }
                  }
                ></Grid>
                <Grid className="dish-list-photo">
                  {isExistArrayAndNotEmpty(listPhotoPreviewURL) ? (
                    listPhotoPreviewURL.slice(0, 2).map((item) => {
                      return (
                        <Grid
                          className="dish-photo-content background-image-center-cover"
                          style={{
                            backgroundImage: `url(${item})`,
                          }}
                        ></Grid>
                      );
                    })
                  ) : (
                    <>
                      <Grid className="dish-photo-content background-image-center-cover"></Grid>
                      <Grid className="dish-photo-content background-image-center-cover"></Grid>
                    </>
                  )}
                  {listPhotoPreviewURL.length > 2 && (
                    <Grid
                      className="dish-photo-content see-more-dish-photo"
                      onClick={() => {
                        this.handleShowHidePhotosLightbox("open");
                      }}
                    >
                      <span className="dish-photo-number">
                        +{listPhotoPreviewURL.length - 2}
                      </span>
                      <span className="dish-photo-text">
                        <FormattedMessage id="customer.restaurant.about.see-more-photo" />
                      </span>
                    </Grid>
                  )}
                </Grid>
              </Grid>
              <Grid className="detail-dish-left-bottom">
                <Button
                  className="btn-back"
                  variant="outlined"
                  onClick={() => {
                    handleCloseDialog();
                  }}
                >
                  <FormattedMessage id="customer.restaurant.menu.back" />
                </Button>
                <Button
                  className="btn-order"
                  variant="outlined"
                  onClick={() => {
                    this.handleOrderDish(dishData);
                  }}
                >
                  <FormattedMessage id="customer.restaurant.menu.order" />
                </Button>
              </Grid>
            </Grid>
            <Grid
              item
              xs={7}
              className="detail-dish-right background-image-center-cover"
              style={{
                backgroundImage: `url(${
                  process.env.REACT_APP_BACKEND_URL + dishData.avatar
                })`,
              }}
            ></Grid>
          </Grid>
        </Dialog>
        {isOpenPhotosLightbox && (
          <Lightbox
            mainSrc={listPhotoPreviewURL[photoIndex]}
            nextSrc={
              listPhotoPreviewURL[(photoIndex + 1) % listPhotoPreviewURL.length]
            }
            prevSrc={
              listPhotoPreviewURL[
                (photoIndex + listPhotoPreviewURL.length - 1) %
                  listPhotoPreviewURL.length
              ]
            }
            onCloseRequest={() => {
              this.handleShowHidePhotosLightbox("close");
            }}
            onMovePrevRequest={() =>
              this.setState({
                photoIndex:
                  (photoIndex + listPhotoPreviewURL.length - 1) %
                  listPhotoPreviewURL.length,
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                photoIndex: (photoIndex + 1) % listPhotoPreviewURL.length,
              })
            }
          />
        )}
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
    getAllPhotoByDish: (objectId, dishId) =>
      dispatch(actions.getAllPhotoByObject(objectId, dishId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDish);
