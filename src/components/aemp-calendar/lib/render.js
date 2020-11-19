import Day from './day';
import Todo from './todo';
import convertSolarLunar from './convertSolarLunar';
import {
  Logger,
  GetDate,
  delRepeatedEnableDay,
  getDateTimeStamp,
  converEnableDaysToTimestamp
} from './utils';

const getDate = new GetDate();
const logger = new Logger();

class Calendar {
  constructor (vm) {
    this.vm = vm;
  }

  /**
   * 渲染日历
   * @param {number} curYear
   * @param {number} curMonth
   * @param {number} curDate
   */
  renderCalendar (curYear, curMonth, curDate) {
    return new Promise(resolve => {
      this.calculateEmptyGrids(curYear, curMonth);
      this.calculateDays(curYear, curMonth, curDate).then(() => {
        const { todoLabels, specialStyleDates, enableDays, selectedDay } = this.vm.calendar;
        if (
          todoLabels &&
          todoLabels.find(
            item => +item.month === +curMonth && +item.year === +curYear
          )
        ) {
          Todo(this.vm).setTodoLabels();
        }
        if (
          specialStyleDates &&
          specialStyleDates.length &&
          specialStyleDates.find(
            item => +item.month === +curMonth && +item.year === +curYear
          )
        ) {
          Day(this.vm).setDateStyle(specialStyleDates);
        }

        if (
          enableDays &&
          enableDays.length &&
          enableDays.find(item => {
            let ymd = item.split('-');
            return +ymd[1] === +curMonth && +ymd[0] === +curYear;
          })
        ) {
          Day(this.vm).enableDays(enableDays);
        }

        if (
          selectedDay &&
          selectedDay.length &&
          selectedDay.find(
            item => +item.month === +curMonth && +item.year === +curYear
          )
        ) {
          Day(this.vm).setSelectedDays(selectedDay);
        }

        if (!this.vm.firstRender) {
          resolve({
            firstRender: true
          });
        } else {
          resolve({
            firstRender: false
          });
        }
      });
    });
  }

  /**
   * 计算当前月份前后两月应占的格子
   * @param {number} year 年份
   * @param {number} month 月份
   */
  calculateEmptyGrids (year, month) {
    this.calculatePrevMonthGrids(year, month);
    this.calculateNextMonthGrids(year, month);
  }

  /**
   * 计算上月应占的格子
   * @param {number} year 年份
   * @param {number} month 月份
   */
  calculatePrevMonthGrids (year, month) {
    let empytGrids = [];
    const prevMonthDays = getDate.thisMonthDays(year, month - 1);
    let firstDayOfWeek = getDate.firstDayOfWeek(year, month);
    if (this.vm.cConfig.firstDayOfWeek === 'Mon') {
      if (firstDayOfWeek === 0) {
        firstDayOfWeek = 6;
      } else {
        firstDayOfWeek -= 1;
      }
    }
    if (firstDayOfWeek > 0) {
      const len = prevMonthDays - firstDayOfWeek;
      const { onlyShowCurrentMonth, showLunar } = this.vm.cConfig
      for (let i = prevMonthDays; i > len; i--) {
        if (onlyShowCurrentMonth) {
          empytGrids.push('');
        } else {
          empytGrids.push({
            day: i,
            lunar: showLunar
              ? convertSolarLunar.solar2lunar(year, month - 1, i)
              : null
          });
        }
      }
      this.vm.calendar.empytGrids = empytGrids.reverse()
    } else {
      this.vm.calendar.empytGrids = null
    }
  }

  /**
   * 计算下一月日期是否需要多展示的日期
   * 某些月份日期为5排，某些月份6排，统一为6排
   * @param {number} year
   * @param {number} month
   * @param {object} config
   */
  calculateExtraEmptyDate (year, month, config) {
    let extDate = 0;
    if (+month === 2) {
      extDate += 7;
      let firstDayofMonth = getDate.dayOfWeek(year, month, 1);
      if (config.firstDayOfWeek === 'Mon') {
        if (+firstDayofMonth === 1) extDate += 7;
      } else {
        if (+firstDayofMonth === 0) extDate += 7;
      }
    } else {
      let firstDayofMonth = getDate.dayOfWeek(year, month, 1);
      if (config.firstDayOfWeek === 'Mon') {
        if (firstDayofMonth !== 0 && firstDayofMonth < 6) {
          extDate += 7;
        }
      } else {
        if (firstDayofMonth < 5) {
          extDate += 7;
        }
      }
    }
    return extDate;
  }

