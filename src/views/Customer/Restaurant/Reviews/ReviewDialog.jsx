import React, { Component } from "react";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../../utils";
import { Grid, IconButton, Icon, Button, Dialog } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import "./ReviewDialog.scss";
import {
  addNewReview,
  editReviewById,
} from "../../../../services/restaurantService";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";

class ReviewDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      star: "",
      detail: "",
      restaurantId: "",
    };
  }

  componentDidMount() {
    if (this.props.restaurantId) {
      this.setState({
        restaurantId: +this.props.restaurantId,
      });
    }
    this.getReviewDataFromParent();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.restaurantId !== this.props.restaurantId) {
      this.setState({
        restaurantId: +this.props.restaurantId,
      });
    }
  }

  getReviewDataFromParent = () => {
    const { reviewData } = this.props;
    if (!reviewData) {
      return;
    }

    this.setState({
      ...reviewData,
    });
  };

  handleSubmitReview = async () => {
    const { customerInfo, reviewData } = this.props;
    const { star, detail, restaurantId } = this.state;
    let data = {
      customerId: customerInfo.id,
      restaurantId,
      star,
      detail,
    };

    if (!reviewData) {
      this.callApiAddNewReview(data);
    } else {
      this.callApiEditReviewById(reviewData.id, data);
    }
  };

  callApiAddNewReview = async (data) => {
    const res = await addNewReview(data);
    if (res && res.errCode === 0) {
      toast.success("Đánh giá nhà hàng thành công");
      this.props.handleCloseDialog();
    } else {
      toast.error(res.errMessage);
    }
  };

  callApiEditReviewById = async (reviewId, data) => {
    const res = await editReviewById(reviewId, data);
    if (res && res.errCode === 0) {
      toast.success("Chỉnh sửa đánh giá thành công");
      this.props.handleCloseDialog();
    } else {
      toast.error(res.errMessage);
    }
  };

  handleChangeReviewStar = (newStar) => {
    this.setState({
      star: newStar,
    });
  };

  handleChangeInput = (event) => {
    this.setState({
      detail: event.target.value,
    });
  };

  render() {
    const { language, isOpen, handleCloseDialog, reviewData, customerInfo } =
      this.props;
    const { star, detail } = this.state;

    return (
      <>
        <Dialog open={isOpen} maxWidth="xs" fullWidth={true}>
          <Grid className="review-dialog-container">
            <Grid className="review-dialog-header">
              <FormattedMessage id="customer.restaurant.reviews.review-restaurant" />
              <IconButton
                className="btn-close-dialog"
                onClick={() => {
                  handleCloseDialog();
                }}
              >
                <Icon color="error" title="Đóng">
                  close
                </Icon>
              </IconButton>
            </Grid>
            <Grid className="review-dialog-body">
              <Grid className="review-dialog-customer-info">
                <Grid
                  className="customer-info-left background-image-center-cover"
                  style={
                    customerInfo.avatar
                      ? {
                          backgroundImage: `url(${
                            process.env.REACT_APP_BACKEND_URL +
                            customerInfo.avatar
                          })`,
                        }
                      : {}
                  }
                ></Grid>
                <Grid className="customer-info-right">
                  <Grid className="customer-name">
                    {language === LANGUAGES.VI ? (
                      <>
                        {customerInfo.lastName} {customerInfo.firstName}
                      </>
                    ) : (
                      <>
                        {customerInfo.firstName} {customerInfo.lastName}
                      </>
                    )}
                  </Grid>
                  <Grid className="customer-text">
                    <FormattedMessage id="customer.restaurant.reviews.public-review-text" />
                  </Grid>
                </Grid>
              </Grid>
              <Grid className="review-dialog-rating">
                <Rating
                  className="rating"
                  value={star}
                  onChange={(event, newValue) => {
                    this.handleChangeReviewStar(newValue);
                  }}
                />
              </Grid>
              <Grid className="review-dialog-input">
                <textarea
                  className="w-100"
                  value={detail}
                  placeholder={
                    language === LANGUAGES.VI
                      ? "Để lại đánh giá của bạn"
                      : "Leave your review"
                  }
                  onChange={(event) => {
                    this.handleChangeInput(event);
                  }}
                />
              </Grid>
            </Grid>
            <Grid className="review-dialog-footer">
              <Button
                className="btn-save"
                variant="outlined"
                onClick={() => {
                  this.handleSubmitReview();
                }}
              >
                {reviewData ? (
                  <FormattedMessage id="customer.restaurant.reviews.edit-review" />
                ) : (
                  <FormattedMessage id="customer.restaurant.reviews.write-review" />
                )}
              </Button>
              <Button
                className="btn-cancel"
                onClick={() => {
                  handleCloseDialog();
                }}
                variant="outlined"
              >
                <FormattedMessage id="customer.profile.booking-history.cancel" />
              </Button>
            </Grid>
          </Grid>
        </Dialog>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    customerInfo: state.user.customerInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewDialog);
