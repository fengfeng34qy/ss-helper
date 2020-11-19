<template>
  <view class="flex b tb ac" v-if="calendar">
    <view class="calendar b tb">
      <!-- 头部操作栏 -->
      <view v-if="!cConfig.hideHeadOnWeekMode" class="handle fs28 b lr ac pc" :class="cConfig.theme + '_handle-color'">
        <view class="prev fs36" v-if="cConfig.showHandlerOnWeekMode || !calendar.weekMode">
          <text style="display: inline-block; font-size: 16px;" class="prev-handle iconfont icon-doubleleft"
               @tap="chooseDate('prev_year')"></text>
          <text style="display: inline-block; font-size: 16px;" class="prev-handle iconfont icon-left"
               @tap="chooseDate('prev_month')"></text>
        </view>
        <view class="flex date-in-handle b lr cc" @tap="doubleClickToToday">{{calendar.curYear || "--"}} 年
          {{calendar.curMonth || "--"}} 月
        </view>
        <view class="next fs36" v-if="cConfig.showHandlerOnWeekMode || !calendar.weekMode">
          <text style="display: inline-block;font-size: 16px;" class="next-handle iconfont icon-right"
               @tap="chooseDate('next_month')"></text>
          <text style="display: inline-block;font-size: 16px;" class="next-handle iconfont icon-doubleright"
               @tap="chooseDate('next_year')"></text>
        </view>
      </view>
      <!-- 星期栏 -->
      <view
        class="weeks b lr ac"
        :class="cConfig.theme + '_week-color'"
      >
        <view class="week fs28" v-for="(item, index) in calendar.weeksCh" :key="index">{{ item }}</view>
      </view>
      <!-- 日历面板主体 -->
      <view class="b lr wrap"
           @touchstart="calendarTouchstart"
           @touchmove.stop="calendarTouchmove"
           @touchend.stop="calendarTouchend">
        <!-- 上月日期格子 -->
        <view
          class="grid b ac pc"
          :class="cConfig.theme + '_prev-month-date'"
          v-if="calendar.empytGrids"
          v-for="(item, emptyIndex) in calendar.empytGrids"
          :key="emptyIndex"
        >
          <view class="date">
            {{item.day}}
            <view
              v-if="cConfig.showLunar && item.lunar"
              class="date-desc date-desc-bottom">
              {{item.lunar.Term || item.lunar.IDayCn}}
            </view>
          </view>
        </view>
        <!-- 本月日期格子 -->
        <view
          v-for="(item, currentEmptyIndex) in calendar.days"
          :key="currentEmptyIndex"
          @tap="tapDayItem(item, currentEmptyIndex)"
          class="grid b ac pc"
          :class="cConfig.theme + '_normal-date'"
        >
          <view
            class="date-wrap b cc"
            :class="(item.week === 0 || item.week === 6) ? cConfig.theme + '_weekend-color' : ''"
          >
            <view
              class="date b ac pc"
              :class="(item.class ? item.class  : '') + ' ' + (cConfig.chooseAreaMode ? 'date-area-mode' : '') + ' ' + (calendar.todoLabelCircle && item.showTodoLabel && !item.choosed ? cConfig.theme + '_todo-circle todo-circle' : '') + ' ' + (item.isToday ? cConfig.theme + '_today' : '') + ' ' + (item.choosed ? cConfig.theme + '_choosed' : '') + ' ' + (item.disable ? cConfig.theme + '_date-disable' : '')"
            >
              {{cConfig.markToday && item.isToday ? cConfig.markToday : item.day}}
              <view
                v-if="(cConfig.showLunar && item.lunar && !item.showTodoLabel) || Boolean(item.showTodoLabel && calendar.todoLabelPos !== 'bottom')"
                class="date-desc"
                :class="(cConfig.theme + '_date-desc date-desc-bottom') +  ' ' + ((item.choosed || item.isToday) ? 'date-desc-bottom-always' : '') + ' ' + (item.disable ? cConfig.theme + '_date-desc-disable' : '')"
              >
                {{item.lunar.Term || item.lunar.IDayCn}}
              </view>
              <view
                v-if="item.showTodoLabel && !calendar.todoLabelCircle"
                :class="(item.todoText ? 'date-desc' : cConfig.theme + '_todo-dot todo-dot') + ' ' + (cConfig.showLunar ? cConfig.theme + '_date-desc-lunar' : '') + ' ' + (calendar.todoLabelPos === 'bottom' ? 'date-desc-bottom todo-dot-bottom' : 'date-desc-top todo-dot-top') + ' ' + (calendar.showLabelAlways && item.choosed && calendar.todoLabelPos === 'bottom' ? 'date-desc-bottom-always todo-dot-bottom-always' : '') + ' ' + (calendar.showLabelAlways && item.choosed && calendar.todoLabelPos === 'top' ? 'date-desc-top-always todo-dot-top-always' : '')"
                :style="{backgroundColor: item.todoText ? '' : item.color || calendar.todoLabelColor, color: item.color}">
                {{item.todoText}}
              </view>
            </view>
          </view>
        </view>
        <!-- 下月日期格子 -->
        <view
          class="grid b ac pc"
          :class="cConfig.theme + '_next-month-date'"
          v-for="(item, lastEmptyIndex) in calendar.lastEmptyGrids"
          :key="lastEmptyIndex"
        >
          <view class="date">
            {{item.day}}
            <view
              v-if="cConfig.showLunar && item.lunar"
              class="date-desc date-desc-bottom">
              {{item.lunar.Term || item.lunar.IDayCn}}
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import Week from './lib/week';
import { Logger, Slide, GetDate } from './lib/utils';
import initCalendar, {
  jump,
  getCurrentYM,
  whenChangeDate,
  renderCalendar,
  whenMulitSelect,
  whenSingleSelect,
  whenChooseArea,
  getCalendarDates
} from './main.js';

