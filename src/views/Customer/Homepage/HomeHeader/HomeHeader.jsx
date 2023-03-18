import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../../utils";
import * as actions from "../../../../store/actions";
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
import CustomerLogin from "../../Auth/CustomerLogin";

class HomeHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
      provinceSelected: "",
      isOpenCustomerLoginDialog: false,
      isShowLogoutButton: false,
    };
    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.isOpenCustomerLoginDialog !==
      this.props.isOpenCustomerLoginDialog
    ) {
      this.setState({
        isOpenCustomerLoginDialog: this.props.isOpenCustomerLoginDialog,
      });
    }
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  changeLanguage = (language) => {
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

  handleOpenCustomerLoginDialog = () => {
    this.setState({
      isOpenCustomerLoginDialog: true,
    });
  };

  handleCloseCustomerLoginDialog = () => {
    this.setState({
      isOpenCustomerLoginDialog: false,
    });
  };

  handleShowHideLogoutButton = () => {
    this.setState({
      isShowLogoutButton: !this.state.isShowLogoutButton,
    });
  };

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      this.setState({
        isShowLogoutButton: false,
      });
    }
  }

  render() {
    const {
      language,
      isShowBanner,
      isShowHeaderSearch,
      customerInfo,
      customerLogout,
    } = this.props;
    const {
      keyword,
      provinceSelected,
      isOpenCustomerLoginDialog,
      isShowLogoutButton,
    } = this.state;

    return (
      <>
        <Grid className="home-header-container">
          <Grid className="home-header-left">
            <Grid
              className="logo-icon background-image-center-cover"
              onClick={() => {
                this.handleBackToHomepage();
              }}
            ></Grid>
            {isShowHeaderSearch && (
              <Grid className="home-header-search">
                <input
                  className="left-input"
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
                <select
                  className="center-select"
                  // label={provinceSelected ? "" : "Tỉnh thành"}
                  // InputLabelProps={{ shrink: false }}
                  name="provinceSelected"
                  value={provinceSelected}
                  variant="outlined"
                  // size="small"
                  onChange={(event) => {
                    this.handleChangeInput(event);
                  }}
                >
                  <option key={1} value={1}>
                    1
                  </option>
                  <option key={2} value={2}>
                    2
                  </option>
                  <option key={3} value={3}>
                    3
                  </option>
                </select>
                <button className="right-button">Tìm</button>
              </Grid>
            )}
          </Grid>
          <Grid className="home-header-right">
            {!customerInfo ? (
              <Grid ref={this.wrapperRef} className="right-login">
                <Button
                  className="btn-login"
                  variant="outlined"
                  onClick={() => {
                    this.handleOpenCustomerLoginDialog();
                  }}
                >
                  Login or Signup
                </Button>
              </Grid>
            ) : (
              <Grid
                ref={this.wrapperRef}
                className="customer-welcome"
                onClick={() => {
                  this.handleShowHideLogoutButton();
                }}
              >
                <Grid
                  className="customer-avatar background-image-center-cover"
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
                <Grid className="customer-name">{customerInfo.firstName}</Grid>
                {isShowLogoutButton && (
                  <Grid className="customer-logout" onClick={customerLogout}>
                    <span>Log out</span> <i className="fas fa-sign-out-alt"></i>
                  </Grid>
                )}
              </Grid>
            )}
            <Grid className="right-language">
              <span
                className={
                  language === LANGUAGES.VI
                    ? "language-vi language-active"
                    : "language-vi"
                }
                onClick={() => {
                  this.changeLanguage(LANGUAGES.VI);
                }}
              >
                VI
              </span>
              <span
                className={
                  language === LANGUAGES.EN
                    ? "language-en language-active"
                    : "language-en"
                }
                onClick={() => {
                  this.changeLanguage(LANGUAGES.EN);
                }}
              >
                EN
              </span>
            </Grid>
          </Grid>
        </Grid>
        {isOpenCustomerLoginDialog && (
          <CustomerLogin
            isOpen={isOpenCustomerLoginDialog}
            handleCloseDialog={this.handleCloseCustomerLoginDialog}
          />
        )}
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
    customerInfo: state.user.customerInfo,
    isOpenCustomerLoginDialog: state.user.isOpenCustomerLoginDialog,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) =>
      dispatch(actions.changeLanguageApp(language)),
    customerLogout: () => dispatch(actions.customerLogout()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
