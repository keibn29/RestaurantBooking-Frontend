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
  OBJECT,
  NUMBER_MAX_VALUE,
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
import ConfirmationDialog from "../../../components/ConfirmationDialog";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
  addNewRestaurant,
  editRestaurantById,
  deleteRestaurantById,
} from "../../../services/restaurantService";

class RestaurantManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameVi: "",
      nameEn: "",
      descriptionVi: "",
      descriptionEn: "",
      isDescriptionViError: false,
      isDescriptionEnError: false,
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
      keyAvatar: Date.now(),
      keyListPhoto: Date.now(),
    };
  }

  componentDidMount() {
    this.props.getAllProvince(ALLCODES.PROVINCE);
    this.props.getAllManager({
      pageSize: NUMBER_MAX_VALUE,
      pageOrder: 1,
      roleId: USER_ROLE.RESTAURANT_MANAGER,
    });
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
    if (prevProps.listPhoto !== this.props.listPhoto) {
      this.getListPhotoPreviewURL();
    }
  }

  fetchListRestaurant = (data) => {
    const { language } = this.props;
    this.props.getListRestaurant(data, language);
  };

  getListPhotoPreviewURL = () => {
    const { listPhoto } = this.props;
    let listPhotoPreviewURL = [];
    if (isExistArrayAndNotEmpty(listPhoto)) {
      listPhoto.map((item) => {
        let photoPreviewURLItem = process.env.REACT_APP_BACKEND_URL + item.link;
        listPhotoPreviewURL.push(photoPreviewURLItem);
        return listPhotoPreviewURL;
      });
    }
    this.setState({
      listPhotoPreviewURL: listPhotoPreviewURL,
    });
  };

  isValidCkEditor = () => {
    const { descriptionVi, descriptionEn } = this.state;
    let isValid = true;

    if (!descriptionVi) {
      isValid = false;
      this.setState({
        isDescriptionViError: true,
      });
    } else {
      this.setState({
        isDescriptionViError: false,
      });
    }

    if (!descriptionEn) {
      isValid = false;
      this.setState({
        isDescriptionEnError: true,
      });
    } else {
      this.setState({
        isDescriptionEnError: false,
      });
    }

    return isValid;
  };

  handleSubmitForm = () => {
    const {
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

    let isSendAvatar = false;
    let listImage = [...listPhoto];
    if (avatar) {
      isSendAvatar = true;
      listImage.unshift(avatar);
    }
    let formData = new FormData();
    if (isExistArrayAndNotEmpty(listImage)) {
      listImage.map((item) => {
        formData.append("images", item);
        return formData;
      });
    }
    formData.append("isSendAvatar", isSendAvatar);
    formData.append("nameVi", nameVi);
    formData.append("nameEn", nameEn);
    formData.append("descriptionVi", descriptionVi);
    formData.append("descriptionEn", descriptionEn);
    formData.append("addressVi", addressVi);
    formData.append("addressEn", addressEn);
    formData.append("provinceId", provinceSelected);
    formData.append("managerId", managerSelected);
    formData.append("table", table);
    formData.append("restaurantId", restaurantId);

    let isValidCkEditor = this.isValidCkEditor();
    if (isValidCkEditor) {
      if (!restaurantId) {
        this.callApiAddNewRestaurant(formData);
      } else {
        this.callApiEditRestaurantById(restaurantId, formData);
      }
    }
  };

  callApiAddNewRestaurant = async (data) => {
    const res = await addNewRestaurant(data);
    if (res && res.errCode === 0) {
      toast.success("Thêm mới nhà hàng thành công");
      this.handleClearForm();
      emitter.emit(EMITTER_EVENTS.UPDATE_TABLE_DATA);
    } else {
      toast.error(res.errMessage);
    }
  };

  callApiEditRestaurantById = async (restaurantId, data) => {
    const res = await editRestaurantById(restaurantId, data);
    if (res && res.errCode === 0) {
      toast.success("Thay đổi thông tin nhà hàng thành công");
      this.handleClearForm();
      emitter.emit(EMITTER_EVENTS.UPDATE_TABLE_DATA);
    } else {
      toast.error(res.errMessage);
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
      keyAvatar: Date.now(),
      keyListPhoto: Date.now(),
    });
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
    const { listPhotoPreviewURL } = this.state;
    if (action === "open" && listPhotoPreviewURL.length === 0) {
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

  handleEditRestaurant = (restaurantData) => {
    this.props.getAllPhotoByRestaurant(OBJECT.RESTAURANT, restaurantData.id);
    this.setState({
      ...restaurantData,
      avatarPreviewURL:
        process.env.REACT_APP_BACKEND_URL + restaurantData.avatar,
      provinceSelected: restaurantData.provinceId,
      managerSelected: restaurantData.managerId,
      avatar: "",
      listPhoto: [],
      restaurantId: restaurantData.id,
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

  handleDeleteRestaurant = async (restaurantId) => {
    this.setState({
      isOpenConfirmationDialog: true,
      restaurantId: restaurantId,
    });
  };

  handleConfirmDelete = async () => {
    this.handleCloseConfirmationDialog();
    const res = await deleteRestaurantById(this.state.restaurantId);
    if (res && res.errCode === 0) {
      toast.success("Xóa nhà hàng thành công");
      this.handleClearForm();
      emitter.emit(EMITTER_EVENTS.UPDATE_TABLE_DATA);
    } else {
      toast.error(res.errMessage);
    }
  };

  render() {
    const {
      nameVi,
      nameEn,
      descriptionVi,
      descriptionEn,
      addressVi,
      addressEn,
      isDescriptionViError,
      isDescriptionEnError,
      listProvince,
      provinceSelected,
      listManager,
      managerSelected,
      table,
      restaurantId,
      photoIndex,
      isOpenPhotosLightbox,
      listPhotoPreviewURL,
      avatarPreviewURL,
      isOpenAvatarLightbox,
      isOpenConfirmationDialog,
      keyAvatar,
      keyListPhoto,
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
        title: language === LANGUAGES.VI ? "Tên nhà hàng" : "Restaurant's name",
        field: language === LANGUAGES.VI ? "nameVi" : "nameEn",
      },
      {
        title: language === LANGUAGES.VI ? "Tỉnh thành" : "Province",
        field:
          language === LANGUAGES.VI
            ? "provinceData.valueVi"
            : "provinceData.valueEn",
      },
      {
        title:
          language === LANGUAGES.VI ? "Người quản lý" : "Restaurant's manager",
        render: (rowData) =>
          language === LANGUAGES.VI
            ? `${rowData.managerData.lastName} ${rowData.managerData.firstName}`
            : `${rowData.managerData.firstName} ${rowData.managerData.lastName}`,
      },
      {
        title: language === LANGUAGES.VI ? "Địa chỉ" : "Address",
        field: language === LANGUAGES.VI ? "addressVi" : "addressEn",
      },
      {
        title: language === LANGUAGES.VI ? "Số bàn" : "Table",
        field: "table",
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
                this.handleEditRestaurant(rowData);
              }
              if (method === CRUD_ACTIONS.DELETE) {
                this.handleDeleteRestaurant(rowData.id);
              }
            }}
          />
        ),
      },
    ];

    return (
      <>
        <Container className="mt-3">
          <Grid>
            <Grid className="title mb-3">
              <FormattedMessage id="system.header.restaurant-management" />
            </Grid>
            <Grid>
              <ValidatorForm ref="form" onSubmit={this.handleSubmitForm}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextValidator
                      className="w-100"
                      label={
                        <span>
                          <span className="red-color"> * </span>
                          <FormattedMessage id="system.admin.restaurant-name" />{" "}
                          (VI)
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
                          <FormattedMessage id="system.admin.restaurant-name" />{" "}
                          (EN)
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
                          <FormattedMessage id="customer.auth.address" /> (VI)
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
                          <FormattedMessage id="customer.auth.address" /> (EN)
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
                      className="w-100"
                      label={
                        <span>
                          <span className="red-color"> * </span>
                          <FormattedMessage id="system.admin.province" />
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
                            <MenuItem key={item.keyMap} value={item.keyMap}>
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
                      className="w-100"
                      label={
                        <span>
                          <span className="red-color"> * </span>
                          <FormattedMessage id="system.admin.manager" />
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
                          <FormattedMessage id="system.admin.number-table" />
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
                      className="flex-center avatar-label"
                      htmlFor="avatar"
                      variant="standard"
                    >
                      Avatar
                      <i className="fas fa-upload"></i>
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
                        key={keyListPhoto}
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
                        <FormattedMessage id="customer.restaurant.photos.photo" />
                        <i className="fas fa-upload"></i>
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
                          {listPhotoPreviewURL.length}{" "}
                          <FormattedMessage id="system.admin.photo-normal" />
                        </span>
                        <span className="text">
                          <FormattedMessage id="system.admin.click-to-view-all-photo" />
                        </span>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6} className="ckeditor-container">
                    <InputLabel htmlFor="descriptionVi" className="mb-2">
                      <FormattedMessage id="system.admin.restaurant-information" />{" "}
                      (VI)
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
                    {isDescriptionViError && (
                      <span className="description-error">
                        Vui lòng nhập mô tả nhà hàng
                      </span>
                    )}
                  </Grid>
                  <Grid item xs={6} className="ckeditor-container">
                    <InputLabel htmlFor="descriptionEn" className="mb-2">
                      <FormattedMessage id="system.admin.restaurant-information" />{" "}
                      (EN)
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
                    {isDescriptionEnError && (
                      <span className="description-error">
                        Vui lòng nhập mô tả nhà hàng
                      </span>
                    )}
                  </Grid>
                </Grid>
                <Grid container spacing={1} className="mt-2">
                  <Grid item>
                    <Button
                      className="text-capitalize"
                      variant="contained"
                      color="primary"
                      type="submit"
                      onClick={() => {
                        this.isValidCkEditor();
                      }}
                    >
                      {!restaurantId ? (
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
                  text={"Bạn chắc chắn muốn xóa nhà hàng này?"}
                  isOpen={isOpenConfirmationDialog}
                  onCancelClick={this.handleCloseConfirmationDialog}
                  onConfirmClick={this.handleConfirmDelete}
                  confirm={"Xác nhận"}
                  cancel={"Hủy"}
                />
              )}
            </Grid>
            <Grid className="material-table">
              <Grid className="list-item-title mb-2">
                <FormattedMessage id="system.admin.list-restaurant" />
              </Grid>
              <MaterialTableData
                itemName={TABLE_ITEM_NAME.RESTAURANT}
                columns={columns}
                getListItem={this.fetchListRestaurant}
                localization="Không có nhà hàng nào"
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
    listManager: state.user.listUser,
    listPhoto: state.allCode.listPhoto,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllProvince: (code) => dispatch(actions.getAllProvince(code)),
    getAllManager: (data) => dispatch(actions.getListUser(data)),
    getListRestaurant: (data, language) =>
      dispatch(actions.getListRestaurant(data, language)),
    getAllPhotoByRestaurant: (objectId, restaurantId) =>
      dispatch(actions.getAllPhotoByObject(objectId, restaurantId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantManagement);