  /**
   * 计算下月应占的格子
   * @param {number} year 年份
   * @param {number} month  月份
   */
  calculateNextMonthGrids (year, month) {
    let lastEmptyGrids = [];
    const thisMonthDays = getDate.thisMonthDays(year, month);
    let lastDayWeek = getDate.dayOfWeek(year, month, thisMonthDays);
    if (this.vm.cConfig.firstDayOfWeek === 'Mon') {
      if (lastDayWeek === 0) {
        lastDayWeek = 6;
      } else {
        lastDayWeek -= 1;
      }
    }
    let len = 7 - (lastDayWeek + 1);
    const { onlyShowCurrentMonth, showLunar } = this.vm.cConfig;
    if (!onlyShowCurrentMonth) {
      len = len + this.calculateExtraEmptyDate(year, month, this.vm.cConfig);
    }
    for (let i = 1; i <= len; i++) {
      if (onlyShowCurrentMonth) {
        lastEmptyGrids.push('');
      } else {
        lastEmptyGrids.push({
          day: i,
          lunar: showLunar
            ? convertSolarLunar.solar2lunar(year, month + 1, i)
            : null
        });
      }
    }
    this.vm.calendar.lastEmptyGrids = lastEmptyGrids
  }

  /**
   * 日历初始化将默认值写入 selectDay
   * @param {number} year
   * @param {number} month
   * @param {number} curDate
   */
  setSelectedDay (year, month, curDate) {
    let selectedDay = [];
    if (this.vm.cConfig.noDefault) {
      selectedDay = [];
      this.vm.cConfig.noDefault = false;
    } else {
      const { showLunar } = this.vm.cConfig
      selectedDay = curDate
        ? [
          {
            year,
            month,
            day: curDate,
            choosed: true,
            week: getDate.dayOfWeek(year, month, curDate),
            lunar: showLunar
              ? convertSolarLunar.solar2lunar(year, month, curDate)
              : null
          }
        ]
        : this.vm.calendar.selectedDay;
    }
    return selectedDay;
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

  /**
   * 设置日历面板数据
   * @param {number} year 年份
   * @param {number} month  月份
   * @param {number} curDate
   */
  calculateDays (year, month, curDate) {
    return new Promise(resolve => {
      const { disableDays = [], chooseAreaTimestamp = [] } = this.vm.calendar;
      let days = Day(this.vm).buildDate(year, month);
      const selectedDay = this.setSelectedDay(year, month, curDate);
      const selectedDayStr = selectedDay.map(d => getDate.toTimeStr(d));
      const disableDaysStr = disableDays.map(d => getDate.toTimeStr(d));
      const [areaStart, areaEnd] = chooseAreaTimestamp;
      days.forEach(item => {
        const cur = getDate.toTimeStr(item);
        const timestamp = getDateTimeStamp(item);
        if (selectedDayStr.includes(cur)) {
          item.choosed = true;
          if (timestamp > areaEnd || timestamp < areaStart) {
            const idx = selectedDay.findIndex(
              selectedDate =>
                getDate.toTimeStr(selectedDate) === getDate.toTimeStr(item)
            );
            selectedDay.splice(idx, 1);
          }
        } else if (
          areaStart &&
          areaEnd &&
          timestamp >= areaStart &&
          timestamp <= areaEnd
        ) {
          item.choosed = true;
          selectedDay.push(item);
        }
        if (disableDaysStr.includes(cur)) item.disable = true;

        const {
          disableDateTimestamp,
          disableType
        } = this.__getDisableDateTimestamp();
        let disabelByConfig = false;
        if (disableDateTimestamp) {
          if (
            (disableType === 'before' && timestamp < disableDateTimestamp) ||
            (disableType === 'after' && timestamp > disableDateTimestamp)
          ) {
            disabelByConfig = true;
          }
        }
        const isDisable = disabelByConfig || this.__isDisable(timestamp);
        if (isDisable) {
          item.disable = true;
          item.choosed = false;
        }
      });
      this.vm.calendar.days = days;
      this.vm.calendar.selectedDay = [...selectedDay] || [];
      this.vm.$nextTick(() => {
        resolve();
      })
    });
  }

  __isDisable (timestamp) {
    const {
      enableArea = [],
      enableDays = [],
      enableAreaTimestamp = []
    } = this.vm.calendar;
    let setDisable = false;
    let expectEnableDaysTimestamp = converEnableDaysToTimestamp(enableDays);
    if (enableArea.length) {
      expectEnableDaysTimestamp = delRepeatedEnableDay(enableDays, enableArea);
    }
    if (enableAreaTimestamp.length) {
      if (
        (+enableAreaTimestamp[0] > +timestamp ||
          +timestamp > +enableAreaTimestamp[1]) &&
        !expectEnableDaysTimestamp.includes(+timestamp)
      ) {
        setDisable = true;
      }
    } else if (
      expectEnableDaysTimestamp.length &&
      !expectEnableDaysTimestamp.includes(+timestamp)
    ) {
      setDisable = true;
    }
    return setDisable;
  }
}

export default vm => new Calendar(vm);
