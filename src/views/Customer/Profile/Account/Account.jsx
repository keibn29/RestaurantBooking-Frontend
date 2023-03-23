import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../Homepage/HomeHeader/HomeHeader";
import HomeFooter from "../../Homepage/HomeFooter/HomeFooter";
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
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import "./Account.scss";

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {}

  handleSubmitForm = () => {};

  render() {
    const { email, firstName, lastName, phone, address } = this.state;

    return (
      <>
        <Grid className="account-container">
          <Grid className="customer-profile-title">Account</Grid>
          <Grid className="customer-infor mt-3">
            <Grid>
              <Grid className="customer-avatar background-image-center-cover">
                <Grid className="camera background-image-center-cover"></Grid>
              </Grid>
              <Grid className="mt-2">
                <Grid className="customer-email-label">Email address</Grid>
                <Grid>duclongbn2912@gmail.com</Grid>
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
                  <Grid item xs={5}>
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
                      className="w-50"
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
                      validators={["required"]}
                      errorMessages={["Vui lòng nhập số điện thoại"]}
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
                </Grid>
                <Grid className="mt-5">
                  <Button className="btn-save" variant="outlined" type="submit">
                    Lưu thay đổi
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
