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
  LIST_DISH_TYPE,
  TABLE_ITEM_NAME,
  OBJECT,
  buildRestaurantReactSelect,
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
import Select from "react-select";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
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
      listDishType: [],
      dishTypeSelected: "",
      dishTypeSelectedToGetListDish: LIST_DISH_TYPE.FOOD,
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
      keyAvatar: Date.now(),
      keyListPhoto: Date.now(),
    };
  }

  componentDidMount() {
    this.props.getAllCountry(ALLCODES.COUNTRY);
    this.props.getAllDishType(ALLCODES.DISH);
    this.fetchAllRestaurant();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listRestaurant !== this.props.listRestaurant) {
      this.getListRestaurantForReactSelect();
    }
    if (prevProps.language !== this.props.language) {
      this.getListRestaurantForReactSelect();
    }
    if (
      prevState.listRestaurant !== this.state.listRestaurant &&
      this.state.restaurantSelected
    ) {
      let dataSelect = buildRestaurantReactSelect(
        this.props.listRestaurant,
        this.props.language
      );
      const newRestaurantSelected = dataSelect.find(
        (item) => item.value === this.state.restaurantSelected.value
      );
      this.setState({
        restaurantSelected: newRestaurantSelected,
      });
    }
    if (prevProps.listCountry !== this.props.listCountry) {
      this.setState({
        listCountry: this.props.listCountry,
      });
    }
    if (prevProps.listDishType !== this.props.listDishType) {
      this.setState({
        listDishType: this.props.listDishType,
      });
    }
    if (prevProps.listPhoto !== this.props.listPhoto) {
      this.getListPhotoPreviewURL();
    }
  }

  fetchAllRestaurant = () => {
    const { language } = this.props;
    let data = {
      pageSize: NUMBER_MAX_VALUE,
      pageOrder: 1,
    };
    this.props.getAllRestaurant(data, language);
  };

  getListRestaurantForReactSelect = () => {
    const { listRestaurant, language, userInfo } = this.props;
    let dataSelect = buildRestaurantReactSelect(
      listRestaurant,
      language,
      userInfo
    );
    if (userInfo?.roleId === USER_ROLE.RESTAURANT_MANAGER) {
      this.setState(
        {
          listRestaurant: dataSelect,
          restaurantSelected: dataSelect[0],
        },
        () => {
          emitter.emit(EMITTER_EVENTS.FETCH_LIST_DISH_BY_RESTAURANT);
        }
      );
    } else {
      this.setState({
        listRestaurant: dataSelect,
      });
    }
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

  handleChangeRestaurantSelected = (restaurantSelected) => {
    this.handleClearForm();
    this.setState(
      {
        restaurantSelected: restaurantSelected,
        dishTypeSelectedToGetListDish: LIST_DISH_TYPE.FOOD,
      },
      () => {
        emitter.emit(EMITTER_EVENTS.FETCH_LIST_DISH_BY_RESTAURANT);
      }
    );
  };

  handleChangeInput = (event) => {
    let copyState = { ...this.state };
    copyState[event.target.name] = event.target.value;
    this.setState(
      {
        ...copyState,
      },
      () => {
        if (event.target.name === "dishTypeSelectedToGetListDish") {
          emitter.emit(EMITTER_EVENTS.UPDATE_TABLE_DATA);
        }
      }
    );
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

    if (restaurantSelected.value) {
      data.restaurantId = restaurantSelected.value;
      data.dishType = this.state.dishTypeSelectedToGetListDish;
      this.props.getListDishByRestaurant(data, language);
    }
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
      dishTypeSelected,
      countrySelected,
      priceVi,
      priceEn,
      avatar,
      listPhoto,
      descriptionVi,
      descriptionEn,
      dishId,
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
    formData.append("restaurantId", restaurantSelected.value);
    formData.append("nameVi", nameVi);
    formData.append("nameEn", nameEn);
    formData.append("dishType", dishTypeSelected);
    formData.append("countryId", countrySelected);
    formData.append("priceVi", priceVi);
    formData.append("priceEn", priceEn);
    formData.append("descriptionVi", descriptionVi);
    formData.append("descriptionEn", descriptionEn);

    let isValidCkEditor = this.isValidCkEditor();

    if (isValidCkEditor) {
      if (!dishId) {
        this.callApiAddNewDish(formData);
      } else {
        this.callApiEditDishById(dishId, formData);
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
      dishTypeSelected: "",
      countrySelected: "",
      isOpenAvatarLightbox: false,
      avatarPreviewURL: "",
      listPhoto: [],
      photoIndex: 0,
      isOpenPhotosLightbox: false,
      listPhotoPreviewURL: [],
      dishId: "",
      keyAvatar: Date.now(),
      keyListPhoto: Date.now(),
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

  handleEditRestaurant = (dishData) => {
    this.props.getAllPhotoByDish(OBJECT.DISH, dishData.id);
    this.setState({
      ...dishData,
      avatarPreviewURL: process.env.REACT_APP_BACKEND_URL + dishData.avatar,
      dishTypeSelected: dishData.dishType,
      countrySelected: dishData.countryId,
      avatar: "",
      listPhoto: [],
      dishId: dishData.id,
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
    const { language, userInfo } = this.props;
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
      listDishType,
      listRestaurant,
      restaurantSelected,
      countrySelected,
      dishTypeSelected,
      dishTypeSelectedToGetListDish,
      dishId,
      photoIndex,
      isOpenPhotosLightbox,
      listPhotoPreviewURL,
      avatarPreviewURL,
      isOpenAvatarLightbox,
      isOpenConfirmationDialog,
      keyAvatar,
      keyListPhoto,
    } = this.state;
    const columns = [
      {
        title: language === LANGUAGES.VI ? "STT" : "NO",
        field: "no",
        width: "100",
        sorting: false,
      },
      {
        title: language === LANGUAGES.VI ? "Tên nhà hàng" : "Restaurant's name",
        field:
          language === LANGUAGES.VI
            ? "restaurantData.nameVi"
            : "restaurantData.nameEn",
      },
      {
        title: language === LANGUAGES.VI ? "Loại" : "Type",
        field:
          language === LANGUAGES.VI
            ? "dishTypeData.valueVi"
            : "dishTypeData.valueEn",
      },
      {
        title: language === LANGUAGES.VI ? "Tên món ăn" : "Dish's name",
        field: language === LANGUAGES.VI ? "nameVi" : "nameEn",
      },
      {
        title: language === LANGUAGES.VI ? "Xuất sứ" : "Originated",
        field:
          language === LANGUAGES.VI
            ? "countryData.valueVi"
            : "countryData.valueEn",
      },
      {
        title: language === LANGUAGES.VI ? "Đơn giá" : "Price",
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

    const localizationVi = !restaurantSelected.value
      ? "Vui lòng chọn nhà hàng để xem danh sách món ăn"
      : "Nhà hàng chưa có món ăn nào";
    const localizationEn = !restaurantSelected.value
      ? "Please select a restaurant to see the list of dishes"
      : "The restaurant has no dishes yet";
    const localization =
      language === LANGUAGES.VI ? localizationVi : localizationEn;

    return (
      <>
        <Container className="mt-3">
          <Grid>
            <Grid className="title mb-3">
              {" "}
              <FormattedMessage id="system.header.dish-management" />
            </Grid>
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
                          <FormattedMessage id="system.header.restaurant" />
                        </span>
                      }
                      styles={customReactSelectStyleSystem}
                      isDisabled={
                        userInfo?.roleId === USER_ROLE.RESTAURANT_MANAGER
                          ? true
                          : false
                      }
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <SelectValidator
                      className="w-100"
                      label={
                        <span>
                          <span className="red-color"> * </span>
                          <FormattedMessage id="system.admin.dish-type" />
                        </span>
                      }
                      onChange={(event) => {
                        this.handleChangeInput(event);
                      }}
                      name="dishTypeSelected"
                      value={dishTypeSelected}
                      validators={["required"]}
                      errorMessages={["Vui lòng chọn loại món ăn"]}
                      variant="outlined"
                      size="small"
                      disabled={restaurantSelected.value ? false : true}
                    >
                      {isExistArrayAndNotEmpty(listDishType) &&
                        listDishType.map((item) => {
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
                  <Grid item xs={4}>
                    <TextValidator
                      className="w-100"
                      label={
                        <span>
                          <span className="red-color"> * </span>
                          <FormattedMessage id="system.admin.dish-name" /> (VI)
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
                          <FormattedMessage id="system.admin.dish-name" /> (EN)
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
                          <FormattedMessage id="customer.search.country" />
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
                    <TextValidator
                      className="w-100"
                      label={
                        <span>
                          <span className="red-color"> * </span>
                          <FormattedMessage id="system.admin.price" /> (VND)
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
                  <Grid item xs={2}>
                    <TextValidator
                      className="w-100"
                      label={
                        <span>
                          <span className="red-color"> * </span>
                          <FormattedMessage id="system.admin.price" /> ($)
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
                      key={keyAvatar}
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
                      <FormattedMessage id="system.admin.dish-information" />{" "}
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
                      disabled={restaurantSelected.value ? false : true}
                    />
                    {isDescriptionViError && (
                      <span className="description-error">
                        Vui lòng nhập thông tin mô tả món ăn
                      </span>
                    )}
                  </Grid>
                  <Grid item xs={6} className="ckeditor-container">
                    <InputLabel htmlFor="descriptionEn" className="mb-2">
                      <FormattedMessage id="system.admin.dish-information" />{" "}
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
                      {!dishId ? (
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
            <Grid className="material-table mt-5" container spacing={2}>
              <Grid item xs={12} className="list-item-title">
                <FormattedMessage id="system.admin.list-dish" />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  select
                  className="w-100"
                  label={<FormattedMessage id="system.admin.dish-type" />}
                  onChange={(event) => {
                    this.handleChangeInput(event);
                  }}
                  name="dishTypeSelectedToGetListDish"
                  value={dishTypeSelectedToGetListDish}
                  variant="outlined"
                  size="small"
                  disabled={restaurantSelected.value ? false : true}
                >
                  {isExistArrayAndNotEmpty(listDishType) &&
                    listDishType.map((item) => {
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
                  itemName={TABLE_ITEM_NAME.DISH}
                  columns={columns}
                  getListItem={this.fetchListDishByRestaurant}
                  localization={localization}
                />
              </Grid>
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
    userInfo: state.user.userInfo,
    listRestaurant: state.restaurant.listRestaurant,
    listCountry: state.allCode.listCountry,
    listDishType: state.allCode.listDishType,
    listPhoto: state.allCode.listPhoto,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllRestaurant: (data, language) =>
      dispatch(actions.getListRestaurant(data, language)),
    getAllCountry: (code) => dispatch(actions.getAllCountry(code)),
    getAllDishType: (code) => dispatch(actions.getAllDishType(code)),
    getListDishByRestaurant: (data, language) =>
      dispatch(actions.getListDish(data, language)),
    getAllPhotoByDish: (objectId, dishId) =>
      dispatch(actions.getAllPhotoByObject(objectId, dishId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DishManagement);
