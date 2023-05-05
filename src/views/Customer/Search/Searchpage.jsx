import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import HomeHeader from "../Homepage/HomeHeader/HomeHeader";
import HomeFooter from "../Homepage/HomeFooter/HomeFooter";
import Flatpickr from "react-flatpickr";
import { Grid, Icon, Button, Container } from "@material-ui/core";
import {
  FormControlLabel,
  Checkbox,
  Slider,
  RadioGroup,
  Radio,
} from "@mui/material";
import {
  ALLCODES,
  isExistArrayAndNotEmpty,
  LANGUAGES,
  OBJECT,
  NUMBER_PEOPLE_BOOKING,
  PAGE_SIZE_PAGINATION,
  PRICE_RANGE,
  PROVINCES,
  PAGE,
  PATH,
} from "../../../utils";
import "./Searchpage.scss";
import RestaurantResult from "./Results/RestaurantResult";
import DishResult from "./Results/DishResult";
import ChatRealTime from "../Homepage/ChatRealTime/ChatRealTime";
import HandbookResult from "./Results/HandbookResult";
import { FormattedMessage } from "react-intl";

class Searchpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scoreRange: [0, 5],
      priceRange: [0, 3],
      objectSelected: OBJECT.RESTAURANT,
      listCountry: [],
      listNumberPeople: [...Array(NUMBER_PEOPLE_BOOKING).keys()].map(
        (item) => ++item
      ),
      date: "",
      listTime: [],
      timeSelected: "",
      numberPeople: "",
      isShowOptionPeople: false,
      isOpenDatePicker: false,
      isShowOptionTime: false,
      isFocusOptionLeft: false,
      keywordSearch: "",
      provinceIdSearch: PROVINCES.HANOI,
      provinceLabel: "",
      pageOrder: 1,
    };
  }

  componentDidMount() {
    this.props.getAllSchedule(ALLCODES.TIME);
    this.props.getAllCountry(ALLCODES.COUNTRY);
    this.getKeywordAndProvinceSearch();
    this.getObjectSlectedDefault();
    document.getElementById("searchpage-top").scrollIntoView({
      block: "end",
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listTime !== this.props.listTime) {
      this.setState({
        listTime: this.props.listTime,
      });
    }
    if (prevProps.listCountry !== this.props.listCountry) {
      const listCountry = this.addFieldToListCountry();
      this.setState({
        listCountry: listCountry,
      });
    }
    if (
      this.props.location &&
      prevProps.location.state !== this.props.location.state
    ) {
      this.getKeywordAndProvinceSearch();
      this.resetPageOrder();
    }
    if (prevProps.language !== this.props.language) {
      this.getProvinceNameByLanguage();
    }
  }

  resetPageOrder = () => {
    this.setState({
      pageOrder: 1,
    });
    document.getElementById("searchpage-top").scrollIntoView({
      block: "end",
    });
  };

  getProvinceNameByLanguage = () => {
    const { listProvince, language } = this.props;
    const { provinceIdSearch } = this.state;
    let province = listProvince.find(
      (item) => item.keyMap === provinceIdSearch
    );
    const provinceLabel =
      language === LANGUAGES.VI ? province?.valueVi : province?.valueEn;
    this.setState({
      provinceLabel: provinceLabel,
    });
  };

  getObjectSlectedDefault = () => {
    if (
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.object
    ) {
      this.setState(
        {
          objectSelected: this.props.location.state.object,
        },
        () => {
          this.getResultContentByObjectSelected();
        }
      );
    }
  };

  getKeywordAndProvinceSearch = () => {
    if (this.props.location?.state?.province) {
      const keyword = this.props.location?.state?.keyword
        ? this.props.location.state.keyword.trim()
        : "";
      console.log(this.props.location.state.province);
      this.setState(
        {
          keywordSearch: keyword,
          provinceIdSearch: this.props.location.state.province.value,
          provinceLabel: this.props.location.state.province.label,
        },
        () => {
          this.fetchRestaurantBySearchContent();
          this.fetchDishBySearchContent();
          this.fetchHandbookBySearchContent();
        }
      );
    } else {
      this.fetchRestaurantBySearchContent();
      this.fetchDishBySearchContent();
      this.fetchHandbookBySearchContent();
    }
  };

  fetchRestaurantBySearchContent = () => {
    const { language } = this.props;
    const {
      keywordSearch,
      provinceIdSearch,
      scoreRange,
      numberPeople,
      date,
      timeSelected,
      pageOrder,
    } = this.state;
    const priceRange = this.getPriceRangePassToApi();
    const listCountryId = this.getListCountryIdPassToApi();

    let data = {
      pageSize: PAGE_SIZE_PAGINATION,
      pageOrder,
      keyword: keywordSearch,
      provinceId: provinceIdSearch,
      listCountryId,
      scoreRange,
      priceRange,
      table: Math.ceil(numberPeople / 6),
      date,
      timeType: timeSelected,
      page: PAGE.SEARCHPAGE,
    };
    this.props.getRestaurantBySearchContent(data, language);
  };

  fetchDishBySearchContent = () => {
    const { language } = this.props;
    const { keywordSearch, provinceIdSearch, pageOrder } = this.state;
    const priceRange = this.getPriceRangePassToApi();
    const listCountryId = this.getListCountryIdPassToApi();

    let data = {
      pageSize: PAGE_SIZE_PAGINATION,
      pageOrder,
      keyword: keywordSearch,
      provinceId: provinceIdSearch,
      listCountryId,
      priceRange,
      page: PAGE.SEARCHPAGE,
    };
    this.props.getListDishBySearchContent(data, language);
  };

  getPriceRangePassToApi = () => {
    const { language } = this.props;
    let { priceRange } = this.state;

    priceRange = priceRange.map((item) => {
      if (item === 1) {
        item =
          language === LANGUAGES.VI
            ? PRICE_RANGE.SECOND_MILESTONE_VI
            : PRICE_RANGE.SECOND_MILESTONE_EN;
      }
      if (item === 2) {
        item =
          language === LANGUAGES.VI
            ? PRICE_RANGE.THIRD_MILESTONE_VI
            : PRICE_RANGE.THIRD_MILESTONE_EN;
      }
      if (item === 3) {
        item = PRICE_RANGE.MAX_MILESTONE;
      }
      return item;
    });

    return priceRange;
  };

  getListCountryIdPassToApi = () => {
    const { listCountry } = this.state;
    let listCountryId = [];
    if (isExistArrayAndNotEmpty(listCountry)) {
      listCountry.map((item) => {
        if (item.isSelected) {
          listCountryId.push(item.keyMap);
        }
        return listCountryId;
      });
    }

    return listCountryId;
  };

  fetchHandbookBySearchContent = () => {
    const { language } = this.props;
    const { pageOrder, keywordSearch } = this.state;
    let data = {
      pageSize: PAGE_SIZE_PAGINATION,
      pageOrder: pageOrder,
      keyword: keywordSearch,
      language,
    };
    this.props.getListHandbookBySearchContent(data);
  };

  addFieldToListCountry = () => {
    let { listCountry } = this.props;

    if (isExistArrayAndNotEmpty(listCountry)) {
      listCountry = listCountry.map((item) => ({
        ...item,
        isSelected: false,
      }));
    }

    return listCountry;
  };

  handleChangeObjectRadio = (event) => {
    this.setState(
      {
        objectSelected: event.target.value,
        pageOrder: 1,
      },
      () => {
        this.getResultContentByObjectSelected();
      }
    );
  };

  getResultContentByObjectSelected = () => {
    const pathname = PATH.SEARCHPAGE;
    const { history } = this.props;
    if (!history) {
      return;
    }

    const { objectSelected } = this.state;
    if (objectSelected === OBJECT.RESTAURANT) {
      history.push({
        pathname,
        state: {
          object: OBJECT.RESTAURANT,
        },
      });
      this.fetchRestaurantBySearchContent();
    } else if (objectSelected === OBJECT.DISH) {
      history.push({
        pathname,
        state: {
          object: OBJECT.DISH,
        },
      });
      this.fetchDishBySearchContent();
    } else {
      history.push({
        pathname,
        state: {
          object: OBJECT.HANDBOOK,
        },
      });
      this.fetchHandbookBySearchContent();
    }
  };

  handleChangeCheckBox = (event, countryId) => {
    this.resetPageOrder();
    let { listCountry } = this.state;
    if (isExistArrayAndNotEmpty(listCountry)) {
      listCountry = listCountry.map((item) => {
        if (item.keyMap === countryId) {
          item.isSelected = event.target.checked;
        }
        return item;
      });
      this.setState(
        {
          listCountry: listCountry,
        },
        () => {
          this.fetchRestaurantBySearchContent();
          this.fetchDishBySearchContent();
        }
      );
    }
  };

  handleChangeSliderRange = (event, newValue, activeThumb) => {
    this.resetPageOrder();
    if (!Array.isArray(newValue)) {
      return;
    }

    let copyState = { ...this.state };
    const minDistance = 1;
    if (activeThumb === 0) {
      copyState[event.target.name] = [
        Math.min(newValue[0], copyState[event.target.name][1] - minDistance),
        copyState[event.target.name][1],
      ];
      this.setState(
        {
          ...copyState,
        },
        () => {
          this.fetchRestaurantBySearchContent();
          this.fetchDishBySearchContent();
        }
      );
    } else {
      copyState[event.target.name] = [
        copyState[event.target.name][0],
        Math.max(newValue[1], copyState[event.target.name][0] + minDistance),
      ];
      this.setState(
        {
          ...copyState,
        },
        () => {
          this.fetchRestaurantBySearchContent();
          this.fetchDishBySearchContent();
        }
      );
    }
  };

  handleShowHideOptionPeople = () => {
    this.setState({
      isShowOptionPeople: !this.state.isShowOptionPeople,
      isOpenDatePicker: false,
      isShowOptionTime: false,
      isFocusOptionLeft: true,
    });
    if (this.fp) {
      this.fp.flatpickr.close();
    }
  };

  handleChangeNumberPeopleSelected = (numberSelected) => {
    this.setState({
      numberPeople: numberSelected,
    });
  };

  handleOpenCloseDatePicker = () => {
    this.setState(
      {
        isOpenDatePicker: !this.state.isOpenDatePicker,
        isShowOptionPeople: false,
        isShowOptionTime: false,
        isFocusOptionLeft: true,
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
  };

  handleShowHideOptionTime = () => {
    this.setState({
      isShowOptionPeople: false,
      isOpenDatePicker: false,
      isShowOptionTime: !this.state.isShowOptionTime,
      isFocusOptionLeft: true,
    });
    if (this.fp) {
      this.fp.flatpickr.close();
    }
  };

  handleChangeTimeSelected = (timeTypeSelected) => {
    this.setState({
      timeSelected: timeTypeSelected,
    });
  };

  handleClearSchedule = () => {
    this.setState(
      {
        date: "",
        timeSelected: "",
        numberPeople: "",
        isShowOptionPeople: false,
        isOpenDatePicker: false,
        isShowOptionTime: false,
        isFocusOptionLeft: false,
      },
      () => {
        this.fetchRestaurantBySearchContent();
      }
    );
  };

  handleApplySchedule = () => {
    this.resetPageOrder();
    const { numberPeople, date, timeSelected } = this.state;
    if (numberPeople && date && timeSelected) {
      this.setState(
        {
          isFocusOptionLeft: false,
        },
        () => {
          this.fetchRestaurantBySearchContent();
        }
      );
    }
  };

  handleChangePageOrder = (newPage) => {
    this.setState(
      {
        pageOrder: newPage,
      },
      () => {
        this.fetchRestaurantBySearchContent();
        this.fetchDishBySearchContent();
        this.fetchHandbookBySearchContent();
      }
    );
    document.getElementById("searchpage-top").scrollIntoView({
      block: "end",
    });
  };

  getScheduleHTML = () => {
    const { language } = this.props;
    const { timeSelected, listTime } = this.state;
    if (!timeSelected || !isExistArrayAndNotEmpty(listTime)) {
      return <FormattedMessage id="customer.search.time" />;
    }

    const timeObj = listTime.find((item) => item.keyMap === timeSelected);
    if (language === LANGUAGES.VI) {
      return <span className="option-child-data">{timeObj.valueVi}</span>;
    }

    return <span className="option-child-data">{timeObj.valueEn}</span>;
  };

  render() {
    const { language } = this.props;
    const {
      scoreRange,
      priceRange,
      objectSelected,
      listCountry,
      date,
      listNumberPeople,
      numberPeople,
      listTime,
      timeSelected,
      isShowOptionPeople,
      isShowOptionTime,
      isFocusOptionLeft,
      pageOrder,
      provinceLabel,
    } = this.state;
    const scoreMarks = [
      {
        value: 0,
        label: 0,
      },
      {
        value: 1,
        label: 1,
      },
      {
        value: 2,
        label: 2,
      },
      {
        value: 3,
        label: 3,
      },
      {
        value: 4,
        label: 4,
      },
      {
        value: 5,
        label: 5,
      },
    ];
    const priceMarks = [
      {
        value: 0,
        label: 0,
      },
      {
        value: 1,
        label: `${Number(100000).toLocaleString()}đ`,
      },
      {
        value: 2,
        label: `${Number(1000000).toLocaleString()}đ`,
      },
      {
        value: 3,
        label: "More",
      },
    ];

    return (
      <>
        <Grid className="searchpage-container">
          <HomeHeader isShowHeaderSearch={true} />
          <Container className="searchpage-body">
            <Grid container spacing={3}>
              <Grid item xs={3}>
                <Grid className="searchpage-content filter mt-4">
                  <Grid className="filter-container">
                    <Grid className="filter-content">
                      <Grid className="filter-title mb-1" id="searchpage-top">
                        <FormattedMessage id="customer.search.object" />
                      </Grid>
                      <Grid>
                        <RadioGroup
                          value={objectSelected}
                          onChange={(event) => {
                            this.handleChangeObjectRadio(event);
                          }}
                        >
                          <FormControlLabel
                            className="check-box"
                            value={OBJECT.RESTAURANT}
                            control={<Radio color="colorhome" size="small" />}
                            label={
                              language === LANGUAGES.VI
                                ? "Nhà hàng"
                                : "Restaurant"
                            }
                          />
                          <FormControlLabel
                            className="check-box"
                            value={OBJECT.DISH}
                            control={<Radio color="colorhome" size="small" />}
                            label={
                              language === LANGUAGES.VI ? "Món ăn" : "Dish"
                            }
                          />
                          <FormControlLabel
                            className="check-box"
                            value={OBJECT.HANDBOOK}
                            control={<Radio color="colorhome" size="small" />}
                            label={
                              language === LANGUAGES.VI
                                ? "Cẩm nang"
                                : "Handbook"
                            }
                          />
                        </RadioGroup>
                      </Grid>
                    </Grid>
                    <Grid className="filter-content mt-3">
                      <Grid className="filter-title mb-1">
                        <FormattedMessage id="customer.search.country" />
                      </Grid>
                      <Grid>
                        {isExistArrayAndNotEmpty(listCountry) &&
                          listCountry.map((item) => {
                            return (
                              <Grid key={item.keyMap}>
                                <FormControlLabel
                                  className="check-box"
                                  control={
                                    <Checkbox
                                      color="colorhome"
                                      size="small"
                                      onChange={(event) => {
                                        this.handleChangeCheckBox(
                                          event,
                                          item.keyMap
                                        );
                                      }}
                                    />
                                  }
                                  label={
                                    language === LANGUAGES.VI
                                      ? item.valueVi
                                      : item.valueEn
                                  }
                                  disabled={
                                    objectSelected === OBJECT.HANDBOOK
                                      ? true
                                      : false
                                  }
                                />
                              </Grid>
                            );
                          })}
                      </Grid>
                    </Grid>
                    <Grid className="filter-content mt-3">
                      <Grid className="filter-title mb-1">
                        <FormattedMessage id="customer.search.price-range" />
                      </Grid>
                      <Grid className="px-2">
                        <Slider
                          name="priceRange"
                          color="colorhome"
                          value={priceRange}
                          step={1}
                          marks={priceMarks}
                          min={0}
                          max={3}
                          disableSwap
                          onChange={(event, newValue, activeThumb) => {
                            this.handleChangeSliderRange(
                              event,
                              newValue,
                              activeThumb
                            );
                          }}
                          disabled={
                            objectSelected === OBJECT.HANDBOOK ? true : false
                          }
                        />
                      </Grid>
                    </Grid>
                    <Grid className="filter-content mt-3">
                      <Grid className="filter-title mb-1">
                        <FormattedMessage id="customer.search.average-score" />
                      </Grid>
                      <Grid className="px-2">
                        <Slider
                          name="scoreRange"
                          color="colorhome"
                          value={scoreRange}
                          step={1}
                          marks={scoreMarks}
                          min={0}
                          max={5}
                          disableSwap
                          onChange={(event, newValue, activeThumb) => {
                            this.handleChangeSliderRange(
                              event,
                              newValue,
                              activeThumb
                            );
                          }}
                          disabled={
                            objectSelected === OBJECT.RESTAURANT ? false : true
                          }
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={9}>
                <Grid className="searchpage-content schedule mt-4">
                  <Grid className="schedule-container">
                    {objectSelected === OBJECT.RESTAURANT && (
                      <>
                        <Grid className="schedule-title">
                          <FormattedMessage id="customer.search.restaurant-in" />{" "}
                          {provinceLabel || (
                            <FormattedMessage id="customer.search.hanoi" />
                          )}
                        </Grid>
                        <Grid className="schedule-content mt-2">
                          <Grid className="schedule-content-top">
                            <FormattedMessage id="customer.restaurant.schedule.book-a-table" />
                          </Grid>
                          <Grid
                            className="schedule-content-bottom mt-2"
                            container
                          >
                            <Grid
                              item
                              xs={11}
                              className={
                                isFocusOptionLeft
                                  ? "bottom-left bottom-left-focus"
                                  : "bottom-left"
                              }
                              container
                            >
                              <Grid className="bottom-left-option" container>
                                <Grid
                                  item
                                  xs={4}
                                  className="option-child select-people"
                                  container
                                  alignItems="center"
                                  onClick={() => {
                                    this.handleShowHideOptionPeople();
                                  }}
                                >
                                  <Icon>people_alt</Icon>
                                  {numberPeople ? (
                                    <span className="option-child-data">
                                      {numberPeople}{" "}
                                      <FormattedMessage id="customer.restaurant.schedule.people" />
                                    </span>
                                  ) : (
                                    <FormattedMessage id="customer.search.people-cap" />
                                  )}
                                  {isShowOptionPeople && (
                                    <Grid
                                      className="list-number"
                                      container
                                      justify="center"
                                    >
                                      {isExistArrayAndNotEmpty(
                                        listNumberPeople
                                      ) &&
                                        listNumberPeople.map((item) => {
                                          return (
                                            <Grid
                                              key={item}
                                              className={
                                                item === numberPeople
                                                  ? "number-item number-active"
                                                  : "number-item"
                                              }
                                              onClick={() => {
                                                this.handleChangeNumberPeopleSelected(
                                                  item
                                                );
                                              }}
                                              container
                                              justify="center"
                                              alignItems="center"
                                            >
                                              {item}
                                            </Grid>
                                          );
                                        })}
                                    </Grid>
                                  )}
                                </Grid>
                                <Grid
                                  item
                                  xs={4}
                                  className={
                                    date
                                      ? "option-child date-picker selected"
                                      : "option-child date-picker"
                                  }
                                  container
                                  alignItems="center"
                                  onClick={() => {
                                    this.handleOpenCloseDatePicker();
                                  }}
                                >
                                  <Icon>calendar_today</Icon>
                                  {!date && (
                                    <FormattedMessage id="customer.search.date" />
                                  )}
                                  <Flatpickr
                                    ref={(fp) => {
                                      this.fp = fp;
                                    }}
                                    onChange={([date]) => {
                                      this.handleChangeDatePicker(date);
                                    }}
                                    value={date}
                                    options={{
                                      dateFormat:
                                        language === LANGUAGES.VI
                                          ? "d/m/Y"
                                          : "m/d/Y",
                                      minDate: "today",
                                      maxDate: new Date().fp_incr(30),
                                      locale: {
                                        firstDayOfWeek: 1,
                                      },
                                      monthSelectorType: "static",
                                      position: "auto center",
                                      ignoredFocusElements: [
                                        window.document.body,
                                      ],
                                    }}
                                    onDayCreate={function (
                                      dObj,
                                      dStr,
                                      fp,
                                      dayElem
                                    ) {
                                      const dateItem = new Date(
                                        dayElem.dateObj
                                      ).getTime();
                                      if (dateItem === date) {
                                        dayElem.className += " colorhome";
                                      }
                                    }}
                                  />
                                </Grid>
                                <Grid
                                  item
                                  xs={4}
                                  className="option-child time"
                                  container
                                  alignItems="center"
                                  onClick={() => {
                                    this.handleShowHideOptionTime();
                                  }}
                                >
                                  <Icon>schedule</Icon>
                                  {this.getScheduleHTML()}
                                  {isShowOptionTime && (
                                    <Grid
                                      className="list-time"
                                      container
                                      spacing={1}
                                    >
                                      {isExistArrayAndNotEmpty(listTime) &&
                                        listTime.map((item) => {
                                          return (
                                            <Grid key={item.keyMap} item xs={4}>
                                              <Button
                                                className={
                                                  timeSelected === item.keyMap
                                                    ? "w-100 time-item time-active"
                                                    : "w-100 time-item"
                                                }
                                                onClick={() => {
                                                  this.handleChangeTimeSelected(
                                                    item.keyMap
                                                  );
                                                }}
                                              >
                                                {language === LANGUAGES.VI
                                                  ? item.valueVi
                                                  : item.valueEn}
                                              </Button>
                                            </Grid>
                                          );
                                        })}
                                    </Grid>
                                  )}
                                </Grid>
                              </Grid>
                              <Grid
                                className={
                                  numberPeople && date && timeSelected
                                    ? "bottom-left-apply apply"
                                    : "bottom-left-apply"
                                }
                                container
                                justify="center"
                                alignItems="center"
                                onClick={() => {
                                  this.handleApplySchedule();
                                }}
                              >
                                <FormattedMessage id="customer.search.apply" />
                              </Grid>
                            </Grid>
                            {(numberPeople || date || timeSelected) && (
                              <Grid
                                item
                                xs={1}
                                className="bottom-right-cancel"
                                container
                                justify="center"
                                alignItems="center"
                                onClick={() => {
                                  this.handleClearSchedule();
                                }}
                              >
                                <FormattedMessage id="customer.profile.booking-history.cancel" />
                              </Grid>
                            )}
                          </Grid>
                        </Grid>
                        <Grid className="schedule-text mt-4 pt-3">
                          <FormattedMessage id="customer.search.text-description-restaurant" />
                        </Grid>
                      </>
                    )}
                    {objectSelected === OBJECT.DISH && (
                      <>
                        <Grid className="schedule-title">
                          <FormattedMessage id="customer.search.restaurant-in" />{" "}
                          {provinceLabel || (
                            <FormattedMessage id="customer.search.hanoi" />
                          )}
                        </Grid>
                        <Grid className="schedule-text mt-4 pt-3">
                          <FormattedMessage id="customer.search.text-description-dish" />
                        </Grid>
                      </>
                    )}
                    {objectSelected === OBJECT.HANDBOOK && (
                      <>
                        <Grid className="schedule-title">
                          <FormattedMessage id="customer.search.what-handbook" />
                        </Grid>
                        <Grid className="schedule-text mt-4 pt-3">
                          <FormattedMessage id="customer.search.text-description-handbook" />
                        </Grid>
                      </>
                    )}
                  </Grid>
                </Grid>
                <Grid className="list-search-result">
                  {objectSelected === OBJECT.RESTAURANT && (
                    <RestaurantResult
                      changePageOrder={this.handleChangePageOrder}
                      pageOrder={pageOrder}
                      date={date}
                    />
                  )}
                  {objectSelected === OBJECT.DISH && (
                    <DishResult
                      changePageOrder={this.handleChangePageOrder}
                      pageOrder={pageOrder}
                    />
                  )}
                  {objectSelected === OBJECT.HANDBOOK && (
                    <HandbookResult
                      changePageOrder={this.handleChangePageOrder}
                      pageOrder={pageOrder}
                    />
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Container>
          <ChatRealTime />
          <HomeFooter />
        </Grid>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    listTime: state.allCode.listTime,
    listCountry: state.allCode.listCountry,
    listProvince: state.allCode.listProvince,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllSchedule: (code) => dispatch(actions.getAllTime(code)),
    getAllCountry: (code) => dispatch(actions.getAllCountry(code)),
    getRestaurantBySearchContent: (data, language) =>
      dispatch(actions.getListRestaurant(data, language)),
    getListDishBySearchContent: (data, language) =>
      dispatch(actions.getListDish(data, language)),
    getListHandbookBySearchContent: (data) =>
      dispatch(actions.getListHandbook(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Searchpage);
