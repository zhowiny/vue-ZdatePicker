<template>
  <div class="datePicker">
    <input type="text" autocomplete="off" readonly :value="day" @blur="hide" @focus="show">
    <transition name='pickerContainer'>
      <div key='pickerCnt' v-show="showDatePicker" class="cnt">
        <div class='dateTitle'>
          <span class="preBtn" @mousedown.prevent="preMonth">&lt;&lt;</span>
          <span @mousedown.prevent="showMonth">{{year}}年{{month}}月</span>
          <span class="nextBtn" @mousedown.prevent="nextMonth">&gt;&gt;</span>
          <div class="month" v-show="monthVisible">
            <span v-for="(value,index) in monthList" @mousedown.prevent="selectedMonth(index)" :class="{selected: (index + 1) == month}">{{value}}</span>
          </div>
          <div class="month" v-show="yearVisible">
            <span @mousedown.prevent="preYear">&lt;&lt;</span>
            <span @mousedown.prevent="nextYear">&gt;&gt;</span>
            <span v-for="value in yearList" @mousedown.prevent="selectedYear(value)" :class="{selected: value == year}">{{value}}</span>
          </div>
          <i v-for='i in week' @mousedown.prevent="" class="list-item week">{{i}}</i>
        </div>
        <transition-group name="list" tag="div">
          <span
            @mousedown.prevent='selectedDay(item,index)'
            v-for="(item,index) in items"
            :key="item.key" class="list-item"
            :class='{"preMonth": index < 7 && item.Day > 7, "nextMonth": index > 28 && item.Day < 15,"selected": item.selected}'>
              {{ item.Day }}
            </span>
        </transition-group>
      </div>
    </transition>
</div>
</template>
<script>
  export default {
    props: {
      parentMessage: null,
      choiceMonth: Number,
      choiceYear: Number,
      defaultDay: {
        type: String,
        default: new Date().toDateString()
      }
    },
    data () {
      return {
        auth: 'zhowiny',
        items: Array.apply(null, {length: 42}).map((v, k) => {
          return {Day: k % 32 + 1, key: k}
        }),
        week: ['日', '一', '二', '三', '四', '五', '六'],
        monthList: Array.apply(null, {length: 12}).map((v, k) => {
          return (k + 1) + '月'
        }),
        yearList: Array.apply(null, {length: 10}).map((v, k) => {
          let y = new Date().getFullYear()
          return y + k
        }),
        selectedTime: '',
        nowMonth: '',
        nowYear: '',
        month: '',
        year: '',
        showDatePicker: false,
        monthVisible: false,
        yearVisible: false
      }
    },
    computed: {
      formatDay () {
        return {
          d: new Date(this.defaultDay).toDateString(),
          m: this.choiceMonth || new Date(this.defaultDay).getMonth(),
          y: this.choiceYear || new Date(this.defaultDay).getFullYear()
        }
      },
      day () {
        let date = new Date(this.selectedTime)
        return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()
      }
    },
    created () {
      this.nowMonth = this.formatDay.m
      this.nowYear = this.formatDay.y
      this.selectedTime = this.formatDay.d
      this.initDatePicker()
    },
    methods: {
      show () {
        this.showDatePicker = true
      },
      hide () {
        this.hideMonth()
        this.hideYear()
        this.showDatePicker = false
      },
      showMonth () {
        if (this.monthVisible) {
          this.hideMonth()
          this.showYear()
          return
        }
        if (this.yearVisible) {
          this.hideYear()
          this.showMonth()
          return
        }
        this.monthVisible = true
      },
      hideMonth () {
        this.monthVisible = false
      },
      showYear () {
        this.yearVisible = true
      },
      hideYear () {
        this.yearVisible = false
      },
      nextMonth () {
        // 下一个月
        this.hideMonth()
        this.hideYear()
        this.nowMonth++
        this.shuffle()
        this.initDatePicker()
      },
      preMonth () {
        // 上一个月
        this.hideMonth()
        this.hideYear()
        this.nowMonth--
        this.shuffle()
        this.initDatePicker()
      },
      nextYear () {
        this.yearList = this.yearList.map((v, i) => {
          return v + 10
        })
      },
      preYear () {
        this.yearList = this.yearList.map((v, i) => {
          return v - 10
        })
      },
      selectedDay (data, index) {
        // 选中事件
        this.hideMonth()
        this.hideYear()
        this.selectedTime = data.date
        this.items.map((v, i) => {
          this.$set(v, 'selected', false)
        })
        this.$set(this.items[index], 'selected', true)
        this.$emit('selected', data) // 向父组件派发selected事件
        if (data.Day > 7 && index < 7) {
          this.preMonth()
        } else if (data.Day < 15 && index > 28) {
          this.nextMonth()
        }
      },
      selectedMonth (month) {
        this.nowMonth = month
        this.nowYear = this.year
        this.monthVisible = false
        this.shuffle()
        this.initDatePicker()
      },
      selectedYear (year) {
        this.nowMonth = (this.month - 1)
        this.nowYear = year
        this.monthVisible = false
        this.yearVisible = false
        this.shuffle()
        this.initDatePicker()
      },
      initDatePicker () {
        // 初始化日历
        let nowDate = new Date().setFullYear(this.nowYear, this.nowMonth, 1) // 当前显示的月份
        let startDay = new Date(new Date(nowDate).setDate(1 - new Date(nowDate).getDay())) // 当前日历的第一格的日期
        this.month = new Date(nowDate).getMonth() + 1 // 当前日历月份
        this.year = new Date(nowDate).getFullYear() // 当前日历年份
        for (let i = 0; i < 42; i++) {
          let blockTime = new Date(startDay.getTime() + i * 24 * 60 * 60 * 1000) // 每一格中对应的时间
          this.items[i].Day = blockTime.getDate()  // 每一格中的数字
          this.items[i].date = blockTime.toDateString() // 每一个中对应的时间
          this.$set(this.items[i], 'selected', this.items[i].date === this.selectedTime)  // 设置是否选中状态
        }
      },
      shuffle () {
        // 随机排序动画
        let arr = []
        let a = this.items.slice(0)
        while (a.length > 0) {
          let random = Math.floor(Math.random() * a.length)
          arr.splice(arr.length, 0, a[random])
          a.splice(random, 1)
        }
        this.items = arr
      }
    }
  }
