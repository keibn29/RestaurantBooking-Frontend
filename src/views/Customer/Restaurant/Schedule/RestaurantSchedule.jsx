import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import {
  isExistArrayAndNotEmpty,
  LANGUAGE,
  LANGUAGES,
} from "../../../../utils";
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
import { Clear } from "@material-ui/icons";
import "./RestaurantSchedule.scss";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import FoodOrder from "./FoodOrder";

class RestaurantSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOptionPeople: [1, 2, 3, 4, 5, 6],
      numberPeople: 2,
      isShowOptionPeople: false,
      date: new Date().setHours(0, 0, 0, 0),
      isOpenDatePicker: false,
      isShowFoodOrderDialog: false,
      listFoodOrder: [],
      listSchedule: [],
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listSchedule !== this.props.listSchedule) {
      let listSchedule = this.addFieldToListSchedule(this.props.listSchedule);
      this.setState({
        listSchedule: listSchedule,
      });
    }
    if (prevProps.restaurantId !== this.props.restaurantId) {
      this.fetchScheduleByDate(+this.props.restaurantId);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      listFoodOrder: nextProps.listFoodOrder.filter(
        (item) => item.restaurantId === +nextProps.restaurantId
      ),
    });
  }

  fetchScheduleByDate = (restaurantId) => {
    const { date } = this.state;
    let dateSelected = new Date(date).getTime();
    this.props.getScheduleByDate(restaurantId, dateSelected);
  };

  addFieldToListSchedule = (listSchedule) => {
    if (!isExistArrayAndNotEmpty(listSchedule)) {
      return [];
    }
    return listSchedule.map((item) => ({
      ...item,
      isSelected: false,
    }));
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
      date: date,
      isOpenDatePicker: !this.state.isOpenDatePicker,
    });

    const { restaurantId } = this.props;
    if (restaurantId) {
      this.fetchScheduleByDate(restaurantId);
    }
  };

  handleOpenFoodOrderDialog = () => {
    this.setState({
      isShowFoodOrderDialog: true,
    });
  };

  handleChangeTimeSelected = (timeSelected) => {
    const { listSchedule } = this.state;
    let newList = listSchedule.map((item) => {
      if (item.id !== timeSelected.id) {
        item.isSelected = false;
        return item;
      }
      item.isSelected = true;
      return item;
    });
    this.setState({
      listSchedule: newList,
    });
  };

  handleCloseFoodOrderDialog = () => {
    this.setState({
      isShowFoodOrderDialog: false,
    });
  };

  handleRemoveFoodOrderItem = (foodId) => {
    this.props.removeFoodOrderItem(foodId);
  };

  render() {
    const { language } = this.props;
    const {
      isShowOptionPeople,
      listOptionPeople,
      numberPeople,
      isOpenDatePicker,
      isShowFoodOrderDialog,
      listFoodOrder,
      listSchedule,
    } = this.state;
    console.log(listSchedule);
    return (
      <>
        <Grid
          className="restaurant-schedule-container"
          container
          direction="column"
        >
          <Grid className="restaurant-content-title">Book a table</Grid>
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
                  <span className="text">{numberPeople} people</span>
                </Grid>
                <Icon className="drop-down">expand_more</Icon>
              </Grid>
            ) : (
              <Grid className="people-show-option">
                <Grid className="people-show-option-top flex-between-center">
                  <Grid className="grid-mui-icon">
                    <Icon>people_alt</Icon>
                    <span className="text">{numberPeople} people</span>
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
                options={{
                  defaultDate: "today",
                  dateFormat: "d/m/Y",
                  minDate: "today",
                  maxDate: new Date().fp_incr(30),
                  locale: {
                    firstDayOfWeek: 1,
                  },
                  monthSelectorType: "static",
                  position: "auto center",
                  ignoredFocusElements: [window.document.body],
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
              <span>Choose a time:</span>
            </Grid>
            <Grid container spacing={2} className="list-schedule">
              {isExistArrayAndNotEmpty(listSchedule) &&
                listSchedule.map((item) => {
                  return (
                    <Grid key={item.id} item xs={4}>
                      <Button
                        className={
                          item.isSelected
                            ? "w-100 schedule-content time-active"
                            : "w-100 schedule-content"
                        }
                        onClick={() => {
                          this.handleChangeTimeSelected(item);
                        }}
                      >
                        {language === LANGUAGES.VI
                          ? item.timeTypeData.valueVi
                          : item.timeTypeData.valueEn}
                      </Button>
                    </Grid>
                  );
                })}
            </Grid>
          </Grid>
          <Grid className="restaurant-schedule-infor food">
            <Grid className="grid-mui-icon">
              <Icon>fastfood</Icon>
              <span>
                Food Order:{" "}
                {!isExistArrayAndNotEmpty(listFoodOrder) && <>(Chưa đặt món)</>}
              </span>
            </Grid>
            {isExistArrayAndNotEmpty(listFoodOrder) && (
              <Grid className="schedule-list-food-order">
                {listFoodOrder.slice(0, 3).map((item) => {
                  return (
                    <Grid key={item.id} className="schedule-food-order-content">
                      {language === LANGUAGES.VI ? item.nameVi : item.nameEn}
                      <Clear
                        className="clear-food-icon"
                        onClick={() => {
                          this.handleRemoveFoodOrderItem(item.id);
                        }}
                      />
                    </Grid>
                  );
                })}
                {listFoodOrder.length > 3 && (
                  <Grid
                    className="schedule-food-order-content more"
                    onClick={() => {
                      this.handleOpenFoodOrderDialog();
                    }}
                  >
                    &sdot;&sdot;&sdot;
                  </Grid>
                )}
              </Grid>
            )}
            {isShowFoodOrderDialog && (
              <FoodOrder
                isOpen={isShowFoodOrderDialog}
                handleCloseDialog={this.handleCloseFoodOrderDialog}
                listFoodOrder={listFoodOrder}
              />
            )}
          </Grid>
          <Grid className="restaurant-schedule-book">
            <Button className="w-100 btn-book">Book now</Button>
          </Grid>
        </Grid>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    listFoodOrder: state.user.listFoodOrder,
    listSchedule: state.restaurant.listSchedule,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeFoodOrderItem: (foodId) => dispatch(actions.updateFoodOrder(foodId)),
    getScheduleByDate: (restaurantId, date) =>
      dispatch(actions.getScheduleByDate(restaurantId, date)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantSchedule);
