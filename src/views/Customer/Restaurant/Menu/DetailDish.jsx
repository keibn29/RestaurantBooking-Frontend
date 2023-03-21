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
import "./DetailDish.scss";
import _ from "lodash";

class DetailDish extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    const { language, isOpen, handleCloseDialog, dishIndex, dishData } =
      this.props;

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
            direction={dishIndex % 2 ? "row-reverse" : "row"}
            className="detail-dish-container"
          >
            <Grid item xs={5} className="detail-dish-left">
              <Grid className="detail-dish-left-top">
                <Grid className="dish-name">
                  {!_.isEmpty(dishData) && (
                    <>
                      {language === LANGUAGES.VI
                        ? dishData.nameVi
                        : dishData.nameEn}
                    </>
                  )}
                </Grid>
                <Grid className="dish-country">
                  {!_.isEmpty(dishData) && (
                    <>
                      {language === LANGUAGES.VI
                        ? dishData.countryData.valueVi
                        : dishData.countryData.valueEn}
                    </>
                  )}
                </Grid>
                <Grid className="dish-description">
                  {!_.isEmpty(dishData) && (
                    <>
                      {language === LANGUAGES.VI
                        ? dishData.descriptionVi
                        : dishData.descriptionVi}
                    </>
                  )}
                </Grid>
                <Grid className="dish-list-photo">
                  <Grid className="dish-photo-content background-image-center-cover"></Grid>
                  <Grid className="dish-photo-content background-image-center-cover"></Grid>
                  <Grid className="dish-photo-content see-more-dish-photo">
                    <span className="dish-photo-number">+5</span>
                    <span className="dish-photo-text">See more photos</span>
                  </Grid>
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
              className="detail-dish-right background-image-center-cover"
              style={{
                backgroundImage: `url(${dishData.avatar})`,
              }}
            ></Grid>
          </Grid>
        </Dialog>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDish);