</script>
<style scoped>
  .datePicker {
    width: 225px;
    position: relative;
    display: inline-block;
  }
  .datePicker>input {
    padding: 0 10px;
    width: calc(100% - 22px);
    width: -o-calc(100% - 22px);
    width: -webkit-calc(100% - 22px);
    width: -moz-calc(100% - 22px);
    width: -ms-calc(100% - 22px);
    height: 1.6em;
  }
  .cnt {
    position: absolute;
    z-index: 999;
  }
  .dateTitle {
    font-size: 0;
    position: relative;
  }
  .dateTitle .nextBtn, .dateTitle .preBtn {
    background: lightblue;
    color: #fff;
    width: calc(100% / 7 * 1.5);
    width: -o-calc(100% / 7 * 1.5);
    width: -webkit-calc(100% / 7 * 1.5);
    width: -moz-calc(100% / 7 * 1.5);
    width: -ms-calc(100% / 7 * 1.5);
  }
  .dateTitle span {
    display: inline-block;
    background: #fff;
    font-size: 14px;
    padding: 3px 0;
    text-align: center;
    width: calc(100% / 7 * 4);
    width: -o-calc(100% / 7 * 4);
    width: -ms-calc(100% / 7 * 4);
    width: -moz-calc(100% / 7 * 4);
    width: -webkit-calc(100% / 7 * 4);
    cursor: pointer;
  }
  .month {
    position: absolute;
    width: calc(100% / 7 * 4);
    width: -o-calc(100% / 7 * 4);
    width: -ms-calc(100% / 7 * 4);
    width: -moz-calc(100% / 7 * 4);
    width: -webkit-calc(100% / 7 * 4);
    font-size: 0;
    left:calc(100% /7 * 1.5);
    left:-o-calc(100% /7 * 1.5);
    left:-ms-calc(100% /7 * 1.5);
    left:-moz-calc(100% /7 * 1.5);
    left:-webkit-calc(100% /7 * 1.5);
  }
  .month span {
    font-size: 14px;
    width: calc(50% - 2px);
    width: -o-calc(50% - 2px);
    width: -ms-calc(50% - 2px);
    width: -moz-calc(50% - 2px);
    width: -webkit-calc(50% - 2px);
    background-color: rgba(255,255,255,.9);
    border: 1px solid #efefef;
    cursor: pointer;
  }
  .month .selected {
    background: #aaf;
  }
  .list-item.preMonth, .list-item.nextMonth {
    background: #fff;
  }

  .list-item.selected {
    background: #aaf;
  }

  .list-item.week {
    background: #afa;
    font-size: 14px;
    padding: 3px 0;
    font-style: normal;
  }

  .list-item {
    display: inline-block;
    width: calc((100% - 14px) / 7);
    width: -o-calc((100% - 14px) / 7);
    width: -ms-calc((100% - 14px) / 7);
    width: -moz-calc((100% - 14px) / 7);
    width: -webkit-calc((100% - 14px) / 7);
    border: 1px solid #eee;
    text-align: center;
    transition: all .5s;
    cursor: pointer;
    background: #ffa;
  }

  .list-enter {
    opacity: 0;
    transform: translateY(30px) scale(.5) rotate(45deg);
    -o-transform: translateY(30px) scale(.5) rotate(45deg);
    -ms-transform: translateY(30px) scale(.5) rotate(45deg);
    -moz-transform: translateY(30px) scale(.5) rotate(45deg);
    -webkit-transform: translateY(30px) scale(.5) rotate(45deg);
  }

  .list-leave-active {
    opacity: 0;
    transform: translateY(-30px) scale(.5) rotate(-45deg);
    -o-transform: translateY(-30px) scale(.5) rotate(-45deg);
    -ms-transform: translateY(-30px) scale(.5) rotate(-45deg);
    -moz-transform: translateY(-30px) scale(.5) rotate(-45deg);
    -webkit-transform: translateY(-30px) scale(.5) rotate(-45deg);
    position: absolute;
  }
  .pickerContainer-enter-active,.pickerContainer-leave-active {
    transition: all .5s;
    -o-transition: all .5s;
    -ms-transition: all .5s;
    -moz-transition: all .5s;
    -webkit-transition: all .5s;
  }
  .pickerContainer-enter,.pickerContainer-leave-active {
    transform:scaleY(0);
    -o-transform:scaleY(0);
    -ms-transform:scaleY(0);
    -moz-transform:scaleY(0);
    -webkit-transform:scaleY(0);
  }
</style>
