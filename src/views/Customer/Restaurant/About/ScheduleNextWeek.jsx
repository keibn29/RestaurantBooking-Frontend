import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import {
  isExistArrayAndNotEmpty,
  LANGUAGE,
  LANGUAGES,
  NAV_DETAIL_RESTAURANT,
  TIMETYPE,
  WORK_TIME_OF_DAY,
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
import moment from "moment";
import "moment/locale/vi";
import ReviewContent from "../Reviews/ReviewContent";
import MenuContent from "../Menu/MenuContent";
import { getScheduleByDate } from "../../../../services/restaurantService";

class ScheduleNextWeek extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listScheduleByDay: [],
      workTimeOfDayVi: WORK_TIME_OF_DAY.CLOSE_VI,
      workTimeOfDayEn: WORK_TIME_OF_DAY.CLOSE_EN,
    };
  }

  componentDidMount() {
    this.fetchListScheduleByDate();
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevState.listScheduleByDay !== this.state.listScheduleByDay &&
      isExistArrayAndNotEmpty(this.state.listScheduleByDay)
    ) {
      this.setWorkTimeOfDay();
    }
  }

  fetchListScheduleByDate = async () => {
    const { restaurantId, date } = this.props;
    const res = await getScheduleByDate(restaurantId, date);
    if (res && res.errCode === 0) {
      this.setState({
        listScheduleByDay: res.listSchedule,
      });
    }
  };

  setWorkTimeOfDay = () => {
    const { listScheduleByDay } = this.state;
    if (listScheduleByDay.length === 12) {
      this.setState({
        workTimeOfDayVi: WORK_TIME_OF_DAY.FULLTIME_VI,
        workTimeOfDayEn: WORK_TIME_OF_DAY.FULLTIME_EN,
      });
    } else if (listScheduleByDay[0].timeType === TIMETYPE.T01) {
      this.setState({
        workTimeOfDayVi: WORK_TIME_OF_DAY.NOON_VI,
        workTimeOfDayEn: WORK_TIME_OF_DAY.NOON_EN,
      });
    } else {
      this.setState({
        workTimeOfDayVi: WORK_TIME_OF_DAY.EVENING_VI,
        workTimeOfDayEn: WORK_TIME_OF_DAY.EVENING_EN,
      });
    }
  };

  render() {
    const { language, restaurantId } = this.props;
    const { workTimeOfDayVi, workTimeOfDayEn } = this.state;

    return <>{language === LANGUAGES.VI ? workTimeOfDayVi : workTimeOfDayEn}</>;
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

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleNextWeek);
