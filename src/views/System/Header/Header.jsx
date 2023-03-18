import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import Navigator from "../../../components/Navigator";
import { adminMenu } from "./menuApp";
import "./Header.scss";
import { LANGUAGES, USER_ROLE } from "../../../utils";
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
    //fire redux event: actions
    this.props.changeLanguageAppRedux(language);
  };

  //Tạo menu phân quyền người dùng
  componentDidMount() {
    const { userInfo } = this.props;
    let menu = [];
    if (userInfo && !_.isEmpty(userInfo)) {
      // !_.Empty(A): A không rỗng <lodash>
      let role = userInfo.roleId;
      if (role === USER_ROLE.ADMIN) {
        menu = adminMenu;
      } else if (role === USER_ROLE.RESTAURANT_MANAGER) {
        menu = "";
      }
    }
    this.setState({
      menuApp: menu,
    });
  }

  render() {
    const { systemLogout, language, userInfo } = this.props;

    return (
      <div className="header-container">
        {/* thanh navigator */}
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
          {/* nút logout */}
          <div className="btn btn-logout" title="Logout" onClick={systemLogout}>
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
