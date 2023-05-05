import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { FormattedMessage } from "react-intl";
import {
  ALLCODES,
  customReactSelectStyleBanner,
  customReactSelectStyleHeader,
  LANGUAGES,
  PATH,
  NAV_CUSTOMER_PROFILE,
  buildProvinceReactSelect,
} from "../../../../utils";
import * as actions from "../../../../store/actions";
import { withRouter } from "react-router";
import { Grid, Icon, Button, Container } from "@material-ui/core";
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
    this.getKeywordInSearchPageHeader();
    this.getProvinceSelectedInSearchPageHeader();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.isOpenCustomerLoginDialog !==
      this.props.isOpenCustomerLoginDialog
    ) {
      this.setState({
        isOpenCustomerLoginDialog: false,
      });
    }

    if (prevProps.listProvince !== this.props.listProvince) {
      this.getListProvinceForReactSelect();
    }

    if (prevProps.language !== this.props.language) {
      this.getListProvinceForReactSelect();
    }

    if (prevState.listProvince !== this.state.listProvince) {
      const { listProvince, provinceSelected } = this.state;
      let newProvinceSelected = listProvince.find(
        (item) => item.value === provinceSelected.value
      );
      this.setState({
        provinceSelected: newProvinceSelected,
      });
    }

    if (
      !prevState.provinceSelected &&
      prevProps.listProvince !== this.props.listProvince
    ) {
      let dataSelect = buildProvinceReactSelect(
        this.props.listProvince,
        this.props.language
      );
      this.setState({
        provinceSelected: dataSelect[0],
      });
    }
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  getListProvinceForReactSelect = () => {
    let dataSelect = buildProvinceReactSelect(
      this.props.listProvince,
      this.props.language
    );
    this.setState({
      listProvince: dataSelect,
    });
  };

  getKeywordInSearchPageHeader = () => {
    if (
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.keyword
    ) {
      this.setState({
        keyword: this.props.location.state.keyword.trim(),
      });
    }
  };

  getProvinceSelectedInSearchPageHeader = () => {
    if (
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.province
    ) {
      this.setState({
        provinceSelected: this.props.location.state.province,
      });
    }
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

  handleClearKeyword = () => {
    this.setState({
      keyword: "",
    });
  };

  handleBackToHomepage = async () => {
    if (this.props.history) {
      await this.props.history.push(PATH.HOMEPAGE);
      document.getElementById("homepage-top").scrollIntoView({
        block: "end",
      });
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

  handleOpenCustomerProfile = async (navSelected) => {
    if (this.props.history) {
      await this.props.history.push({
        pathname: PATH.BOOKING_HISTORY,
        hash: navSelected,
      });
      document.getElementById("customer-profile-top").scrollIntoView();
    }
  };

  handleCustomerLogout = () => {
    this.props.customerLogout();
    this.handleBackToHomepage();
  };

  handleOpenSearchpage = async () => {
    const { keyword, provinceSelected } = this.state;
    if (this.props.history) {
      await this.props.history.push({
        pathname: PATH.SEARCHPAGE,
        state: {
          keyword,
          province: provinceSelected,
        },
      });
      document.getElementById("searchpage-top").scrollIntoView({
        block: "end",
      });
    }
  };

  handleKeyDown = (event) => {
    if (event.key === "Enter" || event.keyCode === 13) {
      this.handleOpenSearchpage();
    }
  };

  render() {
    const { language, isShowBanner, isShowHeaderSearch, customerInfo } =
      this.props;
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
                <Grid className="w-50 left-input-container">
                  <input
                    spellCheck="false"
                    className="w-100 left-input"
                    type="text"
                    name="keyword"
                    value={keyword}
                    placeholder={
                      language === LANGUAGES.VI
                        ? "Tìm kiếm nhà hàng, món ăn hoặc cẩm nang"
                        : "Search restaurants, dishes or handbooks"
                    }
                    variant="outlined"
                    onChange={(event) => {
                      this.handleChangeInput(event);
                    }}
                    onKeyDown={(event) => {
                      this.handleKeyDown(event);
                    }}
                  />
                  {keyword && (
                    <Icon
                      className="icon-clear-input"
                      onClick={() => {
                        this.handleClearKeyword();
                      }}
                    >
                      clear
                    </Icon>
                  )}
                </Grid>
                <Select
                  className="react-select center-select"
                  value={provinceSelected}
                  onChange={this.handleChangeProvinceSelected}
                  options={listProvince}
                  placeholder={
                    language === LANGUAGES.VI ? "Tỉnh thành" : "Province"
                  }
                  styles={customReactSelectStyleHeader}
                />
                <Button
                  className="right-button"
                  onClick={() => {
                    this.handleOpenSearchpage();
                  }}
                >
                  <FormattedMessage id="customer.homepage.home-header.find" />
                </Button>
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
                  <FormattedMessage id="customer.homepage.home-header.login-or-signup" />
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
                      <FormattedMessage id="customer.homepage.home-header.booking-history" />
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
                      <FormattedMessage id="customer.homepage.home-header.account-information" />
                    </Grid>
                    <Grid
                      className="profile-action-content logout"
                      onClick={() => {
                        this.handleCustomerLogout();
                      }}
                      container
                      justify="space-between"
                      alignItems="center"
                    >
                      <span>
                        <FormattedMessage id="customer.homepage.home-header.logout" />
                      </span>
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
                  <Grid className="banner-text-top" id="homepage-top">
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
                      spellCheck="false"
                      className="w-100 left-input"
                      type="text"
                      name="keyword"
                      value={keyword}
                      placeholder={
                        language === LANGUAGES.VI
                          ? "Tìm kiếm nhà hàng, món ăn hoặc cẩm nang"
                          : "Search restaurants, dishes or handbooks"
                      }
                      onChange={(event) => {
                        this.handleChangeInput(event);
                      }}
                      onKeyDown={(event) => {
                        this.handleKeyDown(event);
                      }}
                    />
                    {keyword && (
                      <Icon
                        className="icon-clear-input-banner"
                        onClick={() => {
                          this.handleClearKeyword();
                        }}
                      >
                        clear
                      </Icon>
                    )}
                  </Grid>
                  <Grid item xs={4} className="banner-search-center">
                    <Select
                      className="react-select center-select"
                      value={provinceSelected}
                      onChange={this.handleChangeProvinceSelected}
                      options={listProvince}
                      placeholder={
                        language === LANGUAGES.VI ? "Tỉnh thành" : "Province"
                      }
                      styles={customReactSelectStyleBanner}
                    />
                  </Grid>
                  <Grid item xs={2} className="banner-search-right">
                    <Button
                      className="h-100 right-button"
                      onClick={() => {
                        this.handleOpenSearchpage();
                      }}
                    >
                      <FormattedMessage id="customer.homepage.home-header.find" />
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
