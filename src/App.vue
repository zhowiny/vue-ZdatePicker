<template>
  <div id="app">
    <z-datepicker @selected="log($event)"></z-datepicker>
    <br>
    <img src="./assets/logo.png">
    <h1>{{ msg }}</h1>
    <!-- :defaultDay="'2016/11/11'"-->
  </div>
</template>
<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Vue.js2.0 ZdatePicker'
    }
  },
  methods: {
    log (data) {
      this.msg = '选中的日期: ' + data.date
//      console.log(data)
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
