import React, { Component } from "react";
import { connect } from "react-redux";
import { isExistArrayAndNotEmpty, LANGUAGES } from "../../../utils";
import { Grid, IconButton, Icon, Button, Dialog } from "@material-ui/core";
import dateFormat from "dateformat";

class DetaiBookingDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    const { language, isOpen, handleCloseDialog, bookingData } = this.props;
    const dateVi = bookingData.date
      ? dateFormat(+bookingData.date, "dd/mm/yyyy")
      : "";
    const dateEn = bookingData.date
      ? dateFormat(+bookingData.date, "mm/dd/yyyy")
      : "";

    return (
      <>
        <Dialog open={isOpen} maxWidth="sm" fullWidth={true}>
          <Grid className="dialog-container">
            <Grid className="dialog-header">
              Thông tin đơn đặt bàn
              <IconButton
                className="btn-close-dialog"
                onClick={() => {
                  handleCloseDialog();
                }}
              >
                <Icon color="error" title="Đóng">
                  close
                </Icon>
              </IconButton>
            </Grid>
            <Grid className="detail-booking-body">
              <Grid className="body-up">
                <Grid className="body-title">Thông tin khách hàng</Grid>
                <Grid
                  className="customer-infor-content"
                  container
                  alignItems="center"
                >
                  <Grid
                    className="customer-avatar background-image-center-cover"
                    style={
                      bookingData.customerData &&
                      bookingData.customerData.avatar
                        ? {
                            backgroundImage: `url(${
                              process.env.REACT_APP_BACKEND_URL +
                              bookingData.customerData.avatar
                            })`,
                          }
                        : {}
                    }
                  ></Grid>
                  <Grid item xs className="customer-text">
                    <Grid className="text-content" container>
                      <Grid item xs={4} className="text-content-left">
                        Họ và tên:
                      </Grid>
                      <Grid item xs={6} className="text-content-right">
                        {language === LANGUAGES.VI ? (
                          <>
                            {bookingData?.customerData?.lastName}{" "}
                            {bookingData?.customerData?.firstName}
                          </>
                        ) : (
                          <>
                            {bookingData?.customerData?.firstName}{" "}
                            {bookingData?.customerData?.lastName}
                          </>
                        )}
                      </Grid>
                    </Grid>
                    <Grid className="text-content" container>
                      <Grid item xs={4} className="text-content-left">
                        Email:
                      </Grid>
                      <Grid item xs={6} className="text-content-right">
                        {bookingData?.customerData?.email}
                      </Grid>
                    </Grid>
                    <Grid className="text-content" container>
                      <Grid item xs={4} className="text-content-left">
                        Số điện thoại:
                      </Grid>
                      <Grid item xs={6} className="text-content-right">
                        {bookingData?.customerData?.phone}
                      </Grid>
                    </Grid>
                    <Grid className="text-content" container>
                      <Grid item xs={4} className="text-content-left">
                        Địa chỉ:
                      </Grid>
                      <Grid item xs={6} className="text-content-right">
                        {bookingData?.customerData?.address}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid className="body-down">
                <Grid className="body-title">Thông tin lịch đặt</Grid>
                <Grid className="booking-infor" container>
                  <Grid item xs={6}>
                    Thời gian:{" "}
                    {language === LANGUAGES.VI
                      ? bookingData?.timeTypeData?.valueVi
                      : bookingData?.timeTypeData?.valueEn}{" "}
                    - {language === LANGUAGES.VI ? dateVi : dateEn}
                  </Grid>
                  <Grid item xs={6}>
                    Trạng thái:{" "}
                    <span className="status-text overdue">
                      {language === LANGUAGES.VI
                        ? bookingData?.statusData?.valueVi
                        : bookingData?.statusData?.valueEn}
                    </span>
                  </Grid>
                  <Grid item xs={6}>
                    Món ăn đặt kèm:{" "}
                    {!isExistArrayAndNotEmpty(bookingData.dishOrderData) &&
                      "Không"}
                  </Grid>
                </Grid>
                <Grid className="list-dish-order" container>
                  {isExistArrayAndNotEmpty(bookingData.dishOrderData) &&
                    bookingData.dishOrderData.map((item) => {
                      return (
                        <Grid
                          key={item.id}
                          item
                          xs={6}
                          className="dish-order-content"
                          container
                          alignItems="center"
                        >
                          <Grid
                            className="dish-order-avatar background-image-center-cover"
                            style={
                              item.dishData.avatar
                                ? {
                                    backgroundImage: `url(${
                                      process.env.REACT_APP_BACKEND_URL +
                                      item.dishData.avatar
                                    })`,
                                  }
                                : {}
                            }
                          ></Grid>
                          <Grid className="dish-order-text">
                            <Grid className="dish-order-name">
                              {language === LANGUAGES.VI
                                ? item.dishData.nameVi
                                : item.dishData.nameEn}
                            </Grid>
                            <Grid className="dish-order-price">
                              Giá:{" "}
                              {language === LANGUAGES.VI ? (
                                <>
                                  {Number(
                                    item.dishData.priceVi
                                  ).toLocaleString()}
                                  <sup>đ</sup>
                                </>
                              ) : (
                                <>
                                  <span>&#36;</span>
                                  {Number(
                                    item.dishData.priceEn
                                  ).toLocaleString()}
                                </>
                              )}
                            </Grid>
                          </Grid>
                        </Grid>
                      );
                    })}
                </Grid>
              </Grid>
            </Grid>
            <Grid className="dialog-footer" container justify="flex-end">
              <Button
                className="dialog-button"
                variant="contained"
                color="primary"
                onClick={handleCloseDialog}
              >
                Đóng
              </Button>
            </Grid>
          </Grid>
        </Dialog>
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetaiBookingDialog);
