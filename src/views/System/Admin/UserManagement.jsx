import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./Management.scss";
import * as actions from "../../../store/actions";
import {
  CRUD_ACTIONS,
  LANGUAGES,
  ALLCODES,
  emitter,
  EMITTER_EVENTS,
  isExistArrayAndNotEmpty,
  USER_ROLE,
  TABLE_ITEM_NAME,
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

class UserManagement extends Component {
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
      roleSelectedToGetListUser: USER_ROLE.ADMIN,
      isOpenLightbox: false,
      avatarPreviewURL: "",
      avatar: "",
      userId: "",
      isOpenConfirmationDialog: false,
      keyAvatar: Date.now(),
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

  componentWillUnmount() {
    ValidatorForm.removeValidationRule("isPhone");
    ValidatorForm.removeValidationRule("isMatchPassword");
  }

  fetchListUser = (data) => {
    data.roleId = this.state.roleSelectedToGetListUser;
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

  handleSubmitForm = () => {
    const {
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
      this.callApiAddNewUser(data);
    } else {
      this.callApiEditUserById(userId, data);
    }
  };

  callApiAddNewUser = async (data) => {
    const res = await addNewUser(data);
    if (res && res.errCode === 0) {
      toast.success("Thêm mới người dùng thành công");
      this.handleClearForm();
      emitter.emit(EMITTER_EVENTS.UPDATE_TABLE_DATA);
    } else {
      toast.error(res.errMessage);
    }
  };

  callApiEditUserById = async (userId, data) => {
    const res = await editUserById(userId, data);
    if (res && res.errCode === 0) {
      toast.success("Thay đổi thông tin người dùng thành công");
      this.handleClearForm();
      emitter.emit(EMITTER_EVENTS.UPDATE_TABLE_DATA);
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
      avatar: "",
      userId: "",
      keyAvatar: Date.now(),
    });
  };

  handleChangeInput = (event) => {
    let copyState = { ...this.state };
    copyState[event.target.name] = event.target.value;
    this.setState(
      {
        ...copyState,
      },
      () => {
        if (event.target.name === "roleSelectedToGetListUser") {
          emitter.emit(EMITTER_EVENTS.UPDATE_TABLE_DATA);
        }
      }
    );
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
      avatar: "",
      userId: userData.id,
    });

    document.querySelector(".title").scrollIntoView({
      behavior: "smooth",
      block: "end",
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
    this.handleCloseConfirmationDialog();
    const res = await deleteUserById(this.state.userId);
    if (res && res.errCode === 0) {
      toast.success("Xóa người dùng thành công");
      this.handleClearForm();
      emitter.emit(EMITTER_EVENTS.UPDATE_TABLE_DATA);
    } else {
      toast.error(res.errMessage);
    }
  };

  render() {
    const {
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
      roleSelectedToGetListUser,
      keyAvatar,
    } = this.state;
    const { language } = this.props;
    const columns = [
      {
        title: language === LANGUAGES.VI ? "STT" : "NO",
        field: "no",
        width: "100",
        sorting: false,
      },
      {
        title: language === LANGUAGES.VI ? "Vai trò" : "Role",
        field: "roleData.valueVi",
      },
      {
        title: language === LANGUAGES.VI ? "Họ và tên" : "Full name",
        render: (rowData) =>
          language === LANGUAGES.VI
            ? `${rowData.lastName} ${rowData.firstName}`
            : `${rowData.firstName} ${rowData.lastName}`,
      },
      {
        title: "Email",
        field: "email",
      },
      {
        title: language === LANGUAGES.VI ? "Số điện thoại" : "Phone number",
        field: "phone",
      },
      {
        title: "Action",
        headerStyle: {
          textAlign: "center",
        },
        cellStyle: {
          textAlign: "center",
        },
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

    console.log("this.state.avatar", this.state.avatar);
    console.log("this.state.avatarPreview", this.state.avatarPreviewURL);

    return (
      <>
        <Container className="mt-3">
          <Grid>
            <Grid className="title mb-3">
              <FormattedMessage id="system.header.user-management" />
            </Grid>
            <Grid>
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
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <SelectValidator
                      className="w-100"
                      label={
                        <span>
                          <span className="red-color"> * </span>
                          <FormattedMessage id="system.admin.role" />
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
                            <MenuItem key={item.keyMap} value={item.keyMap}>
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
                      key={keyAvatar}
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
                      Avatar
                      <i className="fas fa-upload"></i>
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
                <Grid container spacing={1} className="mt-4">
                  <Grid item>
                    <Button variant="contained" color="primary" type="submit">
                      {!userId ? (
                        <FormattedMessage id="system.admin.add" />
                      ) : (
                        <FormattedMessage id="system.admin.edit" />
                      )}
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
                      <FormattedMessage id="system.admin.clear" />
                    </Button>
                  </Grid>
                </Grid>
              </ValidatorForm>
            </Grid>
            <Grid>
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
            <Grid className="material-table mt-5" container spacing={2}>
              <Grid item xs={12} className="list-item-title">
                <FormattedMessage id="system.admin.list-user" />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  select
                  className="w-100"
                  label={<FormattedMessage id="system.admin.role" />}
                  onChange={(event) => {
                    this.handleChangeInput(event);
                  }}
                  name="roleSelectedToGetListUser"
                  value={roleSelectedToGetListUser}
                  variant="outlined"
                  size="small"
                >
                  {isExistArrayAndNotEmpty(listRole) &&
                    listRole.map((item) => {
                      return (
                        <MenuItem key={item.keyMap} value={item.keyMap}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </MenuItem>
                      );
                    })}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <MaterialTableData
                  itemName={TABLE_ITEM_NAME.USER}
                  columns={columns}
                  getListItem={this.fetchListUser}
                  localization="Không có người dùng nào"
                />
              </Grid>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManagement);
