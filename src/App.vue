<template>
  <div id="app">
    <z-datepicker @selected="log($event)"></z-datepicker>
    <br>
    <img src="./assets/logo.png">
    <h1>{{ msg }}</h1>
    <div>{{aaa}}</div>
    <!-- :defaultDay="'2016/11/11'"-->
  </div>
</template>
<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Vue.js2.0 ZdatePicker',
      aaa: ''
    }
  },
  methods: {
    log (data) {
      data.date = new Date(data.date).toLocaleDateString('zh-cn')
      this.msg = '选中的日期: ' + data.date
      this.aaa = JSON.stringify(data)
      console.log(data.date.toLocaleString())
    }
  }
}
</script>

<style>
#app {
  font-family: simhei;
  text-align: center;
  margin-top: 60px;
}
</style>
