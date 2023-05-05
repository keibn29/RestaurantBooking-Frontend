import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import { Grid, Button, TextField, InputLabel } from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import "./Account.scss";
import { USER_ROLE } from "../../../../utils";
import { FormattedMessage } from "react-intl";

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      avatar: "",
      avatarPreviewURL: "",
      customerId: "",
      roleId: USER_ROLE.CUSTOMER,
      isSubmitDisabled: true,
    };
  }

  componentDidMount() {
    this.getCustomerInfo();
    this.handleAddValidationRule();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.customerInfo !== this.props.customerInfo) {
      this.getCustomerInfo();
    }
  }

  componentWillUnmount() {
    ValidatorForm.removeValidationRule("isPhone");
  }

  handleAddValidationRule = () => {
    ValidatorForm.addValidationRule("isPhone", (value) => {
      let firstDigitStr = String(value)[0];
      if (value.length !== 10 || Number(firstDigitStr) !== 0) {
        return false;
      }
      return true;
    });
  };

  getCustomerInfo = () => {
    const { customerInfo } = this.props;
    this.setState({
      ...customerInfo,
      customerId: customerInfo.id,
      avatarPreviewURL: "",
    });
  };

  handleChangeInput = (event) => {
    let copyState = { ...this.state };
    copyState[event.target.name] = event.target.value;
    this.setState({
      ...copyState,
      isSubmitDisabled: false,
    });
  };

  handleChangeAvatar = (event) => {
    let image = event.target.files[0];
    if (image) {
      let avatarPreviewURL = URL.createObjectURL(image);
      this.setState({
        avatarPreviewURL: avatarPreviewURL,
        avatar: image,
        isSubmitDisabled: false,
      });
    }
  };

  handleSubmitForm = async () => {
    const { firstName, lastName, phone, address, avatar, roleId, customerId } =
      this.state;
    let data = {
      firstName,
      lastName,
      phone,
      address,
      roleId,
      avatar,
    };
    this.props.editCustomerInfoById(customerId, data);
  };

  render() {
    const { customerInfo } = this.props;
    const {
      firstName,
      lastName,
      phone,
      address,
      avatarPreviewURL,
      isSubmitDisabled,
    } = this.state;

    return (
      <>
        <Grid className="account-container">
          <Grid className="customer-profile-title">
            <FormattedMessage id="customer.homepage.home-header.account-information" />
          </Grid>
          <Grid className="customer-infor mt-3">
            <Grid>
              <Grid className="avatar-container">
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
                <InputLabel
                  htmlFor="upload-customer-avatar"
                  className="upload-new-avatar background-image-center-cover"
                  style={
                    avatarPreviewURL
                      ? {
                          backgroundImage: `url(${avatarPreviewURL})`,
                        }
                      : {}
                  }
                ></InputLabel>
                <TextField
                  id="upload-customer-avatar"
                  type="file"
                  hidden
                  onChange={(event) => {
                    this.handleChangeAvatar(event);
                  }}
                />
              </Grid>
              <Grid className="mt-2">
                <Grid className="customer-email-label">
                  <FormattedMessage id="customer.profile.account.email-address" />
                </Grid>
                <Grid>{customerInfo.email}</Grid>
              </Grid>
            </Grid>
            <Grid className="mt-3">
              <ValidatorForm ref="form" onSubmit={this.handleSubmitForm}>
                <Grid container spacing={2}>
                  <Grid item xs={5}>
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
                  <Grid item xs={5}>
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
                      className="w-50"
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
                      className="w-50"
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
                </Grid>
                <Grid className="mt-5">
                  <Button
                    className={
                      isSubmitDisabled ? "btn-save submit-disable" : "btn-save"
                    }
                    variant="outlined"
                    type="submit"
                    disabled={isSubmitDisabled ? true : false}
                  >
                    <FormattedMessage id="customer.email.save-change" />
                  </Button>
                </Grid>
              </ValidatorForm>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    customerInfo: state.user.customerInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editCustomerInfoById: (customerId, data) =>
      dispatch(actions.editCustomerInfoById(customerId, data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
