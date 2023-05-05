import React, { Component } from "react";
import { connect } from "react-redux";
import "./BookingManagement.scss";
import * as actions from "../../../store/actions";
import {
  LANGUAGES,
  USER_ROLE,
  NUMBER_MAX_VALUE,
  customReactSelectStyleSystem,
  CUSTOMER_ACTIONS,
  LIST_STATUS,
  GENERAL_STATUS,
  buildRestaurantReactSelect,
} from "../../../utils";
import { Grid, TablePagination, Container } from "@material-ui/core";
import MaterialTable from "material-table";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import { toast } from "react-toastify";
import ConfirmationDialog from "../../../components/ConfirmationDialog";
import Select from "react-select";
import {
  cancelBookingTable,
  confirmBookingTable,
} from "../../../services/restaurantService";
import CustomerAction from "../../../components/CustomerAction";
import DetailBookingDialog from "./DetailBookingDialog";
import BillEmailDialog from "./BillEmailDialog";

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
      isOpenBillEmailDialog: false,
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
          this.fetchListTableBooking();
        }
      );
    } else {
      this.setState({
        listRestaurant: dataSelect,
      });
    }
  };

  buildDataStatusSelect = () => {
    const slacking = {
      label: "Đơn chưa hoàn thành",
      value: GENERAL_STATUS.SLACKING,
    };
    const done = { label: "Đơn đã hoàn thành", value: GENERAL_STATUS.DONE };
    const overdue = {
      label: "Đơn quá thời hạn",
      value: GENERAL_STATUS.OVERDUE,
    };

    return [slacking, done, overdue];
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
      });
    } else if (method === CUSTOMER_ACTIONS.DONE) {
      this.setState({
        isOpenBillEmailDialog: true,
        bookingSelected: bookingData,
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
    } else {
      this.setState({
        confirmMessage: "Xác nhận huỷ đơn đặt bàn này?",
      });
    }
  };

  handleCloseDialog = () => {
    this.setState({
      isOpenDetailBookingDialog: false,
      isOpenBillEmailDialog: false,
    });
    this.fetchListTableBooking();
  };

  handleCloseConfirmationDialog = () => {
    this.setState({
      isOpenConfirmationDialog: false,
    });
  };

  handleConfirmYesClick = async () => {
    this.handleCloseConfirmationDialog();
    const { method, bookingId } = this.state;
    if (method === CUSTOMER_ACTIONS.CONFIRM) {
      this.callApiConfirmOrDoneBookingTable(bookingId);
    } else {
      this.callApiCancelBookingTable(bookingId);
    }
  };

  callApiConfirmOrDoneBookingTable = async (bookingId) => {
    const res = await confirmBookingTable(bookingId);
    if (res && res.errCode === 0) {
      toast.success("Xác nhận đơn đặt bàn thành công");
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
    const { language, userInfo } = this.props;
    const {
      restaurantSelected,
      date,
      listRestaurant,
      listBooking,
      totalBooking,
      pageSize,
      pageIndex,
      isOpenDetailBookingDialog,
      isOpenBillEmailDialog,
      bookingSelected,
      listGeneralStatus,
      generalStatusSelected,
      isOpenConfirmationDialog,
      confirmMessage,
    } = this.state;
    const columns = [
      {
        title: "STT",
        field: "no",
        width: "100",
        sorting: false,
      },
      {
        title: "Tên khách hàng",
        render: (rowData) =>
          language === LANGUAGES.VI
            ? `${rowData.customerData?.lastName} ${rowData.customerData?.firstName}`
            : `${rowData.customerData?.firstName} ${rowData.customerData?.lastName}`,
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
        cellStyle: (cellValue, rowData) => ({
          color:
            rowData.statusId === LIST_STATUS.OVERDUE ? "#FF6571" : "#28A745",
        }),
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
                  isDisabled={
                    userInfo.roleId === USER_ROLE.RESTAURANT_MANAGER
                      ? true
                      : false
                  }
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
                  onDayCreate={function (dObj, dStr, fp, dayElem) {
                    const dateItem = new Date(dayElem.dateObj).getTime();
                    if (dateItem === date) {
                      dayElem.className += " colormain";
                    }
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
                      rowData.statusId === LIST_STATUS.CONFIRMED
                        ? "#eee"
                        : "#fff",
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
              handleCloseDialog={this.handleCloseDialog}
              bookingData={bookingSelected}
            />
          )}
          {isOpenBillEmailDialog && (
            <BillEmailDialog
              isOpen={isOpenBillEmailDialog}
              handleCloseDialog={this.handleCloseDialog}
              bookingData={bookingSelected}
            />
          )}
          {isOpenConfirmationDialog && (
            <ConfirmationDialog
              title={"Xác nhận"}
              text={confirmMessage}
              isOpen={isOpenConfirmationDialog}
              onCancelClick={this.handleCloseConfirmationDialog}
              onConfirmClick={this.handleConfirmYesClick}
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
    userInfo: state.user.userInfo,
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
