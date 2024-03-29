import React, { Component } from "react";
import { connect } from "react-redux";
import "./ScheduleManagement.scss";
import * as actions from "../../../store/actions";
import {
  LANGUAGES,
  ALLCODES,
  isExistArrayAndNotEmpty,
  USER_ROLE,
  NUMBER_MAX_VALUE,
  customReactSelectStyleSystem,
  buildRestaurantReactSelect,
} from "../../../utils";
import { Grid, Button, Container } from "@material-ui/core";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import { eachDayOfInterval } from "date-fns";
import { toast } from "react-toastify";
import Select from "react-select";
import { bulkCreateNewSchedule } from "../../../services/restaurantService";

class ScheduleManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listRestaurant: [],
      restaurantSelected: "",
      listTime: [],
      firstDate: new Date().setHours(0, 0, 0, 0),
      lastDate: "",
      isNoon: false,
      isEvening: false,
    };
  }

  componentDidMount() {
    this.getLastDefaultDateFromDatePicker();
    this.fetchAllRestaurant();
    this.props.getAllTime(ALLCODES.TIME);
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
    if (prevProps.listTime !== this.props.listTime) {
      this.setState({
        listTime: this.props.listTime,
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
      this.setState({
        listRestaurant: dataSelect,
        restaurantSelected: dataSelect[0],
      });
    } else {
      this.setState({
        listRestaurant: dataSelect,
      });
    }
  };

  handleChangeRestaurantSelected = (restaurantSelected) => {
    this.setState({
      restaurantSelected: restaurantSelected,
    });
  };

  getLastDefaultDateFromDatePicker = () => {
    const lastDate = new Date();
    lastDate.setDate(
      lastDate.getDate() + process.env.REACT_APP_DATE_PICKER_RANGE
    );
    this.setState({
      lastDate: new Date(lastDate).getTime(),
    });
  };

  handleChangeDatePicker = (selectedDates) => {
    this.setState({
      firstDate: new Date(selectedDates[0]).getTime(),
      lastDate: new Date(selectedDates[1]).getTime(),
    });
  };

  handleChangeScheduleSelected = (type) => {
    if (type === "full") {
      this.handleChangeTypeEqualFull();
    } else if (type === "noon") {
      this.setState({
        isNoon: !this.state.isNoon,
        isEvening: false,
      });
    } else {
      this.setState({
        isNoon: false,
        isEvening: !this.state.isEvening,
      });
    }
  };

  handleChangeTypeEqualFull = () => {
    const { isNoon, isEvening } = this.state;
    if (isNoon && !isEvening) {
      this.setState({
        isEvening: !isEvening,
      });
    } else if (!isNoon && isEvening) {
      this.setState({
        isNoon: !isNoon,
      });
    } else {
      this.setState({
        isNoon: !isNoon,
        isEvening: !isEvening,
      });
    }
  };

  handleAddRestaurantSchedule = () => {
    const { firstDate, lastDate, restaurantSelected } = this.state;
    let listDateSelected = this.getDatesInRange(firstDate, lastDate);
    let listTimeSelected = this.getListTimeSelected();

    if (
      !restaurantSelected.value ||
      !isExistArrayAndNotEmpty(listDateSelected) ||
      !isExistArrayAndNotEmpty(listTimeSelected)
    ) {
      toast.error("Vui lòng chọn đầy đủ thông tin");
    } else {
      listDateSelected = listDateSelected.map((item) => {
        item = new Date(item).getTime();
        return item;
      });

      let data = {
        restaurantId: restaurantSelected.value,
        listDateSelected,
        listTimeSelected,
      };
      this.callApiBulkCreateNewSchedule(data);
    }
  };

  getDatesInRange = (firstDate, lastDate) => {
    if (!firstDate || !lastDate) {
      return;
    }
    return eachDayOfInterval({
      start: firstDate,
      end: lastDate,
    });
  };

  getListTimeSelected = () => {
    const { isNoon, isEvening, listTime } = this.state;

    if (isNoon && isEvening) {
      return listTime;
    }
    if (isNoon) {
      return listTime.slice(0, 6);
    }
    if (isEvening) {
      return listTime.slice(6, 12);
    }

    return [];
  };

  callApiBulkCreateNewSchedule = async (data) => {
    const res = await bulkCreateNewSchedule(data);
    if (res && res.errCode === 0) {
      toast.success("Thêm lịch đặt bàn thành công");
      this.setState({
        isNoon: false,
        isEvening: false,
      });
    } else {
      toast.error(res.errMessage);
    }
  };

  render() {
    const { language, userInfo } = this.props;
    const { listRestaurant, restaurantSelected, listTime, isNoon, isEvening } =
      this.state;

    return (
      <>
        <Container className="mt-3">
          <Grid className="schedule-management-container">
            <Grid className="title mb-3">Quản lý lịch đặt bàn</Grid>
            <Grid container spacing={2} className="schedule-management-top">
              <Grid item xs={4}>
                <Select
                  className="w-100 mb-4 react-select"
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
              <Grid item xs={4}>
                <Flatpickr
                  className="schedule-management-flatpickr"
                  ref={(fp) => {
                    this.fp = fp;
                  }}
                  onChange={(selectedDates) => {
                    this.handleChangeDatePicker(selectedDates);
                  }}
                  options={{
                    mode: "range",
                    defaultDate: [
                      "today",
                      new Date().fp_incr(
                        process.env.REACT_APP_DATE_PICKER_RANGE
                      ),
                    ],
                    dateFormat: "d/m/Y",
                    minDate: "today",
                    locale: {
                      firstDayOfWeek: 1,
                    },
                    monthSelectorType: "static",
                    position: "auto center",
                    ignoredFocusElements: [window.document.body],
                  }}
                />
              </Grid>
              <Grid item xs={2}>
                <Button
                  className={
                    isNoon && isEvening
                      ? "w-75 btn-full-time time-active"
                      : "w-75 btn-full-time"
                  }
                  variant="outlined"
                  onClick={() => {
                    this.handleChangeScheduleSelected("full");
                  }}
                >
                  Cả ngày
                </Button>
              </Grid>
              <Grid item xs={1}>
                <Button
                  className={
                    isNoon && !isEvening
                      ? "w-100 btn-noon time-active"
                      : "w-100 btn-noon"
                  }
                  variant="outlined"
                  onClick={() => {
                    this.handleChangeScheduleSelected("noon");
                  }}
                  disabled={isNoon && isEvening ? true : false}
                >
                  Trưa
                </Button>
              </Grid>
              <Grid item xs={1}>
                <Button
                  className={
                    isEvening && !isNoon
                      ? "w-100 btn-evening time-active"
                      : "w-100 btn-evening"
                  }
                  variant="outlined"
                  onClick={() => {
                    this.handleChangeScheduleSelected("evening");
                  }}
                  disabled={isNoon && isEvening ? true : false}
                >
                  Tối
                </Button>
              </Grid>
            </Grid>
            <Grid className="schedule-management-bottom mt-4">
              <Grid container spacing={1} className="list-schedule">
                {isExistArrayAndNotEmpty(listTime) &&
                  listTime.slice(0, 6).map((item) => {
                    return (
                      <Grid
                        key={item.keyMap}
                        item
                        xs={1}
                        className="schedule-content"
                      >
                        <Button
                          className={isNoon ? "w-100 schedule-active" : "w-100"}
                          variant="outlined"
                          disabled
                        >
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </Button>
                      </Grid>
                    );
                  })}
                {isExistArrayAndNotEmpty(listTime) &&
                  listTime.slice(6, 12).map((item) => {
                    return (
                      <Grid
                        key={item.keyMap}
                        item
                        xs={1}
                        className="schedule-content"
                      >
                        <Button
                          className={
                            isEvening ? "w-100 schedule-active" : "w-100"
                          }
                          variant="outlined"
                          disabled
                        >
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </Button>
                      </Grid>
                    );
                  })}
              </Grid>
              <Grid className="mt-5">
                <Button
                  className="btn-save"
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    this.handleAddRestaurantSchedule();
                  }}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </Grid>
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
    listTime: state.allCode.listTime,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllRestaurant: (data, language) =>
      dispatch(actions.getListRestaurant(data, language)),
    getAllTime: (code) => dispatch(actions.getAllTime(code)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleManagement);
