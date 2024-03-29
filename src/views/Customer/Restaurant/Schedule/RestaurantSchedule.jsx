import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import {
  isExistArrayAndNotEmpty,
  LANGUAGES,
  NUMBER_PEOPLE_BOOKING,
} from "../../../../utils";
import { Grid, Icon, Button } from "@material-ui/core";
import { Skeleton } from "@mui/material";
import { Clear } from "@material-ui/icons";
import "./RestaurantSchedule.scss";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import DishOrder from "./DishOrder";
import moment from "moment";
import { bookingTable } from "../../../../services/customerService";
import { toast } from "react-toastify";
import CustomerLogin from "../../Auth/CustomerLogin";
import { FormattedMessage } from "react-intl";

class RestaurantSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOptionPeople: [...Array(NUMBER_PEOPLE_BOOKING).keys()].map(
        (item) => ++item
      ),
      numberPeople: 2,
      isShowOptionPeople: false,
      date: new Date().setHours(0, 0, 0, 0),
      timeType: "",
      isOpenDatePicker: false,
      isShowDishOrderDialog: false,
      listDishOrder: [],
      listSchedule: [],
      isOpenCustomerLoginDialog: false,
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listSchedule !== this.props.listSchedule) {
      let listSchedule = this.props.listSchedule;
      this.setState({
        listSchedule: listSchedule,
      });
    }
    if (prevProps.restaurantId !== this.props.restaurantId) {
      this.fetchScheduleByDate(+this.props.restaurantId);
    }
    if (
      prevProps.isOpenCustomerLoginDialog !==
      this.props.isOpenCustomerLoginDialog
    ) {
      this.setState({
        isOpenCustomerLoginDialog: false,
      });
    }
    if (prevProps.customerInfo !== this.props.customerInfo) {
      this.handleClearState();
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      listDishOrder: nextProps.listDishOrder.filter(
        (item) => item.restaurantId === +nextProps.restaurantId
      ),
    });
  }

  fetchScheduleByDate = (restaurantId) => {
    const { date } = this.state;
    this.props.getScheduleByDate({
      restaurantId: +restaurantId,
      date,
      isFilterByNowTime: true,
    });
  };

  handleShowHideOptionPeople = () => {
    this.setState({
      isShowOptionPeople: !this.state.isShowOptionPeople,
      isOpenDatePicker: false,
    });
    if (this.fp) {
      this.fp.flatpickr.close();
    }
  };

  handleChangeNumberPeopleSelected = (numberPeople) => {
    this.setState({
      numberPeople: numberPeople,
    });
  };

  handleOpenCloseDatePicker = () => {
    this.setState(
      {
        isOpenDatePicker: !this.state.isOpenDatePicker,
      },
      () => {
        if (this.fp) {
          this.state.isOpenDatePicker
            ? this.fp.flatpickr.open()
            : this.fp.flatpickr.close();
        }
      }
    );
  };

  handleChangeDatePicker = (date) => {
    this.setState({
      date: new Date(date).getTime(),
      isOpenDatePicker: false,
    });

    const { restaurantId } = this.props;
    if (restaurantId) {
      this.fetchScheduleByDate(restaurantId);
    }
  };

  handleOpenDishOrderDialog = () => {
    this.setState({
      isShowDishOrderDialog: true,
    });
  };

  handleChangeTimeSelected = (timeTypeSelected) => {
    this.setState({
      timeType: timeTypeSelected,
    });
  };

  handleClearState = () => {
    this.setState(
      {
        numberPeople: 2,
        isShowOptionPeople: false,
        date: new Date().setHours(0, 0, 0, 0),
        timeType: "",
        isOpenDatePicker: false,
        isShowDishOrderDialog: false,
        isOpenCustomerLoginDialog: false,
      },
      () => {
        this.fetchScheduleByDate(+this.props.restaurantId);
      }
    );
  };

  handleCloseDishOrderDialog = () => {
    this.setState({
      isShowDishOrderDialog: false,
    });
  };

  handleRemoveDishOrderItem = (dishId) => {
    this.props.removeDishOrderItem(dishId);
  };

  handleValidateCustomerAndTimeType = () => {
    const { customerInfo } = this.props;
    const { timeType } = this.state;
    if (!customerInfo) {
      toast.info("Vui lòng đăng nhập để đặt bàn");
      this.setState({
        isOpenCustomerLoginDialog: true,
      });
      return;
    }

    if (!timeType) {
      toast.error("Vui lòng chọn thời gian muốn đặt bàn");
      return;
    }

    this.props.changeBackropLoading(true);
    this.handleBookingTable();
  };

  handleBookingTable = () => {
    const { restaurantId, customerInfo, language } = this.props;
    const { numberPeople, date, timeType } = this.state;
    const timeString = this.buildTimeBooking(timeType);

    let data = {
      restaurantId,
      customerId: customerInfo.id,
      table: Math.ceil(numberPeople / 6),
      date,
      timeType,
      timeString,
      language,
      listDishOrder: this.props.listDishOrder,
    };

    this.callApiBookingTable(data);
  };

  buildTimeBooking = (timeType) => {
    const { language } = this.props;
    const { date, listSchedule } = this.state;

    let dateVi = moment.unix(+date / 1000).format("dddd - DD/MM/YYYY"); //ms -> s
    let dateEn = moment
      .unix(+date / 1000)
      .locale("en")
      .format("dddd - MM/DD/YYYY");
    let dateBooking =
      language === LANGUAGES.VI ? this.capitalizeFirstLetter(dateVi) : dateEn;

    let timeSelected = listSchedule.find((item) => item.timeType === timeType);

    let time =
      language === LANGUAGES.VI
        ? timeSelected.timeTypeData.valueVi
        : timeSelected.timeTypeData.valueEn;

    return `${time} - ${dateBooking}`;
  };

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  callApiBookingTable = async (data) => {
    const res = await bookingTable(data);
    if (res && res.errCode === 0) {
      this.props.changeBackropLoading(false);
      this.handleClearState();
      this.props.clearDishOrder();
      toast.info("Đặt lịch thành công, vui lòng kiểm tra email để xác nhận");
    } else {
      this.props.changeBackropLoading(false);
      toast.error(res.errMessage);
    }
  };

  handleCloseCustomerLoginDialog = () => {
    this.setState({
      isOpenCustomerLoginDialog: false,
    });
  };

  render() {
    const { language, isLoadingSchedule } = this.props;
    const {
      isShowOptionPeople,
      listOptionPeople,
      numberPeople,
      isOpenDatePicker,
      timeType,
      isShowDishOrderDialog,
      listDishOrder,
      listSchedule,
      date,
      isOpenCustomerLoginDialog,
    } = this.state;

    return (
      <>
        <Grid
          className="restaurant-schedule-container"
          container
          direction="column"
        >
          <Grid className="restaurant-content-title">
            <FormattedMessage id="customer.restaurant.schedule.book-a-table" />
          </Grid>
          <Grid
            className="restaurant-schedule-infor people"
            onClick={() => {
              this.handleShowHideOptionPeople();
            }}
          >
            {!isShowOptionPeople ? (
              <Grid className="people-hide-option flex-between-center">
                <Grid className="grid-mui-icon">
                  <Icon>people_alt</Icon>
                  <span className="text">
                    {numberPeople}{" "}
                    <FormattedMessage id="customer.restaurant.schedule.people" />
                  </span>
                </Grid>
                <Icon className="drop-down">expand_more</Icon>
              </Grid>
            ) : (
              <Grid className="people-show-option">
                <Grid className="people-show-option-top flex-between-center">
                  <Grid className="grid-mui-icon">
                    <Icon>people_alt</Icon>
                    <span className="text">
                      {numberPeople}{" "}
                      <FormattedMessage id="customer.restaurant.schedule.people" />
                    </span>
                  </Grid>
                  <Icon className="drop-up">expand_less</Icon>
                </Grid>
                <Grid className="people-show-option-bottom">
                  {isExistArrayAndNotEmpty(listOptionPeople) &&
                    listOptionPeople.map((item) => {
                      return (
                        <Grid
                          key={item}
                          className={
                            item === numberPeople
                              ? "option-item option-active"
                              : "option-item"
                          }
                          onClick={() => {
                            this.handleChangeNumberPeopleSelected(item);
                          }}
                        >
                          {item}
                        </Grid>
                      );
                    })}
                </Grid>
              </Grid>
            )}
          </Grid>
          <Grid
            className="restaurant-schedule-infor date"
            onClick={() => {
              this.handleOpenCloseDatePicker();
            }}
          >
            <Grid className="grid-mui-icon date-left">
              <Icon>calendar_today</Icon>
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
                  dateFormat: language === LANGUAGES.VI ? "d/m/Y" : "m/d/Y",
                  minDate: "today",
                  maxDate: new Date().fp_incr(30),
                  locale: {
                    firstDayOfWeek: 1,
                  },
                  monthSelectorType: "static",
                  position: "auto center",
                  ignoredFocusElements: [window.document.body],
                }}
                onDayCreate={function (dObj, dStr, fp, dayElem) {
                  const dateItem = new Date(dayElem.dateObj).getTime();
                  if (dateItem === date) {
                    dayElem.className += " colorpink";
                  }
                }}
              />
            </Grid>
            {!isOpenDatePicker ? (
              <Icon className="drop-down">expand_more</Icon>
            ) : (
              <Icon className="drop-up">expand_less</Icon>
            )}
          </Grid>
          <Grid className="restaurant-schedule-infor time">
            <Grid className="grid-mui-icon">
              <Icon className="mui-icon">schedule</Icon>
              <span>
                <FormattedMessage id="customer.restaurant.schedule.choose-time" />
              </span>
            </Grid>
            <Grid container spacing={2} className="list-schedule">
              {isLoadingSchedule ? (
                <>
                  <Grid item xs={4}>
                    <Skeleton variant="rounded" width={108} height={40} />
                  </Grid>
                  <Grid item xs={4}>
                    <Skeleton variant="rounded" width={108} height={40} />
                  </Grid>
                  <Grid item xs={4}>
                    <Skeleton variant="rounded" width={108} height={40} />
                  </Grid>
                  <Grid item xs={4}>
                    <Skeleton variant="rounded" width={108} height={40} />
                  </Grid>
                  <Grid item xs={4}>
                    <Skeleton variant="rounded" width={108} height={40} />
                  </Grid>
                  <Grid item xs={4}>
                    <Skeleton variant="rounded" width={108} height={40} />
                  </Grid>
                </>
              ) : (
                <>
                  {isExistArrayAndNotEmpty(listSchedule) ? (
                    listSchedule.map((item) => {
                      return (
                        <Grid key={item.id} item xs={4}>
                          <Button
                            className={
                              timeType === item.timeType
                                ? "w-100 schedule-content time-active"
                                : "w-100 schedule-content"
                            }
                            onClick={() => {
                              this.handleChangeTimeSelected(item.timeType);
                            }}
                          >
                            {language === LANGUAGES.VI
                              ? item.timeTypeData?.valueVi
                              : item.timeTypeData?.valueEn}
                          </Button>
                        </Grid>
                      );
                    })
                  ) : (
                    <Grid className="list-schedule-empty-text">
                      <FormattedMessage id="customer.restaurant.schedule.schedule-empty-text" />
                    </Grid>
                  )}
                </>
              )}
            </Grid>
          </Grid>
          <Grid className="restaurant-schedule-infor dish">
            <Grid className="grid-mui-icon">
              <Icon>fastfood</Icon>
              <span>
                <FormattedMessage id="customer.restaurant.schedule.dish-order" />{" "}
                {!isExistArrayAndNotEmpty(listDishOrder) && (
                  <>
                    (
                    <FormattedMessage id="customer.restaurant.schedule.no-dish-order" />
                    )
                  </>
                )}
              </span>
            </Grid>
            {isExistArrayAndNotEmpty(listDishOrder) && (
              <Grid className="schedule-list-dish-order">
                {listDishOrder.slice(0, 3).map((item) => {
                  return (
                    <Grid key={item.id} className="schedule-dish-order-content">
                      {language === LANGUAGES.VI ? item.nameVi : item.nameEn}
                      <Clear
                        className="clear-dish-icon"
                        onClick={() => {
                          this.handleRemoveDishOrderItem(item.id);
                        }}
                      />
                    </Grid>
                  );
                })}
                {listDishOrder.length > 3 && (
                  <Grid
                    className="schedule-dish-order-content more"
                    onClick={() => {
                      this.handleOpenDishOrderDialog();
                    }}
                  >
                    &sdot;&sdot;&sdot;
                  </Grid>
                )}
              </Grid>
            )}
            {isShowDishOrderDialog && (
              <DishOrder
                isOpen={isShowDishOrderDialog}
                handleCloseDialog={this.handleCloseDishOrderDialog}
                listDishOrder={listDishOrder}
              />
            )}
          </Grid>
          <Grid className="restaurant-schedule-book">
            <Button
              className="w-100 btn-book"
              onClick={() => {
                this.handleValidateCustomerAndTimeType();
              }}
            >
              <FormattedMessage id="customer.restaurant.schedule.book-now" />
            </Button>
            <Grid className="book-note">
              <FormattedMessage id="customer.restaurant.schedule.paypal-text" />
            </Grid>
          </Grid>
          {isOpenCustomerLoginDialog && (
            <CustomerLogin
              isOpen={isOpenCustomerLoginDialog}
              handleCloseDialog={this.handleCloseCustomerLoginDialog}
            />
          )}
        </Grid>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    listDishOrder: state.user.listDishOrder,
    listSchedule: state.restaurant.listSchedule,
    customerInfo: state.user.customerInfo,
    isOpenCustomerLoginDialog: state.user.isOpenCustomerLoginDialog,
    isLoadingSchedule: state.restaurant.isLoadingSchedule,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeDishOrderItem: (dishId) => dispatch(actions.updateDishOrder(dishId)),
    getScheduleByDate: (data) => dispatch(actions.getScheduleByDate(data)),
    clearDishOrder: () => dispatch(actions.clearDishOrder()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantSchedule);
