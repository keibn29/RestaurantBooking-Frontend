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
  NUMBER_MAX_VALUE,
  DOLLAR_TO_VND,
  customReactSelectStyleSystem,
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
import ConfirmationDialog from "../../../components/ConfirmationDialog";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Select from "react-select";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
  addNewRestaurant,
  editRestaurantById,
  deleteRestaurantById,
} from "../../../services/restaurantService";
import {
  addNewDish,
  deleteDishById,
  editDishById,
} from "../../../services/dishService";

class DishManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameVi: "",
      nameEn: "",
      descriptionVi: "",
      descriptionEn: "",
      priceVi: "",
      priceEn: "",
      isDescriptionViError: false,
      isDescriptionEnError: false,
      listRestaurant: [],
      restaurantSelected: "",
      listCountry: [],
      countrySelected: "",
      avatar: "",
      isOpenAvatarLightbox: false,
      avatarPreviewURL: "",
      listPhoto: [],
      photoIndex: 0,
      isOpenPhotosLightbox: false,
      listPhotoPreviewURL: [],
      dishId: "",
      isOpenConfirmationDialog: false,
    };
  }

  componentDidMount() {
    this.props.getAllCountry(ALLCODES.COUNTRY);
    this.fetchAllRestaurant();
    // let dataSelect = this.buildDataInputSelect(this.props.AllDoctorsRedux);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listRestaurant !== this.props.listRestaurant) {
      let dataSelect = this.buildDataInputSelect(this.props.listRestaurant);
      this.setState({
        listRestaurant: dataSelect,
      });
    }
    if (prevProps.listCountry !== this.props.listCountry)
      this.setState({
        listCountry: this.props.listCountry,
      });
  }

  fetchAllRestaurant = () => {
    const { language } = this.props;
    let data = {
      pageSize: NUMBER_MAX_VALUE,
      pageOrder: 1,
    };
    this.props.getAllRestaurant(data, language);
  };

  buildDataInputSelect = (listRestaurant) => {
    const { language, userInfo } = this.props;
    let result = [];

    if (isExistArrayAndNotEmpty(listRestaurant)) {
      listRestaurant.map((item, index) => {
        let restaurant = {};

        restaurant.label =
          language === LANGUAGES.VI ? item.nameVi : item.nameEn;
        restaurant.value = item.id;

        result.push(restaurant);
        return result;
      });
    }

    return result;
  };

  handleChangeRestaurantSelected = (restaurantSelected) => {
    this.handleClearForm();
    this.setState(
      {
        restaurantSelected: restaurantSelected,
      },
      () => {
        emitter.emit(EMITTER_EVENTS.FETCH_LIST_DISH_BY_RESTAURANT);
      }
    );
  };

  handleChangeInput = (event) => {
    let copyState = { ...this.state };
    copyState[event.target.name] = event.target.value;
    this.setState({
      ...copyState,
    });
    if (event.target.name === "priceVi") {
      this.setState({
        priceEn: parseFloat(
          (Math.ceil((event.target.value / DOLLAR_TO_VND) * 2) / 2).toFixed(1)
        ),
      });
    }
    if (event.target.name === "priceEn") {
      this.setState({
        priceVi: Math.ceil((event.target.value * DOLLAR_TO_VND) / 5000) * 5000,
      });
    }
  };

  fetchListDishByRestaurant = (data) => {
    const { language } = this.props;
    const { restaurantSelected } = this.state;

    data.restaurantId = restaurantSelected.value;
    this.props.getListDishByRestaurant(data, language);
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
      restaurantSelected,
      nameVi,
      nameEn,
      countrySelected,
      priceVi,
      priceEn,
      avatar,
      listPhoto,
      descriptionVi,
      descriptionEn,
      dishId,
    } = this.state;

    let data = {
      restaurantId: restaurantSelected.value,
      nameVi,
      nameEn,
      countryId: countrySelected,
      priceVi,
      priceEn,
      avatar,
      listPhoto,
      descriptionVi,
      descriptionEn,
    };
    let isValidCkEditor = this.isValidCkEditor();

    if (isValidCkEditor) {
      if (!dishId) {
        this.callApiAddNewDish(data);
      } else {
        this.callApiEditDishById(dishId, data);
      }
    }
  };

  callApiAddNewDish = async (data) => {
    const res = await addNewDish(data);
    if (res && res.errCode === 0) {
      toast.success("Thêm mới món ăn thành công");
      this.handleClearForm();
      emitter.emit(EMITTER_EVENTS.UPDATE_TABLE_DATA);
    } else {
      toast.error(res.errMessage);
    }
  };

  callApiEditDishById = async (dishId, data) => {
    const res = await editDishById(dishId, data);
    if (res && res.errCode === 0) {
      toast.success("Thay đổi thông tin món ăn thành công");
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
      avatar: "",
      priceVi: "",
      priceEn: "",
      countrySelected: "",
      isOpenAvatarLightbox: false,
      avatarPreviewURL: "",
      listPhoto: [],
      photoIndex: 0,
      isOpenPhotosLightbox: false,
      listPhotoPreviewURL: [],
      dishId: "",
    });
    // window.location.reload(false);
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
    const { listPhoto } = this.state;
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

  handleEditRestaurant = (dishData) => {
    this.setState({
      ...dishData,
      avatarPreviewURL: process.env.REACT_APP_BACKEND_URL + dishData.avatar,
      countrySelected: dishData.countryId,
      avatar: "",
      dishId: dishData.id,
    });
  };

  handleCloseConfirmationDialog = () => {
    this.setState({
      isOpenConfirmationDialog: false,
    });
  };

  handleDeleteRestaurant = async (dishId) => {
    this.setState({
      isOpenConfirmationDialog: true,
      dishId: dishId,
    });
  };

  handleConfirmDelete = async () => {
    this.handleCloseConfirmationDialog();
    const res = await deleteDishById(this.state.dishId);
    if (res && res.errCode === 0) {
      toast.success("Xóa món ăn thành công");
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
      priceVi,
      priceEn,
      isDescriptionViError,
      isDescriptionEnError,
      listCountry,
      listRestaurant,
      restaurantSelected,
      countrySelected,
      dishId,
      listPhoto,
      photoIndex,
      isOpenPhotosLightbox,
      listPhotoPreviewURL,
      avatarPreviewURL,
      isOpenAvatarLightbox,
      isOpenConfirmationDialog,
    } = this.state;
    const { language } = this.props;
    const columns = [
      {
        title: "STT",
        width: "100",
        sorting: false,
        render: (rowData) => rowData.tableData.id + 1,
      },
      {
        title: "Tên nhà hàng",
        field:
          language === LANGUAGES.VI
            ? "restaurantData.nameVi"
            : "restaurantData.nameEn",
      },
      {
        title: "Tên món ăn",
        field: language === LANGUAGES.VI ? "nameVi" : "nameEn",
      },
      {
        title: "Quốc gia",
        field:
          language === LANGUAGES.VI
            ? "countryData.valueVi"
            : "countryData.valueEn",
      },
      {
        title: "Đơn giá",
        field: language === LANGUAGES.VI ? "priceVi" : "priceEn",
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
            <Grid className="title mb-3">Quản lý món ăn</Grid>
            <Grid>
              <ValidatorForm ref="form" onSubmit={this.handleSubmitForm}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Select
                      className="w-25 mb-4 react-select"
                      value={restaurantSelected}
                      onChange={this.handleChangeRestaurantSelected}
                      options={listRestaurant}
                      placeholder={
                        <span>
                          <span className="red-color"> * </span>
                          Nhà hàng
                        </span>
                      }
                      styles={customReactSelectStyleSystem}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextValidator
                      className="w-100"
                      label={
                        <span>
                          <span className="red-color"> * </span>
                          Tên món ăn (VI)
                        </span>
                      }
                      onChange={(event) => {
                        this.handleChangeInput(event);
                      }}
                      type="text"
                      name="nameVi"
                      value={nameVi}
                      validators={["required"]}
                      errorMessages={["Vui lòng nhập tên món ăn"]}
                      variant="outlined"
                      size="small"
                      disabled={restaurantSelected.value ? false : true}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextValidator
                      className="w-100"
                      label={
                        <span>
                          <span className="red-color"> * </span>
                          Tên món ăn (EN)
                        </span>
                      }
                      onChange={(event) => {
                        this.handleChangeInput(event);
                      }}
                      type="text"
                      name="nameEn"
                      value={nameEn}
                      validators={["required"]}
                      errorMessages={["Vui lòng nhập tên món ăn"]}
                      variant="outlined"
                      size="small"
                      disabled={restaurantSelected.value ? false : true}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <SelectValidator
                      className="w-100"
                      label={
                        <span>
                          <span className="red-color"> * </span>
                          Quốc gia
                        </span>
                      }
                      onChange={(event) => {
                        this.handleChangeInput(event);
                      }}
                      name="countrySelected"
                      value={countrySelected}
                      validators={["required"]}
                      errorMessages={["Vui lòng chọn quốc gia"]}
                      variant="outlined"
                      size="small"
                      disabled={restaurantSelected.value ? false : true}
                    >
                      {isExistArrayAndNotEmpty(listCountry) &&
                        listCountry.map((item) => {
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
                  <Grid item xs={4}>
                    <TextValidator
                      className="w-100"
                      label={
                        <span>
                          <span className="red-color"> * </span>
                          Đơn giá (VND)
                        </span>
                      }
                      onChange={(event) => {
                        this.handleChangeInput(event);
                      }}
                      type="number"
                      name="priceVi"
                      value={priceVi}
                      validators={["required"]}
                      errorMessages={["Vui lòng nhập giá của món ăn"]}
                      variant="outlined"
                      size="small"
                      disabled={
                        restaurantSelected.value && language === LANGUAGES.VI
                          ? false
                          : true
                      }
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextValidator
                      className="w-100"
                      label={
                        <span>
                          <span className="red-color"> * </span>
                          Đơn giá ($)
                        </span>
                      }
                      onChange={(event) => {
                        this.handleChangeInput(event);
                      }}
                      type="number"
                      name="priceEn"
                      value={priceEn}
                      validators={["required"]}
                      errorMessages={["Vui lòng nhập giá của món ăn"]}
                      variant="outlined"
                      size="small"
                      disabled={
                        restaurantSelected.value && language === LANGUAGES.EN
                          ? false
                          : true
                      }
                    />
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
                      disabled={restaurantSelected.value ? false : true}
                    />
                    <InputLabel
                      className={
                        restaurantSelected.value
                          ? "flex-center avatar-label"
                          : "flex-center avatar-label no-effect"
                      }
                      htmlFor="avatar"
                      variant="standard"
                      disabled={restaurantSelected.value ? false : true}
                    >
                      Avatar
                      <i className="fas fa-upload"></i>
                    </InputLabel>
                  </Grid>
                  <Grid item xs={2} className="avatar-preview-grid">
                    <Grid
                      className="dish avatar-preview background-image-center-cover"
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
                    className="photo-container dish"
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
                        disabled={restaurantSelected.value ? false : true}
                      />
                      <InputLabel
                        className={
                          restaurantSelected.value
                            ? "flex-center photo-label"
                            : "flex-center photo-label no-effect"
                        }
                        htmlFor="listPhoto"
                        variant="standard"
                        disabled={restaurantSelected.value ? false : true}
                      >
                        Photos
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
                          {listPhoto.length} photos
                        </span>
                        <span className="text">Click to view all photos</span>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6} className="ckeditor-container">
                    <InputLabel htmlFor="descriptionVi">
                      Thông tin món ăn (VI)
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
                      disabled={restaurantSelected.value ? false : true}
                    />
                    {isDescriptionViError && (
                      <span className="description-error">
                        Vui lòng nhập thông tin mô tả món ăn
                      </span>
                    )}
                  </Grid>
                  <Grid item xs={6} className="ckeditor-container">
                    <InputLabel htmlFor="descriptionEn">
                      Thông tin món ăn (EN)
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
                      disabled={restaurantSelected.value ? false : true}
                    />
                    {isDescriptionEnError && (
                      <span className="description-error">
                        Vui lòng nhập thông tin mô tả món ăn
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
                      {!dishId ? "Thêm" : "Sửa"}
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
              <MaterialTableData
                itemName="dish"
                columns={columns}
                getListItem={this.fetchListDishByRestaurant}
                localization={
                  !restaurantSelected.value
                    ? "Vui lòng chọn nhà hàng để xem danh sách món ăn"
                    : "Nhà hàng chưa có món ăn nào"
                }
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
    listRestaurant: state.restaurant.listRestaurant,
    listCountry: state.allCode.listCountry,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllRestaurant: (data, language) =>
      dispatch(actions.getListRestaurant(data, language)),
    getAllCountry: (code) => dispatch(actions.getAllCountry(code)),
    getListDishByRestaurant: (data, language) =>
      dispatch(actions.getListDish(data, language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DishManagement);
