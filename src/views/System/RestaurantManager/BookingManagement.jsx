import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./BookingManagement.scss";
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
  CUSTOMER_ACTIONS,
  LIST_STATUS,
  GENERAL_STATUS,
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
import MaterialTable from "material-table";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import { eachDayOfInterval } from "date-fns";
import {
  ValidatorForm,
  TextValidator,
  SelectValidator,
} from "react-material-ui-form-validator";
import { toast } from "react-toastify";
import ConfirmationDialog from "../../../components/ConfirmationDialog";
import Select from "react-select";
import {
  bulkCreateNewSchedule,
  cancelBookingTable,
  confirmOrDoneBookingTable,
} from "../../../services/restaurantService";
import CustomerAction from "../../../components/CustomerAction";
import DetailBookingDialog from "./DetailBookingDialog";

class BookingManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listRestaurant: [],
      restaurantSelected: "",
      date: new Date().setHours(0, 0, 0, 0),
      listBooking: [],
      totalBooking: 0,
      pageSize: 10,
      pageIndex: 0,
      isOpenDetailBookingDialog: false,
      bookingSelected: {},
      bookingId: "",
      method: "",
      listGeneralStatus: [],
      generalStatusSelected: "",
      isOpenConfirmationDialog: false,
      confirmMessage: "",
    };
  }

  componentDidMount() {
    this.fetchAllRestaurant();
    const listGeneralStatus = this.buildDataStatusSelect();
    this.setState({
      listGeneralStatus: listGeneralStatus,
      generalStatusSelected: listGeneralStatus[0],
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listRestaurant !== this.props.listRestaurant) {
      let dataSelect = this.buildDataRestaurantSelect(
        this.props.listRestaurant
      );
      this.setState({
        listRestaurant: dataSelect,
      });
    }
    if (prevProps.listBooking !== this.props.listBooking) {
      this.setState({
        listBooking: this.props.listBooking,
        totalBooking: this.props.totalBooking,
      });
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

  buildDataRestaurantSelect = (listRestaurant) => {
    const { language, userInfo } = this.props;
    let result = [];

    if (isExistArrayAndNotEmpty(listRestaurant)) {
      listRestaurant.map((item) => {
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

  buildDataStatusSelect = () => {
    const slackingObj = {
      label: "Đơn chưa hoàn thành",
      value: GENERAL_STATUS.SLACKING,
    };
    const doneObj = { label: "Đơn đã hoàn thành", value: GENERAL_STATUS.DONE };

    return [slackingObj, doneObj];
  };

  handleChangeDatePicker = (date) => {
    this.setState(
      {
        date: new Date(date).getTime(),
        generalStatusSelected: this.state.listGeneralStatus[0],
      },
      () => {
        if (this.state.restaurantSelected.value) {
          this.fetchListTableBooking();
        }
      }
    );
  };

  handleChangeRestaurantSelected = (restaurantSelected) => {
    this.setState(
      {
        restaurantSelected: restaurantSelected,
        generalStatusSelected: this.state.listGeneralStatus[0],
      },
      () => {
        this.fetchListTableBooking();
      }
    );
  };

  handleChangeGeneralStatus = (generalStatus) => {
    this.setState(
      {
        generalStatusSelected: generalStatus,
      },
      () => {
        if (this.state.restaurantSelected.value) {
          this.fetchListTableBooking();
        }
      }
    );
  };

  handleChangePageSize = (event) => {
    this.setState(
      {
        pageSize: event.target.value,
        pageIndex: 0,
      },
      () => {
        if (this.state.restaurantSelected.value) {
          this.fetchListTableBooking();
        }
      }
    );
  };

  handleChangePageIndex = (event, newPage) => {
    this.setState(
      {
        pageIndex: newPage,
      },
      () => {
        if (this.state.restaurantSelected.value) {
          this.fetchListTableBooking();
        }
      }
    );
  };

  fetchListTableBooking = () => {
    const {
      restaurantSelected,
      date,
      pageSize,
      pageIndex,
      generalStatusSelected,
    } = this.state;
    let data = {
      restaurantId: restaurantSelected.value,
      date,
      pageSize,
      pageOrder: pageIndex + 1,
      generalStatus: generalStatusSelected.value,
    };
    this.props.getListTableBooking(data);
  };

  handleTableBooking = (bookingData, method) => {
    if (method === CUSTOMER_ACTIONS.DETAIL) {
      this.setState({
        isOpenDetailBookingDialog: true,
        bookingSelected: bookingData,
        method: method,
      });
    } else {
      this.setState({
        isOpenConfirmationDialog: true,
        bookingId: bookingData.id,
        method: method,
      });
      this.setCofirmationMessage(method);
    }
  };

  setCofirmationMessage = (method) => {
    if (method === CUSTOMER_ACTIONS.CONFIRM) {
      this.setState({
        confirmMessage: "Xác nhận đơn đặt bàn đúng thông tin?",
      });
    } else if (method === CUSTOMER_ACTIONS.DONE) {
      this.setState({
        confirmMessage: "Xác nhận khách hàng đã dùng bữa?",
      });
    } else {
      this.setState({
        confirmMessage: "Xác nhận huỷ đơn đặt bàn này?",
      });
    }
  };

  handleCloseDetailBookingDialog = () => {
    this.setState({
      isOpenDetailBookingDialog: false,
    });
  };

  handleCloseConfirmationDialog = () => {
    this.setState({
      isOpenConfirmationDialog: false,
    });
  };

  handleConfirm = async () => {
    this.handleCloseConfirmationDialog();
    const { method, bookingId } = this.state;
    if (method === CUSTOMER_ACTIONS.CONFIRM) {
      this.callApiConfirmOrDoneBookingTable(bookingId, LIST_STATUS.VERIFIED);
    } else if (method === CUSTOMER_ACTIONS.DONE) {
      this.callApiConfirmOrDoneBookingTable(bookingId, LIST_STATUS.CONFIRMED);
    } else {
      this.callApiCancelBookingTable(bookingId);
    }
  };

  callApiConfirmOrDoneBookingTable = async (bookingId, statusId) => {
    const res = await confirmOrDoneBookingTable(bookingId, statusId);
    if (res && res.errCode === 0) {
      toast.success("Xác nhận thành công");
      this.fetchListTableBooking();
    } else {
      toast.error(res.errMessage);
    }
  };

  callApiCancelBookingTable = async (bookingId) => {
    const res = await cancelBookingTable(bookingId);
    if (res && res.errCode === 0) {
      toast.success("Hủy đơn đặt bàn thành công");
      this.fetchListTableBooking();
    } else {
      toast.error(res.errMessage);
    }
  };

  render() {
    const { language } = this.props;
    const {
      restaurantSelected,
      date,
      listRestaurant,
      listBooking,
      totalBooking,
      pageSize,
      pageIndex,
      isOpenDetailBookingDialog,
      bookingSelected,
      listGeneralStatus,
      generalStatusSelected,
      isOpenConfirmationDialog,
      confirmMessage,
    } = this.state;
    const columns = [
      {
        title: "STT",
        width: "100",
        sorting: false,
        render: (rowData) => rowData.tableData.id + 1,
      },
      {
        title: "Tên khách hàng",
        render: (rowData) =>
          language === LANGUAGES.VI
            ? `${rowData.customerData.lastName} ${rowData.customerData.firstName}`
            : `${rowData.customerData.firstName} ${rowData.customerData.lastName}`,
      },
      {
        title: "Số điện thoại",
        field: "customerData.phone",
      },
      {
        title: "Thời gian",
        field:
          language === LANGUAGES.VI
            ? "timeTypeData.valueVi"
            : "timeTypeData.valueEn",
      },
      {
        title: "Trạng thái",
        field:
          language === LANGUAGES.VI
            ? "statusData.valueVi"
            : "statusData.valueEn",
      },
      {
        title: "Action",
        align: "center",
        headerStyle: {
          textAlign: "center",
        },
        cellStyle: {
          textAlign: "center",
        },
        sorting: false,
        render: (rowData) => (
          <CustomerAction
            item={rowData}
            onSelect={(rowData, method) => {
              this.handleTableBooking(rowData, method);
            }}
          />
        ),
      },
    ];

    return (
      <>
        <Container className="mt-3">
          <Grid className="customer-management-container">
            <Grid className="title mb-3">Quản lý đơn đặt bàn</Grid>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Select
                  className="w-100 react-select"
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
              <Grid item xs={5} className="date-picker">
                <Flatpickr
                  ref={(fp) => {
                    this.fp = fp;
                  }}
                  onChange={([date]) => {
                    this.handleChangeDatePicker(date);
                  }}
                  value={date}
                  options={{
                    defaultDate: "today",
                    dateFormat: "d/m/Y",
                    locale: {
                      firstDayOfWeek: 1,
                    },
                    monthSelectorType: "static",
                    position: "auto center",
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <Select
                  className="w-100 react-select"
                  value={generalStatusSelected}
                  onChange={this.handleChangeGeneralStatus}
                  options={listGeneralStatus}
                  styles={customReactSelectStyleSystem}
                />
              </Grid>
            </Grid>
            <Grid className="mt-5">
              <MaterialTable
                columns={columns}
                data={listBooking}
                options={{
                  draggable: false,
                  toolbar: false,
                  search: false,
                  paging: false,
                  padding: "dense",
                  headerStyle: {
                    backgroundColor: "#7265EB",
                    color: "#fff",
                    fontSize: "16px",
                  },
                  rowStyle: (rowData) => ({
                    fontSize: "16px",
                    backgroundColor:
                      rowData.statusId === LIST_STATUS.VERIFIED
                        ? "#fff"
                        : "#eee",
                  }),
                  maxBodyHeight: "100vh",
                  minBodyHeight: "400px",
                }}
                localization={{
                  body: {
                    emptyDataSourceMessage: (
                      <Grid
                        container
                        justify="center"
                        alignItems="center"
                        style={{
                          height: "362px",
                          fontSize: "16px",
                        }}
                      >
                        {!restaurantSelected.value
                          ? "Vui lòng chọn nhà hàng để xem danh sách đơn đặt bàn"
                          : "Không có đơn đặt bàn nào trong ngày"}
                      </Grid>
                    ),
                  },
                }}
              />
              <TablePagination
                component="div"
                labelRowsPerPage={
                  <span className="text-15">Số hàng mỗi trang</span>
                }
                labelDisplayedRows={({ from, to, count }) => (
                  <span className="text-15">{`${from}-${to} trong ${count}`}</span>
                )}
                SelectProps={{
                  style: {
                    fontSize: 15,
                  },
                }}
                rowsPerPageOptions={[1, 2, 5, 10, 25, 50]}
                count={totalBooking}
                rowsPerPage={pageSize}
                page={pageIndex}
                onChangeRowsPerPage={this.handleChangePageSize}
                onChangePage={this.handleChangePageIndex}
              />
            </Grid>
          </Grid>
          {isOpenDetailBookingDialog && (
            <DetailBookingDialog
              isOpen={isOpenDetailBookingDialog}
              handleCloseDialog={this.handleCloseDetailBookingDialog}
              bookingData={bookingSelected}
            />
          )}
          {isOpenConfirmationDialog && (
            <ConfirmationDialog
              title={"Xác nhận"}
              text={confirmMessage}
              isOpen={isOpenConfirmationDialog}
              onCancelClick={this.handleCloseConfirmationDialog}
              onConfirmClick={this.handleConfirm}
              confirm={"Xác nhận"}
              cancel={"Hủy"}
            />
          )}
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    listRestaurant: state.restaurant.listRestaurant,
    listBooking: state.restaurant.listBooking,
    totalBooking: state.restaurant.totalBooking,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllRestaurant: (data, language) =>
      dispatch(actions.getListRestaurant(data, language)),
    getListTableBooking: (data) => dispatch(actions.getListTableBooking(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingManagement);
