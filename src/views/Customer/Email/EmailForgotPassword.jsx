import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../Homepage/HomeHeader/HomeHeader";
import HomeFooter from "../Homepage/HomeFooter/HomeFooter";
import { Grid, Button, TextField } from "@material-ui/core";
import "./EmailForgotPassword.scss";
import { updateNewPassword } from "../../../services/customerService";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";

class EmailForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      isShowPassword: false,
    };
  }

  componentDidMount() {}

  handleChangeInput = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  handleShowHidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };

  handleUpdatePassword = async () => {
    const { password } = this.state;
    if (!password) {
      toast.error("Vui lòng nhập mật khẩu mới");
      return;
    }

    if (this.props.match?.params?.customerId && this.props.location?.search) {
      const customerId = this.props.match.params.customerId;
      const urlParams = new URLSearchParams(this.props.location.search);
      const token = urlParams.get("token");
      console.log("customerId", customerId);

      const res = await updateNewPassword(customerId, token, { password });
      if (res && res.errCode === 0) {
        toast.success("Cập nhật mật khẩu mới thành công");
      } else {
        toast.error(res.errMessage);
      }
    }
  };

  render() {
    const { password, isShowPassword } = this.state;

    return (
      <>
        <HomeHeader isShowHeaderSearch={true} />
        <Grid
          className="email-forgot-password-container"
          container
          justify="center"
        >
          <Grid item xs={3}>
            <Grid className="update-password-title mt-3">
              <FormattedMessage id="customer.email.update-password" />
            </Grid>
            <Grid className="update-password-body mt-3">
              <TextField
                className="w-100"
                label={
                  !password ? (
                    <FormattedMessage id="customer.email.type-new-password" />
                  ) : (
                    " "
                  )
                }
                InputLabelProps={{
                  style: {
                    color: "gray",
                  },
                  shrink: false,
                }}
                onChange={(event) => {
                  this.handleChangeInput(event);
                }}
                type={isShowPassword ? "text" : "password"}
                name="password"
                value={password}
                variant="outlined"
              />
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
            </Grid>
            <Grid item xs={12} className="update-password-button mt-4">
              <Button
                className="w-50 btn-submit"
                variant="outlined"
                onClick={() => {
                  this.handleUpdatePassword();
                }}
              >
                <FormattedMessage id="customer.email.save-change" />
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <HomeFooter />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailForgotPassword);
