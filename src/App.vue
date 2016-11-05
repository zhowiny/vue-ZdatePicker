<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1>{{ msg }}</h1>
    <z-datepicker :defaultDay="'2012/12/21'" @selected="log($event)"></z-datepicker>
  </div>
</template>
<script>
//import datePicker from './component/datePicker.vue'
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Vue.js2.0 ZdatePicker'
    }
  },
  methods: {
    log (data) {
      console.log(data)
    }
  }
//  components: {datePicker}
}
</script>

<style>
#app {
  font-family: simhei;
  text-align: center;
  margin-top: 60px;
}
</style>
