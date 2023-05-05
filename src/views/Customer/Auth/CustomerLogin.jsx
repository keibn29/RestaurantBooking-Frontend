import React, { Component } from "react";
import { connect } from "react-redux";
import "./CustomerLogin.scss";
import { PAGE_LOGIN, USER_ROLE } from "../../../utils";
import * as actions from "../../../store/actions";
import {
  Grid,
  IconButton,
  Icon,
  Button,
  InputLabel,
  Dialog,
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { addNewUser } from "../../../services/userService";
import { toast } from "react-toastify";
import { forgotPassword } from "../../../services/customerService";
import { FormattedMessage } from "react-intl";

class CustomerLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      repeatPassword: "",
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      isShowPassword: false,
      isCustomerSignup: false,
    };
  }

  componentDidMount() {
    this.handleAddValidationRule();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  componentWillUnmount() {
    ValidatorForm.removeValidationRule("isPhone");
    ValidatorForm.removeValidationRule("isMatchPassword");
  }

  handleAddValidationRule = () => {
    ValidatorForm.addValidationRule("isPhone", (value) => {
      let firstDigitStr = String(value)[0];
      if (value.length !== 10 || Number(firstDigitStr) !== 0) {
        return false;
      }
      return true;
    });
    ValidatorForm.addValidationRule("isMatchPassword", (value) => {
      if (value !== this.state.password) {
        return false;
      }
      return true;
    });
  };

  handleChangeInput = (event) => {
    let copyState = { ...this.state };
    copyState[event.target.name] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleShowHidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };

  handleOpenSignUpForm = () => {
    this.setState({
      isCustomerSignup: true,
    });
    this.handleClearForm();
  };

  handleCloseSignUpForm = () => {
    this.setState({
      isCustomerSignup: false,
    });
    this.handleClearForm();
  };

  handleClearForm = () => {
    this.setState({
      email: "",
      password: "",
      repeatPassword: "",
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
    });
  };

  handleSubmitLogin = () => {
    const { email, password } = this.state;
    let data = {
      email,
      password,
      pageLogin: PAGE_LOGIN.CUSTOMER,
    };
    this.props.handleCustomerLogin(data);
  };

  handleSubmitSignup = async () => {
    const { firstName, lastName, phone, email, password, address } = this.state;
    let data = {
      firstName,
      lastName,
      phone,
      email,
      password,
      address,
      roleId: USER_ROLE.CUSTOMER,
    };

    const res = await addNewUser(data);
    if (res && res.errCode === 0) {
      toast.success("Đăng kí tài khoản thành công");
      this.handleClearForm();
      this.setState({
        isCustomerSignup: false,
      });
    } else {
      toast.error(res.errorMessages);
    }
  };

  handleForgotPassword = async () => {
    const { language } = this.props;
    const { email } = this.state;
    if (!email) {
      toast.error("Bạn cần nhập email trước khi yêu cầu cập nhật mật khẩu mới");
      return;
    }

    const res = await forgotPassword({
      email,
      language,
    });
    if (res && res.errCode === 0) {
      toast.info("Vui lòng kiểm tra email để xác nhận cập nhật mật khẩu");
    } else {
      toast.error(res.errMessage);
    }
  };

  render() {
    const { language, isOpen, handleCloseDialog } = this.props;
    const {
      email,
      password,
      repeatPassword,
      lastName,
      firstName,
      phone,
      address,
      isShowPassword,
      isCustomerSignup,
    } = this.state;

    return (
      <>
        <Dialog open={isOpen} maxWidth="xs" fullWidth={true}>
          <Grid
            className={
              !isCustomerSignup
                ? "customer-login-container login"
                : "customer-login-container signup"
            }
          >
            <Grid>
              <Grid className="customer-login-header">
                {!isCustomerSignup ? (
                  <FormattedMessage id="customer.auth.login" />
                ) : (
                  <FormattedMessage id="customer.auth.signup" />
                )}
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
              <Grid className="customer-login-body">
                {!isCustomerSignup ? (
                  <ValidatorForm ref="form" onSubmit={this.handleSubmitLogin}>
                    <Grid container>
                      <Grid item xs={12} className="email-input-container">
                        <Icon className="user-icon">
                          perm_identity_outlined
                        </Icon>
                        <InputLabel htmlFor="email" className="input-label">
                          Email
                        </InputLabel>
                        <TextValidator
                          className="w-100"
                          label={
                            !email ? (
                              <FormattedMessage id="customer.auth.type-your-email" />
                            ) : (
                              " "
                            )
                          }
                          InputLabelProps={{
                            style: {
                              paddingLeft: "36px",
                              color: "gray",
                            },
                            shrink: false,
                          }}
                          InputProps={{
                            style: {
                              paddingLeft: "36px",
                            },
                          }}
                          onChange={(event) => {
                            this.handleChangeInput(event);
                          }}
                          type="email"
                          name="email"
                          id="email"
                          value={email}
                          validators={["required", "isEmail"]}
                          errorMessages={[
                            "Vui lòng nhập email",
                            "Vui lòng nhập đúng định dạng email",
                          ]}
                          variant="standard"
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12} className="password-input-container">
                        <Icon className="password-icon">lock_outlined</Icon>
                        <Grid
                          className="password-show-hide-icon"
                          onClick={() => {
                            this.handleShowHidePassword();
                          }}
                        >
                          {isShowPassword ? (
                            <i className="far fa-eye"></i>
                          ) : (
                            <i className="far fa-eye-slash"></i>
                          )}
                        </Grid>
                        <InputLabel htmlFor="password" className="input-label">
                          <FormattedMessage id="customer.auth.password" />
                        </InputLabel>
                        <TextValidator
                          className="w-100"
                          label={
                            !password ? (
                              <FormattedMessage id="customer.auth.type-your-password" />
                            ) : (
                              " "
                            )
                          }
                          InputLabelProps={{
                            style: {
                              paddingLeft: "36px",
                              color: "gray",
                            },
                            shrink: false,
                          }}
                          InputProps={{
                            style: {
                              paddingLeft: "36px",
                            },
                          }}
                          onChange={(event) => {
                            this.handleChangeInput(event);
                          }}
                          id="password"
                          type={isShowPassword ? "text" : "password"}
                          name="password"
                          value={password}
                          validators={["required"]}
                          errorMessages={["Vui lòng nhập mật khẩu"]}
                          variant="standard"
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12} className="forgot-password">
                        <span
                          onClick={() => {
                            this.handleForgotPassword();
                          }}
                        >
                          <FormattedMessage id="customer.auth.forgot-password" />
                        </span>
                      </Grid>
                      <Grid item xs={12} className="submit-button">
                        <Button className="w-100 btn-submit-form" type="submit">
                          <FormattedMessage id="customer.auth.login" />
                        </Button>
                      </Grid>
                      <Grid item xs={12} className="social-login">
                        <Grid className="social-login-text">
                          <FormattedMessage id="customer.auth.or-login-with" />
                        </Grid>
                        <Grid className="social-login-icon">
                          <i className="fab fa-google google"></i>
                          <i className="fab fa-facebook-f facebook"></i>
                        </Grid>
                      </Grid>
                    </Grid>
                  </ValidatorForm>
                ) : (
                  <ValidatorForm ref="form" onSubmit={this.handleSubmitSignup}>
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <TextValidator
                          className="w-100"
                          label={
                            <span>
                              <span className="red-color"> * </span>
                              <FormattedMessage id="customer.auth.last-name" />
                            </span>
                          }
                          onChange={(event) => {
                            this.handleChangeInput(event);
                          }}
                          type="text"
                          name="lastName"
                          value={lastName}
                          validators={["required"]}
                          errorMessages={["Vui lòng nhập họ"]}
                          variant="standard"
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextValidator
                          className="w-100"
                          label={
                            <span>
                              <span className="red-color"> * </span>
                              <FormattedMessage id="customer.auth.first-name" />
                            </span>
                          }
                          onChange={(event) => {
                            this.handleChangeInput(event);
                          }}
                          type="text"
                          name="firstName"
                          value={firstName}
                          validators={["required"]}
                          errorMessages={["Vui lòng nhập tên"]}
                          variant="standard"
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextValidator
                          className="w-100"
                          label={
                            <span>
                              <span className="red-color"> * </span>
                              <FormattedMessage id="customer.auth.phone" />
                            </span>
                          }
                          onChange={(event) => {
                            this.handleChangeInput(event);
                          }}
                          type="number"
                          name="phone"
                          value={phone}
                          validators={["required", "isPhone"]}
                          errorMessages={[
                            "Vui lòng nhập số điện thoại",
                            "Vui lòng nhập số điện thoại hợp lệ",
                          ]}
                          variant="standard"
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextValidator
                          className="w-100"
                          label={
                            <span>
                              <span className="red-color"> * </span>
                              Email
                            </span>
                          }
                          onChange={(event) => {
                            this.handleChangeInput(event);
                          }}
                          type="email"
                          name="email"
                          value={email}
                          validators={["required", "isEmail"]}
                          errorMessages={[
                            "Vui lòng nhập email",
                            "Vui lòng nhập đúng định dạng email",
                          ]}
                          variant="standard"
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextValidator
                          className="w-100"
                          label={
                            <span>
                              <span className="red-color"> * </span>
                              <FormattedMessage id="customer.auth.password" />
                            </span>
                          }
                          onChange={(event) => {
                            this.handleChangeInput(event);
                          }}
                          type="password"
                          name="password"
                          value={password}
                          validators={["required"]}
                          errorMessages={["Vui lòng nhập mật khẩu"]}
                          variant="standard"
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextValidator
                          className="w-100"
                          label={
                            <span>
                              <span className="red-color"> * </span>
                              <FormattedMessage id="customer.auth.repeat-password" />
                            </span>
                          }
                          onChange={(event) => {
                            this.handleChangeInput(event);
                          }}
                          type="password"
                          name="repeatPassword"
                          value={repeatPassword}
                          validators={["required", "isMatchPassword"]}
                          errorMessages={[
                            "Vui lòng nhập lại mật khẩu",
                            "Mật khẩu không trùng khớp",
                          ]}
                          variant="standard"
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextValidator
                          className="w-100"
                          label={
                            <span>
                              <span className="red-color"> * </span>
                              <FormattedMessage id="customer.auth.address" />
                            </span>
                          }
                          onChange={(event) => {
                            this.handleChangeInput(event);
                          }}
                          type="text"
                          name="address"
                          value={address}
                          validators={["required"]}
                          errorMessages={["Vui lòng nhập địa chỉ"]}
                          variant="standard"
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12} className="note">
                        (<span className="red-color">*</span>){" "}
                        <FormattedMessage id="customer.auth.required-information-note" />
                      </Grid>
                      <Grid item xs={12} className="submit-button">
                        <Button className="w-100 btn-submit-form" type="submit">
                          <FormattedMessage id="customer.auth.signup" />
                        </Button>
                      </Grid>
                    </Grid>
                  </ValidatorForm>
                )}
              </Grid>
            </Grid>
            <Grid className="customer-login-footer">
              {!isCustomerSignup ? (
                <>
                  <FormattedMessage id="customer.auth.not-have-account" />{" "}
                  <span
                    onClick={() => {
                      this.handleOpenSignUpForm();
                    }}
                  >
                    <FormattedMessage id="customer.auth.signup-now" />
                  </span>
                </>
              ) : (
                <>
                  <FormattedMessage id="customer.auth.have-account" />{" "}
                  <span
                    onClick={() => {
                      this.handleCloseSignUpForm();
                    }}
                  >
                    <FormattedMessage id="customer.auth.login-now" />
                  </span>
                </>
              )}
            </Grid>
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
  return {
    handleCustomerLogin: (data) => dispatch(actions.customerLogin(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerLogin);
