import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./Manage.scss";
import * as actions from "../../../store/actions";
import {
  CRUD_ACTIONS,
  LANGUAGES,
  ALLCODES,
  emitter,
  EMITTER_EVENTS,
  isExistArrayAndNotEmpty,
} from "../../../utils";
import {
  Grid,
  Button,
  MenuItem,
  TextField,
  InputLabel,
  Container,
} from "@material-ui/core";
import {
  ValidatorForm,
  TextValidator,
  SelectValidator,
} from "react-material-ui-form-validator";
import { toast } from "react-toastify";
import MaterialTableAction from "../../../components/MaterialTableAction";
import MaterialTableData from "./MaterialTableData";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import {
  addNewUser,
  deleteUserById,
  editUserById,
} from "../../../services/userService";
import ConfirmationDialog from "../../../components/ConfirmationDialog";

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
      userId: "",
      isOpenConfirmationDialog: false,
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
        if (value.length === 0) {
          return true;
        }
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

  handleSubmitForm = async () => {
    let {
      firstName,
      lastName,
      phone,
      email,
      password,
      address,
      roleId,
      avatar,
      userId,
    } = this.state;

    let data = {
      firstName,
      lastName,
      phone,
      email,
      password,
      address,
      roleId,
      avatar,
    };

    if (!userId) {
      let res = await addNewUser(data);
      if (res && res.errCode === 0) {
        toast.success("Thêm mới người dùng thành công");
        this.handleClearForm();
        emitter.emit(EMITTER_EVENTS.UPDATE_TABLE_DATA);
      } else {
        toast.error(res.errMessage);
      }
    } else {
      let res = await editUserById(userId, data);
      if (res && res.errCode === 0) {
        toast.success("Thay đổi thông tin người dùng thành công");
        this.handleClearForm();
        emitter.emit(EMITTER_EVENTS.UPDATE_TABLE_DATA);
      } else {
        toast.error(res.errMessage);
      }
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
      userId: "",
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
    if (action === "open" && !this.state.avatarPreviewURL) {
      return;
    }
    this.setState({
      isOpenLightbox: !this.state.isOpenLightbox,
    });
  };

  handleEditUser = (userData) => {
    this.setState({
      firstName: userData.firstName,
      lastName: userData.lastName,
      phone: userData.phone,
      email: userData.email,
      password: "hardcode",
      repeatPassword: "hardcode",
      address: userData.address,
      roleId: userData.roleId,
      avatarPreviewURL: process.env.REACT_APP_BACKEND_URL + userData.avatar,
      avatar: null,
      userId: userData.id,
    });
  };

  handleCloseConfirmationDialog = () => {
    this.setState({
      isOpenConfirmationDialog: false,
    });
  };

  handleDeleteUser = async (userId) => {
    this.setState({
      isOpenConfirmationDialog: true,
      userId: userId,
    });
  };

  handleConfirmDelete = async () => {
    this.setState({
      isOpenConfirmationDialog: false,
    });
    let res = await deleteUserById(this.state.userId);
    if (res && res.errCode === 0) {
      toast.success("Xóa người dùng thành công");
    } else {
      toast.error(res.errMessage);
    }
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
      userId,
      avatarPreviewURL,
      isOpenLightbox,
      isOpenConfirmationDialog,
    } = this.state;
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
        <Container className="mt-3">
          <Grid container>
            <Grid item xs={12} className="title mb-3">
              Quản lý người dùng
            </Grid>
            <Grid item xs={12}>
              <ValidatorForm ref="form" onSubmit={this.handleSubmitForm}>
                <Grid container spacing={2}>
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
                      disabled={userId ? true : false}
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
                      disabled={userId ? true : false}
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
                      validators={["required", "isMatchPassword"]}
                      errorMessages={[
                        "Vui lòng nhập repeatPassword",
                        "Mật khẩu không trùng khớp",
                      ]}
                      variant="outlined"
                      size="small"
                      disabled={userId ? true : false}
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
                      {isExistArrayAndNotEmpty(listRole) &&
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
                    <Grid
                      className="user avatar-preview background-image-center-cover"
                      style={{ backgroundImage: `url(${avatarPreviewURL})` }}
                      onClick={() => {
                        this.handleAvatarPreview("open");
                      }}
                    ></Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} container spacing={1} className="mt-4">
                  <Grid item>
                    <Button
                      className="text-capitalize"
                      variant="contained"
                      color="primary"
                      type="submit"
                    >
                      {!userId ? "Thêm" : "Sửa"}
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
            <Grid item xs={12}>
              {isOpenConfirmationDialog && (
                <ConfirmationDialog
                  title={"Xác nhận"}
                  text={"Bạn chắc chắn muốn xóa người dùng này?"}
                  isOpen={isOpenConfirmationDialog}
                  onCancelClick={this.handleCloseConfirmationDialog}
                  onConfirmClick={this.handleConfirmDelete}
                  confirm={"Xác nhận"}
                  cancel={"Hủy"}
                />
              )}
            </Grid>
            <Grid item xs={12} className="material-table">
              <MaterialTableData
                itemName="user"
                columns={columns}
                getListItem={this.fetchListUser}
              />
            </Grid>
          </Grid>
        </Container>
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
