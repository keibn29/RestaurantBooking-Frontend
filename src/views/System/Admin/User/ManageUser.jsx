import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ManageUser.scss";
import * as actions from "../../../../store/actions";
import { CRUD_ACTIONS, LANGUAGES, ALLCODES } from "../../../../utils";
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
} from "@material-ui/core";
import {
  ValidatorForm,
  TextValidator,
  SelectValidator,
} from "react-material-ui-form-validator";
import { toast } from "react-toastify";
import MaterialTableAction from "../../../../components/MaterialTableAction";
import MaterialTableData from "../MaterialTableData";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { addNewUser } from "../../../../services/userService";

class ManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      repeatPassword: "",
      address: "",
      listRole: [],
      roleId: "",
      isOpenLightbox: false,
      avatarPreviewURL: "",
      avatar: null,
    };
  }

  componentDidMount() {
    this.props.getAllRole(ALLCODES.ROLE);
    this.handleAddValidationRule();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listRole !== this.props.listRole) {
      this.setState({
        listRole: this.props.listRole,
      });
    }
  }

  fetchListUser = (data) => {
    this.props.getListUser(data);
  };

  handleAddValidationRule = () => {
    ValidatorForm.addValidationRule("isPhone", (value) => {
      let firstDigitStr = String(value)[0];
      if (value.length !== 10 || Number(firstDigitStr) !== 0) {
        return false;
      }
      return true;
    });
    ValidatorForm.addValidationRule("isPassword", (value) => {
      if (value !== this.state.password) {
        return false;
      }
      return true;
    });
  };

  handleFormSubmit = async () => {
    let {
      firstName,
      lastName,
      phone,
      email,
      password,
      address,
      roleId,
      avatar,
    } = this.state;

    let res = await addNewUser({
      firstName,
      lastName,
      phone,
      email,
      password,
      address,
      roleId,
      avatar,
    });
    if (res && res.errCode === 0) {
      toast.success("Thêm mới người dùng thành công");
      this.handleClearForm();
    } else {
      toast.error(res.errMessage);
    }
  };

  handleClearForm = () => {
    this.setState({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      repeatPassword: "",
      address: "",
      roleId: "",
      isOpenLightbox: false,
      avatarPreviewURL: "",
      avatar: null,
    });
    // window.location.reload(false);
  };

  handleChangeInput = (event) => {
    let copyState = { ...this.state };
    copyState[event.target.name] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleChangeAvatar = (event) => {
    let image = event.target.files[0];
    if (image) {
      let avatarPreviewURL = URL.createObjectURL(image);
      this.setState({
        avatarPreviewURL: avatarPreviewURL,
        avatar: image,
      });
    }
  };

  handleAvatarPreview = (action) => {
    if (action === "open") {
      if (!this.state.avatarPreviewURL) {
        return;
      }
    }
    this.setState({
      isOpenLightbox: !this.state.isOpenLightbox,
    });
  };

  handleEditUser = (userData) => {
    console.log(userData);
  };

  handleDeleteUser = (userId) => {
    console.log(userId);
  };

  render() {
    let {
      email,
      password,
      repeatPassword,
      firstName,
      lastName,
      phone,
      address,
      listRole,
      roleId,
      avatar,
      avatarPreviewURL,
      isOpenLightbox,
    } = this.state;
    console.log(avatarPreviewURL);
    let { language } = this.props;
    let columns = [
      {
        title: "STT",
        align: "left",
        width: "100",
        sorting: false,
        render: (rowData) => rowData.tableData.id + 1,
      },
      {
        title: "Vai trò",
        field: "roleData.valueVi",
        align: "left",
      },
      {
        title: "Họ",
        field: "firstName",
        align: "left",
      },
      {
        title: "Tên",
        field: "lastName",
        align: "left",
      },
      {
        title: "Email",
        field: "email",
        align: "left",
      },
      {
        title: "Số điện thoại",
        field: "phone",
        align: "left",
      },
      {
        title: "Action",
        align: "center",
        sorting: false,
        render: (rowData) => (
          <MaterialTableAction
            item={rowData}
            onSelect={(rowData, method) => {
              if (method === CRUD_ACTIONS.EDIT) {
                this.handleEditUser(rowData);
              }
              if (method === CRUD_ACTIONS.DELETE) {
                this.handleDeleteUser(rowData.id);
              }
            }}
          />
        ),
      },
    ];
    return (
      <>
        <div className="container mt-3">
          <Grid container>
            <Grid item xs={12} className="title mb-3">
              Quản lý người dùng
            </Grid>
            <Grid item xs={12}>
              <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
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
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={4}>
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
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={4}>
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
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={4}>
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
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={4}>
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
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={4}>
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
                      validators={["required", "isPassword"]}
                      errorMessages={[
                        "Vui lòng nhập repeatPassword",
                        "Mật khẩu không trùng khớp",
                      ]}
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={4}>
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
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <SelectValidator
                      className="w-100 mb-16"
                      label={
                        <span>
                          <span className="red-color"> * </span>
                          Vai trò
                        </span>
                      }
                      onChange={(event) => {
                        this.handleChangeInput(event);
                      }}
                      name="roleId"
                      value={roleId}
                      validators={["required"]}
                      errorMessages={["Vui lòng chọn vai trò"]}
                      variant="outlined"
                      size="small"
                    >
                      {listRole &&
                        listRole.length > 0 &&
                        listRole.map((item) => {
                          return (
                            <MenuItem key={item.id} value={item.keyMap}>
                              {language === LANGUAGES.VI
                                ? item.valueVi
                                : item.valueEn}
                            </MenuItem>
                          );
                        })}
                    </SelectValidator>
                  </Grid>
                  <Grid item xs={2}>
                    <TextField
                      id="avatar"
                      name="avatar"
                      type="file"
                      hidden
                      onChange={(event) => {
                        this.handleChangeAvatar(event);
                      }}
                    />
                    <InputLabel
                      className="height-40px flex-center avatar-label"
                      htmlFor="avatar"
                      variant="standard"
                    >
                      Upload Avatar
                      <i class="fas fa-upload"></i>
                    </InputLabel>
                  </Grid>
                  <Grid item xs={2} className="avatar-preview-grid">
                    <Box
                      className="avatar-preview image-center-cover"
                      style={{ backgroundImage: `url(${avatarPreviewURL})` }}
                      onClick={() => {
                        this.handleAvatarPreview("open");
                      }}
                    ></Box>
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={12}
                  container
                  // justifyContent="center"
                  spacing={1}
                  className="mt-4"
                >
                  <Grid item>
                    <Button
                      className="text-capitalize"
                      variant="contained"
                      color="primary"
                      type="submit"
                    >
                      Save
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      className="text-capitalize"
                      variant="contained"
                      color="secondary"
                      onClick={() => {
                        this.handleClearForm();
                      }}
                    >
                      Clear
                    </Button>
                  </Grid>
                </Grid>
              </ValidatorForm>
            </Grid>
            <Grid item xs={12} className="material-table">
              <MaterialTableData
                itemName="user"
                columns={columns}
                getListItem={this.fetchListUser}
              />
            </Grid>
          </Grid>
        </div>
        {isOpenLightbox && (
          <Lightbox
            mainSrc={avatarPreviewURL}
            onCloseRequest={() => {
              this.handleAvatarPreview("close");
            }}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    listRole: state.allCode.listRole,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListUser: (data) => dispatch(actions.getListUser(data)),
    getAllRole: (code) => dispatch(actions.getAllRole(code)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageUser);