import convertSolarLunar from './convertSolarLunar';
import {
  Logger,
  GetDate,
  deepClone,
  getDateTimeStamp,
  uniqueArrayByDate,
  delRepeatedEnableDay,
  convertEnableAreaToTimestamp,
  converEnableDaysToTimestamp
} from './utils';

const logger = new Logger();
const getDate = new GetDate();
const toString = Object.prototype.toString;

class Day {
  constructor (vm) {
    this.vm = vm;
  }

  /**
   *
   * @param {number} year
   * @param {number} month
   */
  buildDate (year, month) {
    const today = getDate.todayDate();
    const thisMonthDays = getDate.thisMonthDays(year, month);
    const dates = [];
    // const { showLunar } = this.vm.cConfig;
    for (let i = 1; i <= thisMonthDays; i++) {
      const isToday = +today.year === +year && +today.month === +month && i === +today.date;
      const date = {
        year,
        month,
        day: i,
        choosed: false,
        week: getDate.dayOfWeek(year, month, i),
        isToday: isToday && this.vm.cConfig.highlightToday,
        lunar: convertSolarLunar.solar2lunar(+year, +month, +i)
      };
      // if (showLunar) {
      //   date.lunar = convertSolarLunar.solar2lunar(
      //     +date.year,
      //     +date.month,
      //     +date.day
      //   );
      // }
      dates.push(date);
    }
    return dates;
  }

  /**
   * 指定可选日期范围
   * @param {array} dateArea 日期访问数组
   */
  enableArea (dateArea = []) {
    if (dateArea.length === 2) {
      const isRight = this.__judgeParam(dateArea);
      if (isRight) {
        let { days = [], selectedDay = [] } = this.vm.calendar;
        const { startTimestamp, endTimestamp } = convertEnableAreaToTimestamp(
          dateArea
        );
        const dataAfterHandle = this.__handleEnableArea(
          {
            dateArea,
            days,
            startTimestamp,
            endTimestamp
          },
          selectedDay
        );
        this.vm.calendar.enableArea = dateArea
        this.vm.calendar.days = dataAfterHandle.dates
        this.vm.calendar.selectedDay = dataAfterHandle.selectedDay
        this.vm.calendar.enableAreaTimestamp = [startTimestamp, endTimestamp]
      }
    } else {
      logger.warn(
        'enableArea()参数需为时间范围数组，形如：["2018-8-4" , "2018-8-24"]'
      );
    }
  }

  /**
   * 指定特定日期可选
   * @param {array} dates 指定日期数组
   */
  enableDays (dates = []) {
    const { enableArea = [] } = this.vm.calendar;
    let expectEnableDaysTimestamp = [];
    if (enableArea.length) {
      expectEnableDaysTimestamp = delRepeatedEnableDay(dates, enableArea);
    } else {
      expectEnableDaysTimestamp = converEnableDaysToTimestamp(dates);
    }
    let { days = [], selectedDay = [] } = this.vm.calendar;
    const dataAfterHandle = this.__handleEnableDays(
      {
        days,
        expectEnableDaysTimestamp
      },
      selectedDay
    );
    this.vm.calendar.days = dataAfterHandle.dates
    this.vm.calendar.selectedDay = dataAfterHandle.selectedDay
    this.vm.calendar.enableDays = dates
    this.vm.calendar.enableAreaTimestamp = expectEnableDaysTimestamp
  }

  /**
   * 设置多个日期选中
   * @param {array} selected 需选中日期
   */
  setSelectedDays (selected) {
    if (!this.vm.cConfig.multi) {
      return logger.warn('单选模式下不能设置多日期选中，请配置 multi');
    }
    let { days } = this.vm.calendar;
    let newSelectedDay = [];
    if (!selected) {
      days.map(item => {
        item.choosed = true;
        item.showTodoLabel = false;
      });
      newSelectedDay = days;
    } else if (selected && selected.length) {
      const { dates, selectedDates } = this.__handleSelectedDays(
        days,
        newSelectedDay,
        selected
      );
      days = dates;
      newSelectedDay = selectedDates;
    }
    this.vm.cConfig.multi = true
    this.vm.calendar.days = days
    this.vm.calendar.selectedDay = newSelectedDay
  }

