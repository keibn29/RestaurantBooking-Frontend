import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { withRouter } from "react-router";
import Navigator from "../../../components/Navigator";
import { adminMenu, restaurantManagerMenu } from "./menuApp";
import "./Header.scss";
import { LANGUAGES, PATH, USER_ROLE } from "../../../utils";
import { FormattedMessage } from "react-intl";
import _ from "lodash";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuApp: [],
    };
  }

  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };

  componentDidMount() {
    const { userInfo } = this.props;
    let menu = [];
    if (userInfo && !_.isEmpty(userInfo)) {
      if (userInfo.roleId === USER_ROLE.ADMIN) {
        menu = adminMenu;
      } else {
        menu = restaurantManagerMenu;
      }
    }
    this.setState({
      menuApp: menu,
    });
  }

  handleLogoutSystem = () => {
    this.props.history?.replace(PATH.SYSTEM_LOGIN);
    this.props.systemLogout();
  };

  render() {
    const { language, userInfo } = this.props;

    return (
      <div className="header-container">
        <div className="header-tabs-container">
          <Navigator menus={this.state.menuApp} />
        </div>
        <div className="languages">
          <span className="welcome">
            <FormattedMessage id="system.header.welcome" />,{" "}
            {userInfo && userInfo.firstName ? userInfo.firstName : ""}
          </span>
          <span
            className={
              language === LANGUAGES.VI ? "language-vi active" : "language-vi"
            }
            onClick={() => {
              this.changeLanguage(LANGUAGES.VI);
            }}
          >
            VI
          </span>
          <span
            className={
              language === LANGUAGES.EN ? "language-en active" : "language-en"
            }
            onClick={() => {
              this.changeLanguage(LANGUAGES.EN);
            }}
          >
            EN
          </span>
          <div
            className="btn btn-logout"
            title="Logout"
            onClick={this.handleLogoutSystem}
          >
            <i className="fas fa-sign-out-alt"></i>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedInSystem: state.user.isLoggedInSystem,
    userInfo: state.user.userInfo,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    systemLogout: () => dispatch(actions.systemLogout()),
    changeLanguageAppRedux: (language) =>
      dispatch(actions.changeLanguageApp(language)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
