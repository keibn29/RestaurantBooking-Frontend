import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../Homepage/HomeHeader/HomeHeader";
// import HomeFooter from "./HomeFooter";
import "./CustomerLogin.scss";
import { NAV_DETAIL_RESTAURANT, PAGE_LOGIN, USER_ROLE } from "../../../utils";
import * as actions from "../../../store/actions";
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
import {
  ValidatorForm,
  TextValidator,
  SelectValidator,
} from "react-material-ui-form-validator";
import { addNewUser } from "../../../services/userService";
import { toast } from "react-toastify";

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
                {!isCustomerSignup ? "Login" : "Sign Up"}
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
                          label={!email ? "Type your email" : " "}
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
                        <InputLabel htmlFor="email" className="input-label">
                          Password
                        </InputLabel>
                        <TextValidator
                          className="w-100"
                          label={!password ? "Type your password" : " "}
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
                          type={isShowPassword ? "text" : "password"}
                          name="password"
                          value={password}
                          validators={["required"]}
                          errorMessages={["Vui lòng nhập password"]}
                          variant="standard"
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12} className="forgot-password">
                        Forgot password?
                      </Grid>
                      <Grid item xs={12} className="submit-button">
                        <Button className="w-100 btn-submit-form" type="submit">
                          Login
                        </Button>
                      </Grid>
                      <Grid item xs={12} className="social-login">
                        <Grid className="social-login-text">Or Login with</Grid>
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
                              Họ
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
                              Tên
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
                              Số điện thoại
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
                              Password
                            </span>
                          }
                          onChange={(event) => {
                            this.handleChangeInput(event);
                          }}
                          type="password"
                          name="password"
                          value={password}
                          validators={["required"]}
                          errorMessages={["Vui lòng nhập password"]}
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
                              Repeat Password
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
                            "Vui lòng nhập lại password",
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
                              Địa chỉ
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
                        (<span className="red-color">*</span>) chứa những thông
                        tin bắt buộc
                      </Grid>
                      <Grid item xs={12} className="submit-button">
                        <Button className="w-100 btn-submit-form" type="submit">
                          Sign Up
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
                  Don't have account?{" "}
                  <span
                    onClick={() => {
                      this.handleOpenSignUpForm();
                    }}
                  >
                    Signup now
                  </span>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <span
                    onClick={() => {
                      this.handleCloseSignUpForm();
                    }}
                  >
                    Login now
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
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleCustomerLogin: (data) => dispatch(actions.customerLogin(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerLogin);