  /**
   * 禁用指定日期
   * @param {array} dates  禁用
   */
  disableDays (dates) {
    const { disableDays = [], days } = deepClone(this.vm.calendar);
    if (Object.prototype.toString.call(dates) !== '[object Array]') {
      return logger.warn('disableDays 参数为数组');
    }
    let _disableDays = [];
    if (dates.length) {
      _disableDays = uniqueArrayByDate(dates.concat(disableDays));
      const disableDaysCol = _disableDays.map(d => getDate.toTimeStr(d));
      days.forEach(item => {
        const cur = getDate.toTimeStr(item);
        if (disableDaysCol.includes(cur)) item.disable = true;
      });
    } else {
      days.forEach(item => {
        item.disable = false;
      });
    }
    this.vm.calendar.days = days
    this.vm.calendar.disableDays = _disableDays
  }

  /**
   * 设置连续日期选择区域
   * @param {array} dateArea 区域开始结束日期数组
   */
  chooseArea (dateArea = []) {
    return new Promise((resolve, reject) => {
      if (dateArea.length === 1) {
        dateArea = dateArea.concat(dateArea);
      }
      if (dateArea.length === 2) {
        const isRight = this.__judgeParam(dateArea);
        if (isRight) {
          const { startTimestamp, endTimestamp } = convertEnableAreaToTimestamp(
            dateArea
          );
          this.vm.cConfig.chooseAreaMode = true
          this.vm.cConfig.mulit = true
          this.vm.calendar.chooseAreaTimestamp = [startTimestamp, endTimestamp]

          this.__chooseContinuousDates(startTimestamp, endTimestamp)
            .then(resolve)
            .catch(reject);
        }
      }
    });
  }

  __pusheNextMonthDateArea (item, startTimestamp, endTimestamp, selectedDates) {
    const days = this.buildDate(item.year, item.month);
    let daysLen = days.length;
    for (let i = 0; i < daysLen; i++) {
      const item = days[i];
      const timeStamp = getDateTimeStamp(item);
      if (timeStamp <= endTimestamp && timeStamp >= startTimestamp) {
        selectedDates.push({
          ...item,
          choosed: true
        });
      }
      if (i === daysLen - 1 && timeStamp < endTimestamp) {
        this.__pusheNextMonthDateArea(
          getDate.nextMonth(item),
          startTimestamp,
          endTimestamp,
          selectedDates
        );
      }
    }
  }

  __pushPrevMonthDateArea (item, startTimestamp, endTimestamp, selectedDates) {
    const days = getDate.sortDates(
      this.buildDate(item.year, item.month),
      'desc'
    );
    let daysLen = days.length;
    let firstDate = getDateTimeStamp(days[0]);
    for (let i = 0; i < daysLen; i++) {
      const item = days[i];
      const timeStamp = getDateTimeStamp(item);
      if (timeStamp >= startTimestamp && timeStamp <= endTimestamp) {
        selectedDates.push({
          ...item,
          choosed: true
        });
      }
      if (i === daysLen - 1 && firstDate > startTimestamp) {
        this.__pushPrevMonthDateArea(
          getDate.prevMonth(item),
          startTimestamp,
          endTimestamp,
          selectedDates
        );
      }
    }
  }

  /**
   * 当设置日期区域非当前时保存其他月份的日期至已选日期数组
   * @param {object} info
   */
  __calcDateWhenNotInOneMonth (info) {
    const {
      firstDate,
      lastDate,
      startTimestamp,
      endTimestamp,
      filterSelectedDate
    } = info;
    if (getDateTimeStamp(firstDate) > startTimestamp) {
      this.__pushPrevMonthDateArea(
        getDate.prevMonth(firstDate),
        startTimestamp,
        endTimestamp,
        filterSelectedDate
      );
    }
    if (getDateTimeStamp(lastDate) < endTimestamp) {
      this.__pusheNextMonthDateArea(
        getDate.nextMonth(lastDate),
        startTimestamp,
        endTimestamp,
        filterSelectedDate
      );
    }
    const newSelectedDates = [...getDate.sortDates(filterSelectedDate)];
    return newSelectedDates;
  }

