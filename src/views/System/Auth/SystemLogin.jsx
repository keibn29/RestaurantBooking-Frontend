import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import "./SystemLogin.scss";
import * as actions from "../../../store/actions";
import { PAGE_LOGIN } from "../../../utils";

class SystemLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isShowPassword: false,
      helperTextError: "",
      isEmailError: false,
      isPasswordError: false,
    };
  }

  handleChangeInput = (event) => {
    let copyState = { ...this.state };
    copyState[event.target.name] = event.target.value;
    this.setState(
      {
        ...copyState,
      },
      () => {
        const { email, password } = this.state;
        if (email) {
          this.setState({
            isEmailError: false,
          });
        }
        if (password) {
          this.setState({
            isPasswordError: false,
          });
        }
      }
    );
  };

  isValidForm = () => {
    const { email, password } = this.state;
    if (!email) {
      this.setState({
        helperTextError: "Vui lòng nhập email",
        isEmailError: true,
        isPasswordError: false,
      });
      return false;
    }
    if (!password) {
      this.setState({
        helperTextError: "Vui lòng nhập mật khẩu",
        isPasswordError: true,
        isEmailError: false,
      });
      return false;
    }

    this.setState({
      helperTextError: "",
      isEmailError: false,
      isPasswordError: false,
    });
    return true;
  };

  handleSystemLogin = () => {
    const isValidForm = this.isValidForm();
    if (!isValidForm) {
      return;
    }

    const { email, password } = this.state;
    let data = {
      email,
      password,
      pageLogin: PAGE_LOGIN.SYSTEM,
    };
    this.props.handleSystemLogin(data);
  };

  handleShowHidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };

  handleKeyDown = (event) => {
    if (event.key === "Enter" || event.keyCode === 13) {
      this.handleSystemLogin();
    }
  };

  render() {
    const {
      email,
      password,
      isShowPassword,
      helperTextError,
      isEmailError,
      isPasswordError,
    } = this.state;

    return (
      <div className="login-background">
        <div
          className={
            helperTextError ? "login-container error" : "login-container"
          }
        >
          <div className="login-content row">
            <div className="col-12 login-text">Đăng nhập hệ thống</div>
            <div className="col-12 form-group login-input">
              <label className="login-input-label">Email</label>
              <input
                type="text"
                name="email"
                className="form-control"
                placeholder="Nhập email của bạn"
                value={email}
                onChange={(event) => {
                  this.handleChangeInput(event);
                }}
              />
              {isEmailError && (
                <span className="helper-text">{helperTextError}</span>
              )}
            </div>
            <div className="col-12 form-group login-input">
              <label className="login-input-label">Mật khẩu</label>
              <div className="custom-input-password">
                <input
                  type={isShowPassword ? "text" : "password"}
                  name="password"
                  className="form-control"
                  placeholder="Nhập mật khẩu của bạn"
                  value={password}
                  onChange={(event) => {
                    this.handleChangeInput(event);
                  }}
                  onKeyDown={(event) => {
                    this.handleKeyDown(event);
                  }}
                />
                <span
                  onClick={() => {
                    this.handleShowHidePassword();
                  }}
                >
                  <i
                    className={
                      isShowPassword ? "far fa-eye" : "far fa-eye-slash"
                    }
                  ></i>
                </span>
                {isPasswordError && (
                  <span className="helper-text">{helperTextError}</span>
                )}
              </div>
            </div>
            <div className="col-12 mt-4">
              <button
                className="btn-login"
                onClick={() => {
                  this.handleSystemLogin();
                }}
              >
                Đăng nhập
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    handleSystemLogin: (data) => dispatch(actions.systemLogin(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SystemLogin);
