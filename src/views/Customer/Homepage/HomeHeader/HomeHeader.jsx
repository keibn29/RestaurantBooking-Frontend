import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../../utils";
import { changeLanguageApp } from "../../../../store/actions";
import { withRouter } from "react-router";
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

class HomeHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
      provinceSelected: "",
    };
  }

  changeLanguage = (language) => {
    //fire redux event: actions
    this.props.changeLanguageAppRedux(language);
  };

  handleReturnHomepage = () => {
    if (this.props.history) {
      this.props.history.push(`/home`);
    }
  };

  handleChangeInput = (event) => {
    let copyState = { ...this.state };
    copyState[event.target.name] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleBackToHomepage = () => {
    if (this.props.history) {
      this.props.history.push(`/home`);
    }
  };

  render() {
    let { language, isShowBanner } = this.props;
    let { keyword, provinceSelected } = this.state;

    return (
      <>
        <Grid className="home-header-container">
          <Box
            className="logo-icon background-image-center-cover"
            onClick={() => {
              this.handleBackToHomepage();
            }}
          ></Box>
          <Grid>456</Grid>
        </Grid>
        {isShowBanner && (
          <Grid className="home-banner-container">
            <Grid className="banner-background background-image-center-cover">
              <Container>
                <Grid className="banner-text home-container">
                  <Grid className="banner-text-top">
                    It's time to treat yourself.
                  </Grid>
                  <Grid className="banner-text-bottom">
                    Let's book you a table - the Chope way.
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={2}
                  className="banner-search home-container"
                >
                  <Grid item xs={6} className="banner-search-left">
                    <TextField
                      className="w-100 left-input"
                      type="text"
                      name="keyword"
                      value={keyword}
                      placeholder="Tìm kiếm nhà hàng hoặc món ăn"
                      variant="outlined"
                      // size="small"
                      onChange={(event) => {
                        this.handleChangeInput(event);
                      }}
                    />
                  </Grid>
                  <Grid item xs={4} className="banner-search-center">
                    <TextField
                      select
                      className="w-100 center-select"
                      label={provinceSelected ? "" : "Tỉnh thành"}
                      InputLabelProps={{ shrink: false }}
                      name="provinceSelected"
                      value={provinceSelected}
                      variant="outlined"
                      // size="small"
                      onChange={(event) => {
                        this.handleChangeInput(event);
                      }}
                    >
                      <MenuItem key={1} value={1}>
                        1
                      </MenuItem>
                      <MenuItem key={2} value={2}>
                        2
                      </MenuItem>
                      <MenuItem key={3} value={3}>
                        3
                      </MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={2} className="banner-search-right">
                    <Button className="h-100 right-button" variant="contained">
                      Tìm
                    </Button>
                  </Grid>
                </Grid>
              </Container>
            </Grid>
          </Grid>
        )}
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
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