const slide = new Slide();
const logger = new Logger();
const getDate = new GetDate();

export default {
  name:"AempCalendar",
  config: {
    component: true
  },
  props: {
    calendarConfig: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      cConfig: this.calendarConfig,
      calendar: {
        weeksCh: [],
        weekMode: false,
        days: [],
        selectedDay: [],
        curYear: '',
        curMonth: '',
        todayTimestamp: '',
        enableDays: [],
        disableDays: [],
        enableDaysTimestamp: [],
        chooseAreaTimestamp: [],
        enableArea: [],
        enableAreaTimestamp: [],
        empytGrids: [],
        lastEmptyGrids: [],
        todoConfig: {},
        todoLabelCircle: false,
        todoLabelPos: 'bottom',
        todoLabelColor: '',
        todoLabels: [],
        showLabelAlways: false,
        specialStyleDates: [],
      },
      handleMap: {
        prev_year: 'chooseYear',
        prev_month: 'chooseMonth',
        next_month: 'chooseMonth',
        next_year: 'chooseYear'
      },
      gesture: {},
      firstRender: false,
      count: undefined,
      lastClick: undefined,
      slideLock: false,
      currentYM: null,
      currentDates: [],
    }
  },
  created () {
    this.initComp();
  },
  methods: {
    initComp () {
      this.setConfig(this.cConfig);
      initCalendar(this, this.cConfig);
    },
    setConfig (config) {
      if (config.disableMode && !config.disableMode.date) {
        config.disableMode.date = getDate.toTimeStr(
          getDate.todayDate()
        );
      }
      if (config.markToday && typeof config.markToday === 'string') {
        config.highlightToday = true;
      }
      config.theme = config.theme || 'default';
    },
    chooseDate (type) {
      if (!type) return;
      const methodName = this.handleMap[type];
      this[methodName](type);
    },
    chooseYear (type) {
      const { curYear, curMonth } = this.calendar;
      if (!curYear || !curMonth) return logger.warn('异常：未获取到当前年月');
      if (this.calendar.weekMode) {
        return console.warn('周视图下不支持点击切换年月');
      }
      let newYear = +curYear;
      let newMonth = +curMonth;
      if (type === 'prev_year') {
        newYear -= 1;
      } else if (type === 'next_year') {
        newYear += 1;
      }
      this.render(curYear, curMonth, newYear, newMonth);
    },
    chooseMonth (type) {
      const { curYear, curMonth } = this.calendar;
      if (!curYear || !curMonth) return logger.warn('异常：未获取到当前年月');
      if (this.calendar.weekMode) return console.warn('周视图下不支持点击切换年月');
      let newYear = +curYear;
      let newMonth = +curMonth;
      if (type === 'prev_month') {
        newMonth = newMonth - 1;
        if (newMonth < 1) {
          newYear -= 1;
          newMonth = 12;
        }
      } else if (type === 'next_month') {
        newMonth += 1;
        if (newMonth > 12) {
          newYear += 1;
          newMonth = 1;
        }
      }
      this.render(curYear, curMonth, newYear, newMonth);
    },
    render (curYear, curMonth, newYear, newMonth) {
      whenChangeDate.call(this, {
        curYear,
        curMonth,
        newYear,
        newMonth
      });
      this.calendar.curYear = newYear;
      this.calendar.curMonth = newMonth;
      renderCalendar.call(this, newYear, newMonth);
    },
    tapDayItem (item, index) {
      const { day, disable } = item || {};
      if (disable || !day) return;
      const { multi, chooseAreaMode } = this.cConfig;
      if (multi) {
        whenMulitSelect.call(this, index);
      } else if (chooseAreaMode) {
        whenChooseArea.call(this, index);
      } else {
        whenSingleSelect.call(this, index);
      }
    },
    doubleClickToToday () {
      if (this.calendarConfig.multi || this.calendar.weekMode) return;
      if (this.count === undefined) {
        this.count = 1;
      } else {
        this.count += 1;
      }
      if (this.lastClick) {
        const difference = new Date().getTime() - this.lastClick;
        if (difference < 500 && this.count >= 2) {
          jump.call(this);
        }
        this.count = undefined;
        this.lastClick = undefined;
      } else {
        this.lastClick = new Date().getTime();
      }
    },
    /**
     * 日历滑动开始
     * @param {object} e
     */
    calendarTouchstart (e) {
      const t = e.touches[0];
      const startX = t.clientX;
      const startY = t.clientY;
      this.slideLock = true; // 滑动事件加锁
      this.gesture.startX = startX
      this.gesture.startY = startY
    },
    handleSwipe (direction) {
      let swipeKey = 'calendar.leftSwipe';
      let swipeCalendarType = 'next_month';
      let weekChangeType = 'next_week';
      if (direction === 'right') {
        swipeKey = 'calendar.rightSwipe';
        swipeCalendarType = 'prev_month';
        weekChangeType = 'prev_week';
      }
      this[swipeKey] = 1;
      this.currentYM = getCurrentYM();
      if (this.calendar.weekMode) {
        this.slideLock = false;
        this.currentDates = getCalendarDates();
        if (weekChangeType === 'prev_week') {
          Week(this).calculatePrevWeekDays();
        } else if (weekChangeType === 'next_week') {
          Week(this).calculateNextWeekDays();
        }
        this.onSwipeCalendar(weekChangeType);
        this.onWeekChange(weekChangeType);
        return;
      }
      this.chooseMonth(swipeCalendarType);
      this.onSwipeCalendar(swipeCalendarType);
    },
    /**
     * 日历滑动中
     * @param {object} e
     */
    calendarTouchmove (e) {
      const { gesture } = this;
      const { preventSwipe } = this.calendarConfig;
      if (!this.slideLock || preventSwipe) return;
      if (slide.isLeft(gesture, e.touches[0])) {
        this.handleSwipe('left');
        this.slideLock = false;
      }
      if (slide.isRight(gesture, e.touches[0])) {
        this.handleSwipe('right');
        this.slideLock = false;
      }
    },
    calendarTouchend (e) {
      this.calendar.leftSwipe = 0;
      this.calendar.rightSwipe = 0;
    },
    onSwipeCalendar (direction) {
      this.$emit('onSwipe', {
        directionType: direction,
        currentYM: this.currentYM
      });
    },
    onWeekChange (direction) {
      this.$emit('whenChangeWeek', {
        current: {
          currentYM: this.currentYM,
          dates: [...this.currentDates]
        },
        next: {
          currentYM: getCurrentYM(),
          dates: getCalendarDates()
        },
        directionType: direction
      });
      this.currentDates = null;
      this.currentYM = null;
    }
  }
};
</script>

