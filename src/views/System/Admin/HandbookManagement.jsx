import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./Management.scss";
import * as actions from "../../../store/actions";
import {
  CRUD_ACTIONS,
  LANGUAGES,
  emitter,
  EMITTER_EVENTS,
  TABLE_ITEM_NAME,
} from "../../../utils";
import {
  Grid,
  Button,
  TextField,
  InputLabel,
  Container,
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { toast } from "react-toastify";
import MaterialTableAction from "../../../components/MaterialTableAction";
import MaterialTableData from "./MaterialTableData";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import ConfirmationDialog from "../../../components/ConfirmationDialog";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
  addNewHandbook,
  deleteHandbookById,
  editHandbookById,
} from "../../../services/handbookService";

class HandBookManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleVi: "",
      titleEn: "",
      descriptionVi: "",
      descriptionEn: "",
      avatar: "",
      keyAvatar: Date.now(),
      avatarPreviewURL: "",
      isOpenLightbox: false,
      handbookId: "",
      isOpenConfirmationDialog: false,
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {}

  fetchListHandbook = (data) => {
    this.props.getListHandbook(data);
  };

  isValidCkEditor = () => {
    const { descriptionVi, descriptionEn } = this.state;
    let isValid = true;

    if (!descriptionVi) {
      isValid = false;
      this.setState({
        isDetailViError: true,
      });
    } else {
      this.setState({
        isDetailViError: false,
      });
    }

    if (!descriptionEn) {
      isValid = false;
      this.setState({
        isDetailEnError: true,
      });
    } else {
      this.setState({
        isDetailEnError: false,
      });
    }

    return isValid;
  };

  handleSubmitForm = () => {
    const {
      titleVi,
      titleEn,
      descriptionVi,
      descriptionEn,
      avatar,
      handbookId,
    } = this.state;

    let data = {
      titleVi,
      titleEn,
      descriptionVi,
      descriptionEn,
      avatar,
    };

    let isValidCkEditor = this.isValidCkEditor();
    if (isValidCkEditor) {
      if (!handbookId) {
        this.callApiAddNewHandbook(data);
      } else {
        this.callApiEditHandbookById(handbookId, data);
      }
    }
  };

  callApiAddNewHandbook = async (data) => {
    const res = await addNewHandbook(data);
    if (res && res.errCode === 0) {
      toast.success("Thêm mới bài đăng thành công");
      this.handleClearForm();
      emitter.emit(EMITTER_EVENTS.UPDATE_TABLE_DATA);
    } else {
      toast.error(res.errMessage);
    }
  };

  callApiEditHandbookById = async (handbookId, data) => {
    const res = await editHandbookById(handbookId, data);
    if (res && res.errCode === 0) {
      toast.success("Thay đổi thông tin bài đăng thành công");
      this.handleClearForm();
      emitter.emit(EMITTER_EVENTS.UPDATE_TABLE_DATA);
    } else {
      toast.error(res.errMessage);
    }
  };

  handleClearForm = () => {
    this.setState({
      titleVi: "",
      titleEn: "",
      descriptionVi: "",
      descriptionEn: "",
      avatar: "",
      isOpenAvatarLightbox: false,
      avatarPreviewURL: "",
      handbookId: "",
      keyAvatar: Date.now(),
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

  handleChangeEditor = (event, data, name) => {
    let copyState = { ...this.state };
    copyState[name] = data;
    this.setState({
      ...copyState,
    });
  };

  handleEditHandbook = (handbookData) => {
    this.setState({
      ...handbookData,
      avatarPreviewURL: process.env.REACT_APP_BACKEND_URL + handbookData.image,
      avatar: "",
      handbookId: handbookData.id,
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

  handleDeleteRestaurant = async (handbookId) => {
    this.setState({
      isOpenConfirmationDialog: true,
      handbookId: handbookId,
    });
  };

  handleConfirmDelete = async () => {
    this.handleCloseConfirmationDialog();
    const res = await deleteHandbookById(this.state.handbookId);
    if (res && res.errCode === 0) {
      toast.success("Xóa bài đăng thành công");
      this.handleClearForm();
      emitter.emit(EMITTER_EVENTS.UPDATE_TABLE_DATA);
    } else {
      toast.error(res.errMessage);
    }
  };

  render() {
    const {
      titleVi,
      titleEn,
      descriptionVi,
      descriptionEn,
      isDetailViError,
      isDetailEnError,
      handbookId,
      avatarPreviewURL,
      keyAvatar,
      isOpenAvatarLightbox,
      isOpenConfirmationDialog,
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
        title:
          language === LANGUAGES.VI
            ? "Tiêu đề bài đăng (VI)"
            : "Handbook's title (VI)",
        field: "titleVi",
        cellStyle: {
          maxWidth: 150,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
      },
      {
        title:
          language === LANGUAGES.VI
            ? "Tiêu đề bài đăng (VI)"
            : "Handbook's title (EN)",
        field: "titleEn",
        cellStyle: {
          maxWidth: 150,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
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
                this.handleEditHandbook(rowData);
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
              <FormattedMessage id="system.header.handbook-management" />
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
                          <FormattedMessage id="system.admin.handbook-title" />{" "}
                          (VI)
                        </span>
                      }
                      onChange={(event) => {
                        this.handleChangeInput(event);
                      }}
                      type="text"
                      name="titleVi"
                      value={titleVi}
                      validators={["required"]}
                      errorMessages={["Vui lòng nhập tiêu đề bài đăng"]}
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
                          <FormattedMessage id="system.admin.handbook-title" />{" "}
                          (EN)
                        </span>
                      }
                      onChange={(event) => {
                        this.handleChangeInput(event);
                      }}
                      type="text"
                      name="titleEn"
                      value={titleEn}
                      validators={["required"]}
                      errorMessages={["Vui lòng nhập tiêu đề bài đăng"]}
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    className="photo-container handbook"
                    container
                  >
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
                        <FormattedMessage id="customer.restaurant.photos.photo" />
                        <i className="fas fa-upload"></i>
                      </InputLabel>
                    </Grid>
                    <Grid item xs={4} className="avatar-preview-grid">
                      <Grid
                        className="handbook avatar-preview background-image-center-cover"
                        style={{ backgroundImage: `url(${avatarPreviewURL})` }}
                        onClick={() => {
                          this.handleShowHideAvatarLightbox("open");
                        }}
                      ></Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6} className="ckeditor-container">
                    <InputLabel htmlFor="descriptionVi" className="mb-2">
                      <FormattedMessage id="system.admin.handbook-content" />{" "}
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
                    {isDetailViError && (
                      <span className="description-error">
                        Vui lòng nội dung bài đăng
                      </span>
                    )}
                  </Grid>
                  <Grid item xs={6} className="ckeditor-container">
                    <InputLabel htmlFor="descriptionEn" className="mb-2">
                      <FormattedMessage id="system.admin.handbook-content" />{" "}
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
                    {isDetailEnError && (
                      <span className="description-error">
                        Vui lòng nội dung bài đăng
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
                      {!handbookId ? (
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
                  text={"Bạn chắc chắn muốn bài đăng hàng này?"}
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
                <FormattedMessage id="system.admin.list-handbook" />
              </Grid>
              <MaterialTableData
                itemName={TABLE_ITEM_NAME.HANDBOOK}
                columns={columns}
                getListItem={this.fetchListHandbook}
                localization={
                  language === LANGUAGES.VI
                    ? "Không có bài đăng nào"
                    : "No posts"
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
  return {
    getListHandbook: (data) => dispatch(actions.getListHandbook(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HandBookManagement);
