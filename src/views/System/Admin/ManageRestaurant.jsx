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
  USER_ROLE,
} from "../../../utils";
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
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
  addNewRestaurant,
  editRestaurantById,
} from "../../../services/restaurantService";

class ManageRestaurant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameVi: "",
      nameEn: "",
      descriptionVi: "",
      descriptionEn: "",
      addressVi: "",
      addressEn: "",
      listProvince: [],
      provinceSelected: "",
      listManager: [],
      managerSelected: "",
      table: "",
      avatar: "",
      isOpenAvatarLightbox: false,
      avatarPreviewURL: "",
      listPhoto: [],
      photoIndex: 0,
      isOpenPhotosLightbox: false,
      listPhotoPreviewURL: [],
      restaurantId: "",
      isOpenConfirmationDialog: false,
    };
  }

  componentDidMount() {
    this.props.getAllProvince(ALLCODES.PROVINCE);
    this.props.getAllManager(USER_ROLE.RESTAURANT_MANAGER);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listProvince !== this.props.listProvince) {
      this.setState({
        listProvince: this.props.listProvince,
      });
    }
    if (prevProps.listManager !== this.props.listManager) {
      this.setState({
        listManager: this.props.listManager,
      });
    }
  }

  fetchListRestaurant = (data) => {
    let { language } = this.props;
    console.log(language);
    this.props.getListRestaurant(data, language);
  };

  //   handleAddValidationRule = () => {
  //     ValidatorForm.addValidationRule("isPhone", (value) => {
  //       let firstDigitStr = String(value)[0];
  //       if (value.length !== 10 || Number(firstDigitStr) !== 0) {
  //         if (value.length === 0) {
  //           return true;
  //         }
  //         return false;
  //       }
  //       return true;
  //     });
  //     ValidatorForm.addValidationRule("isMatchPassword", (value) => {
  //       if (value !== this.state.password) {
  //         return false;
  //       }
  //       return true;
  //     });
  //   };

  handleSubmitForm = async () => {
    let {
      nameVi,
      nameEn,
      descriptionVi,
      descriptionEn,
      addressVi,
      addressEn,
      provinceSelected,
      managerSelected,
      table,
      avatar,
      listPhoto,
      restaurantId,
    } = this.state;

    let data = {
      nameVi,
      nameEn,
      descriptionVi,
      descriptionEn,
      addressVi,
      addressEn,
      provinceId: provinceSelected,
      managerId: managerSelected,
      table,
      avatar,
      listPhoto,
      restaurantId,
    };

    if (!restaurantId) {
      let res = await addNewRestaurant(data);
      if (res && res.errCode === 0) {
        toast.success("Thêm mới nhà hàng thành công");
        this.handleClearForm();
        emitter.emit(EMITTER_EVENTS.UPDATE_TABLE_DATA);
      } else {
        toast.error(res.errMessage);
      }
    } else {
      let res = await editRestaurantById(restaurantId, data);
      if (res && res.errCode === 0) {
        toast.success("Thay đổi thông tin nhà hàng thành công");
        this.handleClearForm();
        emitter.emit(EMITTER_EVENTS.UPDATE_TABLE_DATA);
      } else {
        toast.error(res.errMessage);
      }
    }
  };

  handleClearForm = () => {
    this.setState({
      nameVi: "",
      nameEn: "",
      descriptionVi: "",
      descriptionEn: "",
      addressVi: "",
      addressEn: "",
      provinceSelected: "",
      managerSelected: "",
      table: "",
      avatar: "",
      isOpenAvatarLightbox: false,
      avatarPreviewURL: "",
      listPhoto: [],
      photoIndex: 0,
      isOpenPhotosLightbox: false,
      listPhotoPreviewURL: [],
      restaurantId: "",
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

  handleShowHideAvatarLightbox = (action) => {
    if (action === "open" && !this.state.avatarPreviewURL) {
      return;
    }
    this.setState({
      isOpenAvatarLightbox: !this.state.isOpenAvatarLightbox,
    });
  };

  handleChangePhotos = (event) => {
    let listImage = event.target.files;
    let listPhotoPreviewURL = [];
    if (isExistArrayAndNotEmpty(listImage)) {
      [...listImage].map((item) => {
        item = URL.createObjectURL(item);
        listPhotoPreviewURL.push(item);
        return listPhotoPreviewURL;
      });
      this.setState({
        listPhoto: listImage,
        listPhotoPreviewURL: listPhotoPreviewURL,
      });
    }
  };

  handleShowHidePhotosLightbox = (action) => {
    let { listPhoto } = this.state;
    if (action === "open" && listPhoto.length === 0) {
      return;
    }
    this.setState({
      isOpenPhotosLightbox: !this.state.isOpenPhotosLightbox,
    });
  };

  handleChangeEditor = (event, data, name) => {
    let copyState = { ...this.state };
    copyState[name] = data;
    this.setState({
      ...copyState,
    });
  };

  handleEditUser = (restaurantData) => {
    this.setState({
      ...restaurantData,
      avatarPreviewURL:
        process.env.REACT_APP_BACKEND_URL + restaurantData.avatar,
      provinceSelected: restaurantData.provinceId,
      managerSelected: restaurantData.managerId,
      avatar: "",
      restaurantId: restaurantData.id,
    });
  };

  //   handleCloseConfirmationDialog = () => {
  //     this.setState({
  //       isOpenConfirmationDialog: false,
  //     });
  //   };

  //   handleDeleteUser = async (restaurantId) => {
  //     this.setState({
  //       isOpenConfirmationDialog: true,
  //       restaurantId: restaurantId,
  //     });
  //   };

  //   handleConfirmDelete = async () => {
  //     this.setState({
  //       isOpenConfirmationDialog: false,
  //     });
  //     let res = await deleteUserById(this.state.restaurantId);
  //     if (res && res.errCode === 0) {
  //       toast.success("Xóa người dùng thành công");
  //     } else {
  //       toast.error(res.errMessage);
  //     }
  //   };

  render() {
    let {
      nameVi,
      nameEn,
      descriptionVi,
      descriptionEn,
      addressVi,
      addressEn,
      listProvince,
      provinceSelected,
      listManager,
      managerSelected,
      table,
      restaurantId,
      listPhoto,
      photoIndex,
      isOpenPhotosLightbox,
      listPhotoPreviewURL,
      avatarPreviewURL,
      isOpenAvatarLightbox,
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
        title: "Tên nhà hàng",
        field: language === LANGUAGES.VI ? "nameVi" : "nameEn",
        align: "left",
      },
      {
        title: "Tỉnh thành",
        field:
          language === LANGUAGES.VI
            ? "provinceData.valueVi"
            : "provinceData.valueEn",
        align: "left",
      },
      {
        title: "Người quản lý",
        // field: "managerData",
        align: "left",
        render: (rowData) =>
          language === LANGUAGES.VI
            ? `${rowData.managerData.lastName} ${rowData.managerData.firstName}`
            : `${rowData.managerData.firstName} ${rowData.managerData.lastName}`,
      },
      {
        title: "Địa chỉ",
        field: language === LANGUAGES.VI ? "addressVi" : "addressEn",
        align: "left",
      },
      {
        title: "Số bàn",
        field: "table",
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
    console.log(this.state);

    return (
      <>
        <Container className="mt-3">
          <Grid container>
            <Grid item xs={12} className="title mb-3">
              Quản lý nhà hàng
            </Grid>
            <Grid item xs={12}>
              <ValidatorForm ref="form" onSubmit={this.handleSubmitForm}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextValidator
                      className="w-100"
                      label={
                        <span>
                          <span className="red-color"> * </span>
                          Tên nhà hàng (VI)
                        </span>
                      }
                      onChange={(event) => {
                        this.handleChangeInput(event);
                      }}
                      type="text"
                      name="nameVi"
                      value={nameVi}
                      validators={["required"]}
                      errorMessages={["Vui lòng nhập tên nhà hàng"]}
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextValidator
                      className="w-100"
                      label={
                        <span>
                          <span className="red-color"> * </span>
                          Tên nhà hàng (EN)
                        </span>
                      }
                      onChange={(event) => {
                        this.handleChangeInput(event);
                      }}
                      type="text"
                      name="nameEn"
                      value={nameEn}
                      validators={["required"]}
                      errorMessages={["Vui lòng nhập tên nhà hàng"]}
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextValidator
                      className="w-100"
                      label={
                        <span>
                          <span className="red-color"> * </span>
                          Địa chỉ (VI)
                        </span>
                      }
                      onChange={(event) => {
                        this.handleChangeInput(event);
                      }}
                      type="text"
                      name="addressVi"
                      value={addressVi}
                      validators={["required"]}
                      errorMessages={["Vui lòng nhập địa chỉ nhà hàng"]}
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextValidator
                      className="w-100"
                      label={
                        <span>
                          <span className="red-color"> * </span>
                          Địa chỉ (EN)
                        </span>
                      }
                      onChange={(event) => {
                        this.handleChangeInput(event);
                      }}
                      type="text"
                      name="addressEn"
                      value={addressEn}
                      validators={["required"]}
                      errorMessages={["Vui lòng nhập địa chỉ nhà hàng"]}
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <SelectValidator
                      className="w-100 mb-16"
                      label={
                        <span>
                          <span className="red-color"> * </span>
                          Tỉnh thành
                        </span>
                      }
                      onChange={(event) => {
                        this.handleChangeInput(event);
                      }}
                      name="provinceSelected"
                      value={provinceSelected}
                      validators={["required"]}
                      errorMessages={["Vui lòng chọn tỉnh thành"]}
                      variant="outlined"
                      size="small"
                    >
                      {isExistArrayAndNotEmpty(listProvince) &&
                        listProvince.map((item) => {
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
                  <Grid item xs={3}>
                    <SelectValidator
                      className="w-100 mb-16"
                      label={
                        <span>
                          <span className="red-color"> * </span>
                          Người quản lý
                        </span>
                      }
                      onChange={(event) => {
                        this.handleChangeInput(event);
                      }}
                      name="managerSelected"
                      value={managerSelected}
                      validators={["required"]}
                      errorMessages={["Vui lòng chọn người quản lý"]}
                      variant="outlined"
                      size="small"
                    >
                      {isExistArrayAndNotEmpty(listManager) &&
                        listManager.map((item) => {
                          return (
                            <MenuItem key={item.id} value={item.id}>
                              {language === LANGUAGES.VI
                                ? `${item.lastName} ${item.firstName}`
                                : `${item.firstName} ${item.lastName}`}
                            </MenuItem>
                          );
                        })}
                    </SelectValidator>
                  </Grid>
                  <Grid item xs={1}>
                    <TextValidator
                      className="w-100"
                      label={
                        <span>
                          <span className="red-color"> * </span>
                          Số bàn
                        </span>
                      }
                      onChange={(event) => {
                        this.handleChangeInput(event);
                      }}
                      type="number"
                      name="table"
                      value={table}
                      validators={["required"]}
                      errorMessages={["Vui lòng nhập số bàn"]}
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={1}>
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
                      className="flex-center avatar-label"
                      htmlFor="avatar"
                      variant="standard"
                    >
                      Avatar
                      <i class="fas fa-upload"></i>
                    </InputLabel>
                  </Grid>
                  <Grid item xs={4} className="avatar-preview-grid">
                    <Grid
                      className="restaurant avatar-preview background-image-center-cover"
                      style={{ backgroundImage: `url(${avatarPreviewURL})` }}
                      onClick={() => {
                        this.handleShowHideAvatarLightbox("open");
                      }}
                    ></Grid>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    container
                    spacing={2}
                    className="photo-container"
                  >
                    <Grid item>
                      <TextField
                        id="listPhoto"
                        name="listPhoto"
                        type="file"
                        hidden
                        inputProps={{
                          multiple: true,
                        }}
                        onChange={(event) => {
                          this.handleChangePhotos(event);
                        }}
                      />
                      <InputLabel
                        className="flex-center photo-label"
                        htmlFor="listPhoto"
                        variant="standard"
                      >
                        Photos
                        <i class="fas fa-upload"></i>
                      </InputLabel>
                    </Grid>
                    <Grid item>
                      <Grid
                        className="photo-number"
                        onClick={() => {
                          this.handleShowHidePhotosLightbox("open");
                        }}
                      >
                        <span className="number">
                          {listPhoto.length} photos
                        </span>
                        <span className="text">Click to view all photos</span>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel htmlFor="descriptionVi">
                      Thông tin nhà hàng (VI)
                    </InputLabel>
                    <CKEditor
                      editor={ClassicEditor}
                      data={descriptionVi}
                      name="descriptionVi"
                      id="descriptionVi"
                      onChange={(event, editor) => {
                        this.handleChangeEditor(
                          event,
                          editor.getData(),
                          "descriptionVi"
                        );
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel htmlFor="descriptionEn">
                      Thông tin nhà hàng (EN)
                    </InputLabel>
                    <CKEditor
                      editor={ClassicEditor}
                      data={descriptionEn}
                      name="descriptionEn"
                      id="descriptionEn"
                      onChange={(event, editor) => {
                        this.handleChangeEditor(
                          event,
                          editor.getData(),
                          "descriptionEn"
                        );
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} container spacing={1} className="mt-2">
                  <Grid item>
                    <Button
                      className="text-capitalize"
                      variant="contained"
                      color="primary"
                      type="submit"
                    >
                      {!restaurantId ? "Thêm" : "Sửa"}
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
              {/* {isOpenConfirmationDialog && (
                <ConfirmationDialog
                  title={"Xác nhận"}
                  text={"Bạn chắc chắn muốn xóa người dùng này?"}
                  isOpen={isOpenConfirmationDialog}
                  onCancelClick={this.handleCloseConfirmationDialog}
                  onConfirmClick={this.handleConfirmDelete}
                  confirm={"Xác nhận"}
                  cancel={"Hủy"}
                />
              )} */}
            </Grid>
            <Grid item xs={12} className="material-table">
              <MaterialTableData
                itemName="restaurant"
                columns={columns}
                getListItem={this.fetchListRestaurant}
              />
            </Grid>
          </Grid>
        </Container>
        {isOpenAvatarLightbox && (
          <Lightbox
            mainSrc={avatarPreviewURL}
            onCloseRequest={() => {
              this.handleShowHideAvatarLightbox("close");
            }}
          />
        )}
        {isOpenPhotosLightbox && (
          <Lightbox
            mainSrc={listPhotoPreviewURL[photoIndex]}
            nextSrc={
              listPhotoPreviewURL[(photoIndex + 1) % listPhotoPreviewURL.length]
            }
            prevSrc={
              listPhotoPreviewURL[
                (photoIndex + listPhotoPreviewURL.length - 1) %
                  listPhotoPreviewURL.length
              ]
            }
            onCloseRequest={() => {
              this.handleShowHidePhotosLightbox("close");
            }}
            onMovePrevRequest={() =>
              this.setState({
                photoIndex:
                  (photoIndex + listPhotoPreviewURL.length - 1) %
                  listPhotoPreviewURL.length,
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                photoIndex: (photoIndex + 1) % listPhotoPreviewURL.length,
              })
            }
          />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    listProvince: state.allCode.listProvince,
    listManager: state.user.listUserByRole,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllProvince: (code) => dispatch(actions.getAllProvince(code)),
    getAllManager: (role) => dispatch(actions.getAllUserByRole(role)),
    getListRestaurant: (data, language) =>
      dispatch(actions.getListRestaurant(data, language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageRestaurant);
