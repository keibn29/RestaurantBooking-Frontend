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
import "./DetailFood.scss";

class DetailFood extends Component {
  render() {
    const { language, isOpen, handleCloseDialog } = this.props;

    return (
      <>
        <Dialog
          open={isOpen}
          maxWidth="md"
          fullWidth={true}
          onClose={handleCloseDialog}
        >
          <Grid container className="detail-food-container">
            <Grid item xs={5} className="detail-food-left">
              <Grid className="detail-food-left-top">
                <Grid className="food-name">Món ăn số 1</Grid>
                <Grid className="food-country">Nhật Bản</Grid>
                <Grid className="food-description">
                  Một trong những món ăn truyền thống Việt Nam nổi tiếng trên
                  toàn thế giới đó là phở. Thành phần của phở gồm bánh phở được
                  làm từ gạo, nước dùng đậm đà vị ngọt của xương ninh nhừ và gia
                  vị, bên trên tô phở là thịt bò hoặc gà thái mỏng cùng các loại
                  rau thơm, gia vị.
                </Grid>
                <Grid className="food-list-photo">
                  <Grid className="food-photo-content background-image-center-cover"></Grid>
                  <Grid className="food-photo-content background-image-center-cover"></Grid>
                  <Grid className="food-photo-content see-more-food-photo">
                    <span className="food-photo-number">+5</span>
                    <span className="food-photo-text">See more photos</span>
                  </Grid>
                </Grid>
              </Grid>
              <Grid className="detail-food-left-bottom">
                <Button
                  className="btn-back"
                  variant="outlined"
                  onClick={() => {
                    handleCloseDialog();
                  }}
                >
                  Quay lại
                </Button>
                <Button className="btn-order" variant="outlined">
                  Đặt món
                </Button>
              </Grid>
            </Grid>
            <Grid
              item
              xs={7}
              className="detail-food-right background-image-center-cover"
            ></Grid>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailFood);
