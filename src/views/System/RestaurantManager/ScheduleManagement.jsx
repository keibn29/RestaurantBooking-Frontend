import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ScheduleManagement.scss";
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
  customReactSelectStyles,
  NUMBER_DATE_SELECTED_DATE_PICKER_ADDITION,
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
      let dataSelect = this.buildDataInputSelect(this.props.listRestaurant);
      this.setState({
        listRestaurant: dataSelect,
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

  buildDataInputSelect = (listRestaurant) => {
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

  handleChangeRestaurantSelected = (restaurantSelected) => {
    this.setState({
      restaurantSelected: restaurantSelected,
    });
  };

  getLastDefaultDateFromDatePicker = () => {
    const lastDate = new Date();
    lastDate.setDate(
      lastDate.getDate() + NUMBER_DATE_SELECTED_DATE_PICKER_ADDITION
    );
    this.setState({
      lastDate: lastDate,
    });
  };

  handleChangeDatePicker = (selectedDates) => {
    this.setState({
      firstDate: selectedDates[0],
      lastDate: selectedDates[1],
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
      this.getLastDefaultDateFromDatePicker();
      this.setState({
        restaurantSelected: "",
        firstDate: new Date(),
        isNoon: false,
        isEvening: false,
      });
    } else {
      toast.error(res.errMessage);
    }
  };

  render() {
    const { language } = this.props;
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
                  styles={customReactSelectStyles}
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
                        NUMBER_DATE_SELECTED_DATE_PICKER_ADDITION
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
                        key={item.id}
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
                        key={item.id}
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
