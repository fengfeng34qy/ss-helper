import Day from './lib/day';
import Week from './lib/week';
import Todo from './lib/todo';
import Calendar from './lib/render';
import CalendarConfig from './lib/config';
import convertSolarLunar from './lib/convertSolarLunar';
import {
  Logger,
  GetDate,
  deepClone,
  initialTasks,
  getDateTimeStamp
} from './lib/utils';

let vm = {};
let logger = new Logger();
let getDate = new GetDate();

const conf = {
  /**
   * 渲染日历
   * @param {number} curYear
   * @param {number} curMonth
   * @param {number} curDate
   */
  renderCalendar(curYear, curMonth, curDate) {
    return new Promise((resolve, reject) => {
      Calendar(vm)
        .renderCalendar(curYear, curMonth, curDate)
        .then((info = {}) => {
          if (!info.firstRender) {
            return resolve({
              year: curYear,
              month: curMonth,
              date: curDate
            });
          }
          mountEventsOnComponent(vm);
          vm.$emit('afterRender', vm);
          vm.firstRender = true;
          initialTasks.flag = 'finished';
          if (initialTasks.tasks.length) {
            initialTasks.tasks.shift()();
          }
          resolve({
            year: curYear,
            month: curMonth,
            date: curDate
          });
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  /**
   * 当改变月份时触发
   * @param {object} param
   */
  whenChangeDate({ curYear, curMonth, newYear, newMonth }) {
    vm.$emit('whenChangeMonth', {
      current: {
        year: curYear,
        month: curMonth
      },
      next: {
        year: newYear,
        month: newMonth
      }
    });
  },
  /**
   * 多选
   * @param {number} dateIdx 当前选中日期索引值
   */
  whenMulitSelect(dateIdx) {
    const { days, todoLabels } = deepClone(vm.calendar);
    let { selectedDay: selectedDays = [] } = vm.calendar;
    const currentDay = days[dateIdx];
    if (!currentDay) return;
    currentDay.choosed = !currentDay.choosed;
    if (!currentDay.choosed) {
      currentDay.cancel = true; // 该次点击是否为取消日期操作
      const currentDayStr = getDate.toTimeStr(currentDay);
      selectedDays = selectedDays.filter(
        item => currentDayStr !== getDate.toTimeStr(item)
      );
      if (todoLabels) {
        todoLabels.forEach(item => {
          if (currentDayStr === getDate.toTimeStr(item)) {
            currentDay.showTodoLabel = true;
          }
        });
      }
    } else {
      currentDay.cancel = false;
      const { showLabelAlways } = vm.calendar;
      currentDay.showTodoLabel = showLabelAlways && currentDay.showTodoLabel
      if (!vm.cConfig.takeoverTap) {
        selectedDays.push(currentDay);
      }
    }
    if (vm.cConfig.takeoverTap) {
      return vm.$emit('onTapDay', currentDay);
    }
    vm.calendar.days = days;
    vm.calendar.selectedDay = selectedDays;
    conf.afterTapDay(currentDay, selectedDays);
  },
  /**
   * 单选
   * @param {number} dateIdx 当前选中日期索引值
   */
  whenSingleSelect(dateIdx) {
    const { days, selectedDay: selectedDays = [], todoLabels } = deepClone(vm.calendar);
    let shouldMarkerTodoDay = [];
    const currentDay = days[dateIdx];
    if (!currentDay) return;
    const preSelectedDate = [...selectedDays].pop() || {};
    const { month: dMonth, year: dYear } = days[0] || {};
    if (vm.cConfig.takeoverTap) {
      return vm.$emit('onTapDay', currentDay);
    }
    conf.afterTapDay(currentDay);
    if (!vm.cConfig.inverse && preSelectedDate.day === currentDay.day) return;
    days.forEach((item, idx) => {
      if (+item.day === +preSelectedDate.day) days[idx].choosed = false;
    });
    if (todoLabels) {
      // 筛选当月待办事项的日期
      shouldMarkerTodoDay = todoLabels.filter(
        item => +item.year === dYear && +item.month === dMonth
      );
    }
    Todo(vm).showTodoLabels(shouldMarkerTodoDay, days, selectedDays);
    vm.calendar.days = days;
    if (preSelectedDate.day !== currentDay.day) {
      preSelectedDate.choosed = false;
      currentDay.choosed = true;
      if (!vm.calendar.showLabelAlways || !currentDay.showTodoLabel) {
        currentDay.showTodoLabel = false;
      }
      vm.calendar.selectedDay = [currentDay];
    } else if (vm.cConfig.inverse) {
      // currentDay.choosed = !currentDay.choosed;
      if (currentDay.choosed) {
        currentDay.showTodoLabel = currentDay.showTodoLabel && vm.calendar.showLabelAlways;
      }
      vm.calendar.selectedDay = [];
    }
  },
  gotoSetContinuousDates(start, end) {
    return chooseDateArea([
      `${getDate.toTimeStr(start)}`,
      `${getDate.toTimeStr(end)}`
    ]);
  },
  timeRangeHelper(currentDate, selectedDay) {
    const currentDateTimestamp = getDateTimeStamp(currentDate);
    const startDate = selectedDay[0];
    let endDate;
    let endDateTimestamp;
    let selectedLen = selectedDay.length;
    if (selectedLen > 1) {
      endDate = selectedDay[selectedLen - 1];
      endDateTimestamp = getDateTimeStamp(endDate);
    }
    const startTimestamp = getDateTimeStamp(startDate);
    return {
      endDate,
      startDate,
      currentDateTimestamp,
      endDateTimestamp,
      startTimestamp
    };
  },
  /**
   * 计算连续日期选择的开始及结束日期
   * @param {object} currentDate 当前选择日期
   * @param {array} selectedDay 已选择的的日期
   */
  calculateDateRange(currentDate, selectedDay) {
    const {
      endDate,
      startDate,
      currentDateTimestamp,
      endDateTimestamp,
      startTimestamp
    } = this.timeRangeHelper(currentDate, selectedDay);
    let range = [];
    let selectedLen = selectedDay.length;
    const isWantToChooseOneDate = selectedDay.filter(
      item => getDate.toTimeStr(item) === getDate.toTimeStr(currentDate)
    );
    if (selectedLen === 2 && isWantToChooseOneDate.length) {
      range = [currentDate, currentDate];
      return range;
    }
    if (
      currentDateTimestamp >= startTimestamp &&
      endDateTimestamp &&
      currentDateTimestamp <= endDateTimestamp
    ) {
      const currentDateIdxInChoosedDateArea = selectedDay.findIndex(
        item => getDate.toTimeStr(item) === getDate.toTimeStr(currentDate)
      );
      if (selectedLen / 2 > currentDateIdxInChoosedDateArea) {
        range = [currentDate, endDate];
      } else {
        range = [startDate, currentDate];
      }
    } else if (currentDateTimestamp < startTimestamp) {
      range = [currentDate, endDate];
    } else if (currentDateTimestamp > startTimestamp) {
      range = [startDate, currentDate];
    }
    return range;
  },
  chooseAreaWhenExistArea(currentDate, selectedDay) {
    return new Promise((resolve, reject) => {
      const range = conf.calculateDateRange(
        currentDate,
        getDate.sortDates(selectedDay)
      );
      conf
        .gotoSetContinuousDates(...range)
        .then(data => {
          resolve(data);
          conf.afterTapDay(currentDate);
        })
        .catch(err => {
          reject(err);
          conf.afterTapDay(currentDate);
        });
    });
  },
  chooseAreaWhenHasOneDate(currentDate, selectedDay, lastChoosedDate) {
    return new Promise((resolve, reject) => {
      const startDate = lastChoosedDate || selectedDay[0];
      let range = [startDate, currentDate];
      const currentDateTimestamp = getDateTimeStamp(currentDate);
      const lastChoosedDateTimestamp = getDateTimeStamp(startDate);
      if (lastChoosedDateTimestamp > currentDateTimestamp) {
        range = [currentDate, startDate];
      }
      conf
        .gotoSetContinuousDates(...range)
        .then(data => {
          resolve(data);
          conf.afterTapDay(currentDate);
        })
        .catch(err => {
          reject(err);
          conf.afterTapDay(currentDate);
        });
    });
  },
  /**
   * 日期范围选择模式
   * @param {number} dateIdx 当前选中日期索引值
   */
  whenChooseArea(dateIdx) {
    return new Promise((resolve, reject) => {
      if (vm.calendar.weekMode) return;
      const { days = [], selectedDay, lastChoosedDate } = deepClone(vm.calendar);
      const currentDate = days[dateIdx];
      if (currentDate.disable) return;
      if (vm.cConfig.takeoverTap) {
        return vm.$emit('onTapDay', currentDate);
      }
      if (selectedDay && selectedDay.length > 1) {
        conf
          .chooseAreaWhenExistArea(currentDate, selectedDay)
          .then(dates => {
            resolve(dates);
          })
          .catch(err => {
            reject(err);
          });
      } else if (lastChoosedDate || (selectedDay && selectedDay.length === 1)) {
        conf
          .chooseAreaWhenHasOneDate(currentDate, selectedDay, lastChoosedDate)
          .then(dates => {
            resolve(dates);
          })
          .catch(err => {
            reject(err);
          });
      } else {
        days.forEach(date => {
          date.choosed = +date.day === +currentDate.day;
        });
        vm.calendar.days = [...days];
        vm.calendar.lastChoosedDate = currentDate;
      }
    });
  },
  /**
   * 点击日期后触发事件
   * @param {object} currentSelected 当前选择的日期
   * @param {array} selectedDates  多选状态下选中的日期
   */
  afterTapDay(currentSelected, selectedDates) {
    if (!vm.cConfig.multi) {
      vm.$emit('afterTapDay', currentSelected);
    } else {
      vm.$emit('afterTapDay', {
        currentSelected,
        selectedDates
      });
    }
  },
  /**
   * 跳转至今天
   */
  jumpToToday() {
    return new Promise((resolve, reject) => {
      const { year, month, date } = getDate.todayDate();
      const timestamp = getDate.todayTimestamp();
      vm.calendar.curYear = +year;
      vm.calendar.curMonth = +month;
      vm.calendar.selectedDay = [
        {
          year: year,
          day: date,
          month: month,
          choosed: true,
          lunar: vm.cConfig.showLunar
            ? convertSolarLunar.solar2lunar(year, month, date)
            : null
        }
      ];
      vm.calendar.todayTimestamp = timestamp;
      conf
        .renderCalendar(year, month, date)
        .then(() => {
          resolve({ year, month, date });
        })
        .catch(() => {
          reject('jump failed');
        });
    });
  }
};

export const whenChangeDate = conf.whenChangeDate;
export const renderCalendar = conf.renderCalendar;
export const whenSingleSelect = conf.whenSingleSelect;
export const whenChooseArea = conf.whenChooseArea;
export const whenMulitSelect = conf.whenMulitSelect;
export const calculatePrevWeekDays = conf.calculatePrevWeekDays;
export const calculateNextWeekDays = conf.calculateNextWeekDays;

/**
 * 获取当前年月
 */
export function getCurrentYM() {
  return {
    year: vm.calendar.curYear,
    month: vm.calendar.curMonth
  };
}

/**
 * 获取已选择的日期
 * @param {object } options 日期配置选项 {lunar} 是否返回农历信息
 */
export function getSelectedDay(options = {}) {
  const { selectedDay: dates = [] } = vm.calendar;
  if (options.lunar && !vm.cConfig.showLunar) {
    return getDate.convertLunar(dates);
  } else {
    return dates;
  }
}

/**
 * 取消选中日期
 * @param {array} dates 需要取消的日期，不传则取消所有已选择的日期
 */
export function cancelSelectedDates(dates) {
  const { days = [], selectedDay = [] } = vm.calendar;
  if (!dates || !dates.length) {
    days.forEach(item => {
      item.choosed = false;
    });
    vm.calendar.days = days;
    vm.calendar.selectedDay = [];
  } else {
    const cancelDatesStr = dates.map(
      date => `${+date.year}-${+date.month}-${+date.day}`
    );
    const filterSelectedDates = selectedDay.filter(
      date =>
        !cancelDatesStr.includes(`${+date.year}-${+date.month}-${+date.day}`)
    );
    days.forEach(date => {
      if (
        cancelDatesStr.includes(`${+date.year}-${+date.month}-${+date.day}`)
      ) {
        date.choosed = false;
      }
    });
    vm.calendar.days = days;
    vm.calendar.selectedDay = filterSelectedDates;
  }
}
/**
 * 周视图跳转
 * @param {object} date info
 */
function jumpWhenWeekMode({ year, month, day }) {
  return new Promise((resolve, reject) => {
    Week(vm)
      .jump({
        year: +year,
        month: +month,
        day: +day
      })
      .then(date => {
        resolve(date);
      })
      .catch(err => {
        reject(err);
      });
  });
}

/**
 * 月视图跳转
 * @param {object} date info
 */
function jumpWhenNormalMode({ year, month, day }) {
  return new Promise((resolve, reject) => {
    if (typeof +year !== 'number' || typeof +month !== 'number') {
      return logger.warn('jump 函数年月日参数必须为数字');
    }
    const timestamp = getDate.todayTimestamp();
    vm.calendar.curYear = +year;
    vm.calendar.curMonth = +month;
    vm.calendar.todayTimestamp = timestamp;
    vm.$nextTick(() => {
      conf.renderCalendar(+year, +month, +day)
        .then(date => {
          resolve(date);
        })
        .catch(err => {
          reject(err);
        });
    })
  });
}

/**
 * 跳转至指定日期
 * @param {number} year
 * @param {number} month
 * @param {number} day
 */
export function jump(year, month, day) {
  return new Promise((resolve, reject) => {
    const { selectedDay, weekMode } = vm.calendar;
    const { year: y, month: m, day: d } = selectedDay[0] || {};
    if (+y === +year && +m === +month && +d === +day) {
      return;
    }
    if (weekMode) {
      jumpWhenWeekMode({ year, month, day })
        .then(date => {
          resolve(date);
        })
        .catch(err => {
          reject(err);
        });
      return;
    }
    if (year && month) {
      jumpWhenNormalMode({ year, month, day })
        .then(date => {
          resolve(date);
        })
        .catch(err => {
          reject(err);
        });
    } else {
      conf
        .jumpToToday()
        .then(date => {
          resolve(date);
        })
        .catch(err => {
          reject(err);
        });
    }
  });
}

/**
 * 设置待办事项日期标记
 * @param {object} todos  待办事项配置
 * @param {string} [todos.pos] 标记显示位置，默认值'bottom' ['bottom', 'top']
 * @param {string} [todos.dotColor] 标记点颜色，backgroundColor 支持的值都行
 * @param {object[]} [todos.days] 需要标记的所有日期，如：[{year: 2015, month: 5, day: 12}]，其中年月日字段必填
 */
export function setTodoLabels(todos) {
  Todo(vm).setTodoLabels(todos);
}

/**
 * 删除指定日期待办事项
 * @param {array} todos 需要删除的待办日期数组
 */
export function deleteTodoLabels(todos) {
  Todo(vm).deleteTodoLabels(todos);
}

/**
 * 清空所有待办事项
 */
export function clearTodoLabels() {
  Todo(vm).clearTodoLabels();
}

/**
 * 获取所有待办事项
 * @param {object } options 日期配置选项 {lunar} 是否返回农历信息
 */
export function getTodoLabels(options = {}) {
  const todoDates = Todo(vm).getTodoLabels() || [];
  if (options.lunar && !vm.cConfig.showLunar) {
    const todoDatesWithLunar = getDate.convertLunar(todoDates);
    return todoDatesWithLunar;
  } else {
    return todoDates;
  }
}

/**
 * 禁用指定日期
 * @param {array} days 日期
 * @param {number} [days.year]
 * @param {number} [days.month]
 * @param {number} [days.day]
 */
export function disableDay(days = []) {
  Day(vm).disableDays(days);
}

/**
 * 指定可选日期范围
 * @param {array} area 日期访问数组
 */
export function enableArea(area = []) {
  Day(vm).enableArea(area);
}

/**
 * 指定特定日期可选
 * @param {array} days 指定日期数组
 */
export function enableDays(days = []) {
  Day(vm).enableDays(days);
}

/**
 * 设置选中日期（多选模式下）
 * @param {array} selected 需选中日期
 */
export function setSelectedDays(selected) {
  Day(vm).setSelectedDays(selected);
}

/**
 * 获取当前日历配置
 */
export function getCalendarConfig() {
  return CalendarConfig(vm).getCalendarConfig();
}

/**
 * 设置日历配置
 * @param {object} config
 */
export function setCalendarConfig(config) {
  if (!config || Object.keys(config).length === 0) {
    return logger.warn('setCalendarConfig 参数必须为非空对象');
  }
  const existConfig = getCalendarConfig();
  return new Promise((resolve, reject) => {
    CalendarConfig(vm)
      .setCalendarConfig(config)
      .then(conf => {
        resolve(conf);
        const { date, type } = existConfig.disableMode || {};
        const { _date, _type } = config.disableMode || {};
        if (type !== _type || date !== _date) {
          const { year, month } = getCurrentYM();
          jump(year, month);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
}

/**
 * 获取当前日历面板日期
 * @param {object } options 日期配置选项 {lunar} 是否返回农历信息
 */
export function getCalendarDates(options = {}) {
  const { days: dates = [] } = vm.calendar;
  if (options.lunar && !vm.cConfig.showLunar) {
    const datesWithLunar = getDate.convertLunar(dates);
    return datesWithLunar;
  } else {
    return dates;
  }
}


/**
 * 选择连续日期范围
 * @param {array} dateArea
 */
export function chooseDateArea(dateArea) {
  return Day(vm).chooseArea(dateArea);
}

/**
 * 设置指定日期样式
 * @param {array} dates 待设置特殊样式的日期
 */
export function setDateStyle(dates) {
  if (!dates) return;
  Day(vm).setDateStyle(dates);
}

/**
 * 切换周月视图
 * @param {string} view 视图模式[week, month]
 */
export function switchView(view) {
  return new Promise((resolve, reject) => {
    return Week(vm)
      .switchWeek(view)
      .then(resolve)
      .catch(reject);
  });
}

/**
 * 绑定日历事件至当前组件实例
 * @param {object} component 当前组件实例
 */
function mountEventsOnComponent(component) {
  component.jump = jump;
  component.switchView = switchView;
  component.disableDay = disableDay;
  component.enableArea = enableArea;
  component.enableDays = enableDays;
  component.chooseDateArea = chooseDateArea;
  component.getCurrentYM = getCurrentYM;
  component.getSelectedDay = getSelectedDay;
  component.cancelSelectedDates = cancelSelectedDates;
  component.setDateStyle = setDateStyle;
  component.setTodoLabels = setTodoLabels;
  component.getTodoLabels = getTodoLabels;
  component.deleteTodoLabels = deleteTodoLabels;
  component.clearTodoLabels = clearTodoLabels;
  component.setSelectedDays = setSelectedDays;
  component.getCalendarConfig = getCalendarConfig;
  component.setCalendarConfig = setCalendarConfig;
  component.getCalendarDates = getCalendarDates;
}

function setWeekHeader(firstDayOfWeek) {
  let weeksCh = ['日', '一', '二', '三', '四', '五', '六'];
  if (firstDayOfWeek === 'Mon') {
    weeksCh = ['一', '二', '三', '四', '五', '六', '日'];
  }
  vm.calendar.weeksCh = weeksCh
}

function autoSelectDay(defaultDay) {
  if (defaultDay && typeof defaultDay === 'string') {
    const day = defaultDay.split('-');
    if (day.length < 3) {
      return logger.warn('配置 jumpTo 格式应为: 2018-4-2 或 2018-04-02');
    }
    jump(+day[0], +day[1], +day[2]);
  } else {
    if (!defaultDay) {
      vm.cConfig.noDefault = true;
    }
    jump();
  }
}

function init(component, config) {
  initialTasks.flag = 'process';
  vm = component;
  setWeekHeader(config.firstDayOfWeek);
  autoSelectDay(config.defaultDay);
  logger.tips(
    '日历初始化完成！'
  );
}

export default (component, config = {}) => {
  if (initialTasks.flag === 'process') {
    return initialTasks.tasks.push(function() {
      init(component, config);
    });
  }
  init(component, config);
};