<style scoped>
  @import './theme/iconfont.css';
  @import './theme/theme-default.css';
  @import './theme/theme-elegant.css';

  .b {
    display: flex;
  }

  .lr {
    flex-direction: row;
  }

  .tb {
    flex-direction: column;
  }

  .pc {
    justify-content: center;
  }

  .ac {
    align-items: center;
  }

  .cc {
    align-items: center;
    justify-content: center;
  }

  .wrap {
    flex-wrap: wrap;
  }

  .flex {
    flex-grow: 1;
  }

  .bg {
    background-image: linear-gradient(to bottom, #faefe7, #ffcbd7);
    overflow: hidden;
  }

  .white-color {
    color: #fff;
  }

  .fs24 {
    font-size: 24px;
  }

  .fs28 {
    font-size: 28px;
  }

  .fs32 {
    font-size: 32px;
  }

  .fs36 {
    font-size: 36px;
  }

  .calendar {
    width: 100%;
    box-sizing: border-box;
  }

  /* 日历操作栏 */

  .handle {
    height: 80px;
  }

  .prev-handle,
  .next-handle {
    padding: 20px;
  }

  .date-in-handle {
    height: 80px;
  }

  /* 星期栏 */

  .weeks {
    height: 50px;
    line-height: 50px;
    opacity: 0.5;
  }

  .week {
    text-align: center;
  }

  .grid,
  .week {
    width: 14.286014285714286%;
  }

  .date-wrap {
    width: 100%;
    height: 80px;
    position: relative;
    left: 0;
    top: 0;
  }

  .date {
    position: relative;
    left: 0;
    top: 0;
    width: 55px;
    height: 55px;
    text-align: center;
    line-height: 55px;
    font-size: 26px;
    font-weight: 200;
    border-radius: 50%;
    transition: all 0.3s;
    animation-name: choosed;
    animation-duration: 0.5s;
    animation-timing-function: linear;
    animation-iteration-count: 1;
  }

  .date-area-mode {
    width: 100%;
    border-radius: 0;
  }

  .date-desc {
    width: 150%;
    height: 32px;
    font-size: 20px;
    line-height: 32px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    overflow: hidden;
    word-break: break-all;
    text-overflow: ellipsis;
    white-space: nowrap;
    -webkit-line-clamp: 1;
    text-align: center;
  }

  @keyframes choosed {
    from {
      transform: scale(1);
    }

    50% {
      transform: scale(0.9);
    }

    to {
      transform: scale(1);
    }
  }

  /* 日期圆圈标记 */
  .todo-circle {
    border-width: 1px;
    border-style: solid;
    box-sizing: border-box;
  }

  /* 待办点标记相关样式 */
  .todo-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  .todo-dot-top {
    top: 3px;
  }

  .todo-dot.todo-dot-top-always {
    top: -8px;
  }

  .todo-dot.todo-dot-bottom {
    bottom: 0;
  }

  .todo-dot.todo-dot-bottom-always {
    bottom: -10px;
  }

  /* 日期描述文字（待办文字/农历）相关样式 */

  .date-desc.date-desc-top {
    top: -6px;
  }

  .date-desc.date-desc-top-always {
    top: -20px;
  }

  .date-desc.date-desc-bottom {
    bottom: -14px;
  }

  .todo-circle .date-desc.date-desc-bottom {
    bottom: -30px;
  }

  .date-desc.date-desc-bottom-always {
    bottom: -28px;
  }
</style>
