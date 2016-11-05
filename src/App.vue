<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1>{{ msg }}</h1>
    <date-picker></date-picker>
  </div>
</template>

<script>
  import datePicker from './component/datePicker.vue'
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Vue.js2.0 ZdatePicker'
    }
  },
  components: {datePicker}
}
</script>

<style>
#app {
  font-family: simhei;
  text-align: center;
  margin-top: 60px;
}
</style>
