import React, { Component } from "react";
import { connect } from "react-redux";
import {
  isExistArrayAndNotEmpty,
  LANGUAGES,
  TIMETYPE,
  WORK_TIME_OF_DAY,
} from "../../../../utils";
import { Skeleton } from "@mui/material";
import { getScheduleByDate } from "../../../../services/restaurantService";

class ScheduleNextWeek extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listScheduleByDay: [],
      workTimeOfDayVi: WORK_TIME_OF_DAY.CLOSE_VI,
      workTimeOfDayEn: WORK_TIME_OF_DAY.CLOSE_EN,
      isLoading: true,
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
    const res = await getScheduleByDate({ restaurantId, date });
    if (res && res.errCode === 0) {
      this.setState({
        listScheduleByDay: res.listSchedule,
        isLoading: false,
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
    const { language } = this.props;
    const { workTimeOfDayVi, workTimeOfDayEn, isLoading } = this.state;

    return (
      <>
        {isLoading ? (
          <>
            <Skeleton variant="text" />
          </>
        ) : (
          <>{language === LANGUAGES.VI ? workTimeOfDayVi : workTimeOfDayEn}</>
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleNextWeek);