  /**
   * 设置连续日期段
   * @param {number} startTimestamp 连续日期段开始日期时间戳
   * @param {number} endTimestamp 连续日期段结束日期时间戳
   */
  __chooseContinuousDates (startTimestamp, endTimestamp) {
    return new Promise((resolve, reject) => {
      const { days, selectedDay = [] } = this.vm.calendar;
      const selectedDateStr = [];
      let filterSelectedDate = [];
      selectedDay.forEach(item => {
        const timeStamp = getDateTimeStamp(item);
        if (timeStamp >= startTimestamp && timeStamp <= endTimestamp) {
          filterSelectedDate.push(item);
          selectedDateStr.push(getDate.toTimeStr(item));
        }
      });
      days.forEach(item => {
        const timeStamp = getDateTimeStamp(item);
        const dateInSelecedArray = selectedDateStr.includes(
          getDate.toTimeStr(item)
        );
        if (timeStamp >= startTimestamp && timeStamp <= endTimestamp) {
          if (dateInSelecedArray) {
            return;
          }
          item.choosed = true;
          filterSelectedDate.push(item);
        } else {
          item.choosed = false;
          if (dateInSelecedArray) {
            const idx = filterSelectedDate.findIndex(
              selectedDate =>
                getDate.toTimeStr(selectedDate) === getDate.toTimeStr(item)
            );
            if (idx > -1) {
              filterSelectedDate.splice(idx, 1);
            }
          }
        }
      });
      const firstDate = days[0];
      const lastDate = days[days.length - 1];
      const newSelectedDates = this.__calcDateWhenNotInOneMonth({
        firstDate,
        lastDate,
        startTimestamp,
        endTimestamp,
        filterSelectedDate
      });
      try {
        this.vm.calendar.days = [...days];
        this.vm.calendar.selectedDay = newSelectedDates;
        this.vm.$nextTick(() => {
          resolve(newSelectedDates);
        })
      } catch (err) {
        reject(err);
      }
    });
  }

  /**
   * 设置指定日期样式
   * @param {array} dates 待设置特殊样式的日期
   */
  setDateStyle (dates) {
    if (toString.call(dates) !== '[object Array]') return;
    const { days, specialStyleDates } = this.vm.calendar;
    if (toString.call(specialStyleDates) === '[object Array]') {
      dates = uniqueArrayByDate([...specialStyleDates, ...dates]);
    }
    const _specialStyleDates = dates.map(
      item => `${item.year}_${item.month}_${item.day}`
    );
    const _days = days.map(item => {
      const idx = _specialStyleDates.indexOf(
        `${item.year}_${item.month}_${item.day}`
      );
      if (idx > -1) {
        return {
          ...item,
          class: dates[idx].class
        };
      } else {
        return { ...item };
      }
    });
    this.vm.calendar.days = _days;
    this.vm.calendar.specialStyleDates = dates;
  }

  __judgeParam (dateArea) {
    const {
      start,
      end,
      startTimestamp,
      endTimestamp
    } = convertEnableAreaToTimestamp(dateArea);
    if (!start || !end) return;
    const startMonthDays = getDate.thisMonthDays(start[0], start[1]);
    const endMonthDays = getDate.thisMonthDays(end[0], end[1]);
    if (start[2] > startMonthDays || start[2] < 1) {
      logger.warn('enableArea() 开始日期错误，指定日期不在当前月份天数范围内');
      return false;
    } else if (start[1] > 12 || start[1] < 1) {
      logger.warn('enableArea() 开始日期错误，月份超出1-12月份');
      return false;
    } else if (end[2] > endMonthDays || end[2] < 1) {
      logger.warn('enableArea() 截止日期错误，指定日期不在当前月份天数范围内');
      return false;
    } else if (end[1] > 12 || end[1] < 1) {
      logger.warn('enableArea() 截止日期错误，月份超出1-12月份');
      return false;
    } else if (startTimestamp > endTimestamp) {
      logger.warn('enableArea()参数最小日期大于了最大日期');
      return false;
    } else {
      return true;
    }
  }

