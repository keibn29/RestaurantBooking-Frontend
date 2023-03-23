import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { FormattedMessage } from "react-intl";
import {
  ALLCODES,
  customReactSelectStyleBanner,
  customReactSelectStyleHeader,
  isExistArrayAndNotEmpty,
  LANGUAGES,
  PATH,
  NAV_CUSTOMER_PROFILE,
} from "../../../../utils";
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
import Select from "react-select";
import CustomerLogin from "../../Auth/CustomerLogin";

class HomeHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
      listProvince: [],
      provinceSelected: "",
      isOpenCustomerLoginDialog: false,
      isShowProfileAction: false,
    };
    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
    this.props.getAllProvince(ALLCODES.PROVINCE);
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
    if (prevProps.listProvince !== this.props.listProvince) {
      let dataSelect = this.buildDataInputSelect(this.props.listProvince);
      this.setState({
        listProvince: dataSelect,
      });
    }
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  buildDataInputSelect = (listProvince) => {
    const { language, userInfo } = this.props;
    let result = [];

    if (isExistArrayAndNotEmpty(listProvince)) {
      listProvince.map((item, index) => {
        let restaurant = {};

        restaurant.label =
          language === LANGUAGES.VI ? item.valueVi : item.valueEn;
        restaurant.value = item.keyMap;

        result.push(restaurant);
        return result;
      });
    }

    return result;
  };

  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };

  handleChangeProvinceSelected = (provinceSelected) => {
    this.setState({
      provinceSelected: provinceSelected,
    });
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
      isShowProfileAction: !this.state.isShowProfileAction,
    });
  };

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      this.setState({
        isShowProfileAction: false,
      });
    }
  }

  handleOpenCustomerProfile = (navSelected) => {
    if (this.props.history) {
      this.props.history.push({
        pathname: PATH.BOOKING_HISTORY,
        state: navSelected,
      });
    }
  };

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
      listProvince,
      isOpenCustomerLoginDialog,
      isShowProfileAction,
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
                  onChange={(event) => {
                    this.handleChangeInput(event);
                  }}
                />
                <Select
                  className="react-select center-select"
                  value={provinceSelected}
                  onChange={this.handleChangeProvinceSelected}
                  options={listProvince}
                  placeholder="Tỉnh thành"
                  styles={customReactSelectStyleHeader}
                />
                <Button className="right-button">Tìm</Button>
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
                {isShowProfileAction && (
                  <Grid className="profile-action">
                    <Grid
                      className="profile-action-content"
                      container
                      alignItems="center"
                      onClick={() => {
                        this.handleOpenCustomerProfile(
                          NAV_CUSTOMER_PROFILE.RESERVATION
                        );
                      }}
                    >
                      Lịch sử đặt bàn
                    </Grid>
                    <Grid
                      className="profile-action-content"
                      container
                      alignItems="center"
                      onClick={() => {
                        this.handleOpenCustomerProfile(
                          NAV_CUSTOMER_PROFILE.ACCOUNT
                        );
                      }}
                    >
                      Thông tin tài khoản
                    </Grid>
                    <Grid
                      className="profile-action-content logout"
                      onClick={customerLogout}
                      container
                      justify="space-between"
                      alignItems="center"
                    >
                      <span>Log out</span>
                      <i className="fas fa-sign-out-alt"></i>
                    </Grid>
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
                    <input
                      className="w-100 left-input"
                      type="text"
                      name="keyword"
                      value={keyword}
                      placeholder="Tìm kiếm nhà hàng hoặc món ăn"
                      onChange={(event) => {
                        this.handleChangeInput(event);
                      }}
                    />
                  </Grid>
                  <Grid item xs={4} className="banner-search-center">
                    <Select
                      className="react-select center-select"
                      value={provinceSelected}
                      onChange={this.handleChangeProvinceSelected}
                      options={listProvince}
                      placeholder="Tỉnh thành"
                      styles={customReactSelectStyleBanner}
                    />
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
    listProvince: state.allCode.listProvince,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) =>
      dispatch(actions.changeLanguageApp(language)),
    customerLogout: () => dispatch(actions.customerLogout()),
    getAllProvince: (code) => dispatch(actions.getAllProvince(code)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
