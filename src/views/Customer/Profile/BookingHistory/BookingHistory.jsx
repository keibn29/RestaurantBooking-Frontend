import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import { cancelBookingTable } from "../../../../services/restaurantService";
import { Grid, Button } from "@material-ui/core";
import { Pagination } from "@mui/material";
import "./BookingHistory.scss";
import { Mail, CreditCard, HomeWork, DoneAll } from "@material-ui/icons";
import {
  isExistArrayAndNotEmpty,
  LANGUAGES,
  LIST_STATUS,
  PAGE_SIZE_PAGINATION,
} from "../../../../utils";
import dateFormat from "dateformat";
import ConfirmationDialog from "../../../../components/ConfirmationDialog";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";

class BookingHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listBooking: [],
      pageOrder: 1,
      totalPage: 1,
      isShowListDishOrder: false,
      isOpenConfirmationDialog: false,
      bookingId: "",
    };
  }

  componentDidMount() {
    if (this.props.customerInfo) {
      this.fetchListTableBooking();
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listBooking !== this.props.listBooking) {
      this.setState({
        listBooking: this.props.listBooking,
        totalPage: Math.ceil(this.props.totalBooking / PAGE_SIZE_PAGINATION),
      });
    }
    if (prevProps.customerInfo !== this.props.customerInfo) {
      this.fetchListTableBooking();
    }
  }

  fetchListTableBooking = () => {
    const { customerInfo } = this.props;
    const { pageOrder } = this.state;
    let data = {
      pageOrder,
      pageSize: PAGE_SIZE_PAGINATION,
      customerId: customerInfo.id,
    };
    this.props.getTableBookingByCustomer(data);
  };

  handleChangePageOrder = (newPage) => {
    this.setState(
      {
        pageOrder: newPage,
      },
      () => {
        this.fetchListTableBooking();
      }
    );

    document.getElementById("customer-profile-top").scrollIntoView();
  };

  handleShowHideListDishOrder = () => {
    this.setState({
      isShowListDishOrder: !this.state.isShowListDishOrder,
    });
  };

  handleCloseConfirmationDialog = () => {
    this.setState({
      isOpenConfirmationDialog: false,
    });
  };

  handleCancelReservation = (bookingId) => {
    this.setState({
      isOpenConfirmationDialog: true,
      bookingId: bookingId,
    });
  };

  handleConfirmDelete = async () => {
    this.handleCloseConfirmationDialog();
    const res = await cancelBookingTable(this.state.bookingId);
    if (res && res.errCode === 0) {
      toast.success("Hủy lịch đặt bàn thành công");
      this.fetchListTableBooking();
    } else {
      toast.error(res.errMessage);
    }
  };

  render() {
    const { language, totalBooking } = this.props;
    const {
      listBooking,
      pageOrder,
      totalPage,
      isShowListDishOrder,
      isOpenConfirmationDialog,
    } = this.state;

    console.log("listBooking", listBooking);

    return (
      <>
        <Grid className="booking-history-container">
          {isExistArrayAndNotEmpty(listBooking) ? (
            <Grid
              className="booking-history-body"
              container
              direction="column"
              justify="space-between"
            >
              <Grid>
                <Grid className="customer-profile-title">
                  <FormattedMessage id="customer.profile.booking-history.reservation" />{" "}
                  ({totalBooking})
                </Grid>
                <Grid className="list-booking">
                  {listBooking.map((item) => {
                    const dateVi = dateFormat(+item.date, "dd/mm/yyyy");
                    const dateEn = dateFormat(+item.date, "mm/dd/yyyy");

                    return (
                      <Grid
                        key={item.id}
                        className={
                          item.statusId === LIST_STATUS.OVERDUE
                            ? "booking-content booking-content-overdue"
                            : "booking-content"
                        }
                      >
                        <Grid
                          className="booking-content-top"
                          container
                          wrap="nowrap"
                          justify="space-between"
                          alignItems="center"
                        >
                          <Grid className="content-top-left" container>
                            <Grid
                              className="left-avatar background-image-center-cover"
                              style={
                                item.restaurantData &&
                                item.restaurantData.avatar
                                  ? {
                                      backgroundImage: `url(${
                                        process.env.REACT_APP_BACKEND_URL +
                                        item.restaurantData.avatar
                                      })`,
                                    }
                                  : {}
                              }
                            ></Grid>
                            <Grid className="left-text">
                              <Grid className="restaurant-name">
                                {item.restaurantData && (
                                  <>
                                    {language === LANGUAGES.VI
                                      ? item.restaurantData.nameVi
                                      : item.restaurantData.nameEn}
                                  </>
                                )}
                              </Grid>
                              <Grid className="other">
                                <FormattedMessage id="customer.profile.booking-history.time" />{" "}
                                {item.timeTypeData && (
                                  <>
                                    {language === LANGUAGES.VI
                                      ? item.timeTypeData.valueVi
                                      : item.timeTypeData.valueEn}
                                  </>
                                )}{" "}
                                - {language === LANGUAGES.VI ? dateVi : dateEn}
                              </Grid>
                              <Grid className="other">
                                <FormattedMessage id="customer.profile.booking-history.dish" />{" "}
                                {isExistArrayAndNotEmpty(item.dishOrderData) ? (
                                  <span
                                    className="dish-order"
                                    onClick={() => {
                                      this.handleShowHideListDishOrder();
                                    }}
                                  >
                                    {item.dishOrderData.length}{" "}
                                    <FormattedMessage id="customer.profile.booking-history.part-dish" />
                                    <i
                                      className={
                                        isShowListDishOrder
                                          ? "fas fa-caret-up"
                                          : "fas fa-caret-down"
                                      }
                                    ></i>
                                  </span>
                                ) : (
                                  "Không"
                                )}
                              </Grid>
                            </Grid>
                          </Grid>
                          {item.statusId !== LIST_STATUS.DONE && (
                            <Grid className="content-top-right">
                              <Button
                                variant="outlined"
                                className="btn-cancel-booking"
                                onClick={() => {
                                  this.handleCancelReservation(item.id);
                                }}
                              >
                                <FormattedMessage id="customer.profile.booking-history.cancel" />
                              </Button>
                            </Grid>
                          )}
                        </Grid>
                        {isExistArrayAndNotEmpty(item.dishOrderData) &&
                          isShowListDishOrder && (
                            <Grid className="list-dish-order" container>
                              {item.dishOrderData.map((dishItem) => {
                                return (
                                  <Grid
                                    className="dish-order-content"
                                    key={dishItem.id}
                                    item
                                    xs={6}
                                    container
                                    alignItems="center"
                                  >
                                    <Grid
                                      className="dish-order-avatar background-image-center-cover"
                                      style={
                                        dishItem.dishData &&
                                        dishItem.dishData.avatar
                                          ? {
                                              backgroundImage: `url(${
                                                process.env
                                                  .REACT_APP_BACKEND_URL +
                                                dishItem.dishData.avatar
                                              })`,
                                            }
                                          : {}
                                      }
                                    ></Grid>
                                    <Grid className="dish-order-text">
                                      <Grid className="dish-order-name">
                                        {dishItem.dishData && (
                                          <>
                                            {language === LANGUAGES.VI
                                              ? dishItem.dishData.nameVi
                                              : dishItem.dishData.nameEn}
                                          </>
                                        )}
                                      </Grid>
                                      <Grid className="dish-order-price">
                                        {language === LANGUAGES.VI ? (
                                          <>
                                            {Number(
                                              dishItem.dishData.priceVi
                                            ).toLocaleString()}
                                            <sup>đ</sup>
                                          </>
                                        ) : (
                                          <>
                                            <span>&#36;</span>
                                            {Number(
                                              dishItem.dishData.priceEn
                                            ).toLocaleString()}
                                          </>
                                        )}
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                );
                              })}
                            </Grid>
                          )}
                        <Grid
                          className="booking-content-bottom mt-5"
                          container
                          justify="center"
                        >
                          <Grid
                            item
                            xs={10}
                            className="booking-status"
                            container
                            justify="space-between"
                            alignContent="center"
                          >
                            {item.statusId === LIST_STATUS.VERIFIED && (
                              <Grid className="booking-status-process verified"></Grid>
                            )}
                            {item.statusId === LIST_STATUS.CONFIRMED && (
                              <Grid className="booking-status-process confirmed"></Grid>
                            )}
                            {item.statusId === LIST_STATUS.DONE && (
                              <Grid className="booking-status-process done"></Grid>
                            )}
                            {item.statusId === LIST_STATUS.OVERDUE && (
                              <Grid className="booking-status-process overdue"></Grid>
                            )}
                            <Grid
                              className={
                                item.statusId !== LIST_STATUS.OVERDUE
                                  ? "status-content status-active"
                                  : "status-content"
                              }
                              container
                            >
                              <Mail className="status-icon" />
                              <span className="status-text">
                                {item.statusId === LIST_STATUS.OVERDUE
                                  ? "Quá thời hạn"
                                  : "Lịch đặt mới"}
                              </span>
                            </Grid>
                            <Grid
                              className={
                                item.statusId !== LIST_STATUS.NEW &&
                                item.statusId !== LIST_STATUS.OVERDUE
                                  ? "status-content status-active"
                                  : "status-content"
                              }
                              container
                            >
                              <CreditCard className="status-icon" />
                              <span className="status-text">
                                {item.statusId === LIST_STATUS.OVERDUE
                                  ? "Quá thời hạn"
                                  : "Đã đặt cọc"}
                              </span>
                            </Grid>
                            <Grid
                              className={
                                item.statusId === LIST_STATUS.CONFIRMED ||
                                item.statusId === LIST_STATUS.DONE
                                  ? "status-content status-active"
                                  : "status-content"
                              }
                              container
                            >
                              <HomeWork className="status-icon" />
                              <span className="status-text">
                                {item.statusId === LIST_STATUS.OVERDUE
                                  ? "Quá thời hạn"
                                  : "Nhà hàng đã xác nhận"}
                              </span>
                            </Grid>
                            <Grid
                              className={
                                item.statusId === LIST_STATUS.DONE
                                  ? "status-content status-active"
                                  : "status-content"
                              }
                              container
                            >
                              <DoneAll className="status-icon" />
                              <span className="status-text">
                                {item.statusId === LIST_STATUS.OVERDUE
                                  ? "Quá thời hạn"
                                  : "Đã ăn xong"}
                              </span>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
              {isOpenConfirmationDialog && (
                <ConfirmationDialog
                  title={"Xác nhận"}
                  text={"Bạn chắc chắn muốn hủy lịch đặt bàn này?"}
                  isOpen={isOpenConfirmationDialog}
                  onCancelClick={this.handleCloseConfirmationDialog}
                  onConfirmClick={this.handleConfirmDelete}
                  confirm={"Xác nhận"}
                  cancel={"Đóng"}
                  color={"colorpink"}
                />
              )}
              {totalBooking > PAGE_SIZE_PAGINATION && (
                <Grid
                  className="booking-pagination mt-4"
                  container
                  justify="center"
                >
                  <Pagination
                    color="colorhome"
                    size="large"
                    count={totalPage}
                    page={pageOrder}
                    onChange={(event, newPage) => {
                      this.handleChangePageOrder(newPage);
                    }}
                  />
                </Grid>
              )}
            </Grid>
          ) : (
            <>
              <Grid className="customer-profile-title mb-3">Reservations</Grid>
              <span>Bạn chưa đặt bàn nào tại Chope</span>
            </>
          )}
        </Grid>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    listBooking: state.restaurant.listBooking,
    totalBooking: state.restaurant.totalBooking,
    customerInfo: state.user.customerInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTableBookingByCustomer: (data) =>
      dispatch(actions.getListTableBooking(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingHistory);