  __getDisableDateTimestamp () {
    let disableDateTimestamp;
    const { date, type } = this.vm.cConfig.disableMode || {};
    if (date) {
      const t = date.split('-');
      if (t.length < 3) {
        logger.warn('配置 disableMode.date 格式错误');
        return {};
      }
      disableDateTimestamp = getDateTimeStamp({
        year: +t[0],
        month: +t[1],
        day: +t[2]
      });
    }
    return {
      disableDateTimestamp,
      disableType: type
    };
  }

  __handleEnableArea (data = {}, selectedDay = []) {
    const { area, days, startTimestamp, endTimestamp } = data;
    const { enableDays = [] } = this.vm.calendar;
    let expectEnableDaysTimestamp = [];
    if (enableDays.length) {
      expectEnableDaysTimestamp = delRepeatedEnableDay(enableDays, area);
    }
    const {
      disableDateTimestamp,
      disableType
    } = this.__getDisableDateTimestamp();
    const dates = [...days];
    dates.forEach(item => {
      const timestamp = +getDate
        .newDate(item.year, item.month, item.day)
        .getTime();
      const ifOutofArea =
        (+startTimestamp > timestamp || timestamp > +endTimestamp) &&
        !expectEnableDaysTimestamp.includes(timestamp);
      if (
        ifOutofArea ||
        (disableType === 'before' &&
          disableDateTimestamp &&
          timestamp < disableDateTimestamp) ||
        (disableType === 'after' &&
          disableDateTimestamp &&
          timestamp > disableDateTimestamp)
      ) {
        item.disable = true;
        if (item.choosed) {
          item.choosed = false;
          selectedDay = selectedDay.filter(
            d => getDate.toTimeStr(item) !== getDate.toTimeStr(d)
          );
        }
      } else if (item.disable) {
        item.disable = false;
      }
    });
    return {
      dates,
      selectedDay
    };
  }

  __handleEnableDays (data = {}, selectedDay = []) {
    const { days, expectEnableDaysTimestamp } = data;
    const { enableAreaTimestamp = [] } = this.vm.calendar;
    const dates = [...days];
    dates.forEach(item => {
      const timestamp = getDate
        .newDate(item.year, item.month, item.day)
        .getTime();
      let setDisable = false;
      if (enableAreaTimestamp.length) {
        if (
          (+enableAreaTimestamp[0] > +timestamp ||
            +timestamp > +enableAreaTimestamp[1]) &&
          !expectEnableDaysTimestamp.includes(+timestamp)
        ) {
          setDisable = true;
        }
      } else if (!expectEnableDaysTimestamp.includes(+timestamp)) {
        setDisable = true;
      }
      if (setDisable) {
        item.disable = true;
        if (item.choosed) {
          item.choosed = false;
          selectedDay = selectedDay.filter(
            d => getDate.toTimeStr(item) !== getDate.toTimeStr(d)
          );
        }
      } else {
        item.disable = false;
      }
    });
    return {
      dates,
      selectedDay
    };
  }

  __handleSelectedDays (days = [], newSelectedDay = [], selected) {
    const { selectedDay, showLabelAlways } = this.vm.calendar;
    if (selectedDay && selectedDay.length) {
      newSelectedDay = uniqueArrayByDate(selectedDay.concat(selected));
    } else {
      newSelectedDay = selected;
    }
    const { year: curYear, month: curMonth } = days[0];
    const currentSelectedDays = [];
    newSelectedDay.forEach(item => {
      if (+item.year === +curYear && +item.month === +curMonth) {
        currentSelectedDays.push(getDate.toTimeStr(item));
      }
    });
    [...days].map(item => {
      if (currentSelectedDays.includes(getDate.toTimeStr(item))) {
        item.choosed = true;
        item.showTodoLabel = showLabelAlways && item.showTodoLabel
      }
    });
    return {
      dates: days,
      selectedDates: newSelectedDay
    };
  }
}

export default vm => new Day(vm);
