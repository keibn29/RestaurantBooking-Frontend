import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import { LANGUAGE, LANGUAGES } from "../../../../utils";
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
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import "./ReviewDialog.scss";

class ReviewDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      star: 0,
      review: "",
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {}

  handleChangeReviewStar = (newStar) => {
    this.setState({
      star: newStar,
    });
  };

  handleChangeInput = (event) => {
    this.setState({
      review: event.target.value,
    });
  };

  render() {
    const { language, isOpen, handleCloseDialog } = this.props;
    const { star, review } = this.state;

    return (
      <>
        <Dialog open={isOpen} maxWidth="xs" fullWidth={true}>
          <Grid className="review-dialog-container">
            <Grid className="review-dialog-header">
              Review Restaurant
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
                <Grid className="customer-info-left background-image-center-cover"></Grid>
                <Grid className="customer-info-right">
                  <Grid className="customer-name">Đinh Đức Huy</Grid>
                  <Grid className="customer-text">
                    Bài đánh giá sẽ được công khai cho tất cả mọi người
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
                  value={review}
                  placeholder="Để lại đánh giá của bạn"
                  onChange={(event) => {
                    this.handleChangeInput(event);
                  }}
                />
              </Grid>
            </Grid>
            <Grid className="review-dialog-footer">
              <Button className="btn-save" variant="outlined">
                Lưu đánh giá
              </Button>
              <Button
                className="btn-cancel"
                onClick={() => {
                  handleCloseDialog();
                }}
                variant="outlined"
              >
                Hủy
              </Button>
            </Grid>
          </Grid>
        </Dialog>
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

export default connect(mapStateToProps, mapDispatchToProps)(ReviewDialog);
