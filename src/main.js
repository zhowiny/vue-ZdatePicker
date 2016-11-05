import Vue from 'vue'
import App from './App.vue'
import datepicker from './component/datePicker.vue'
Vue.component('z-datepicker', datepicker)
new Vue({
  el: '#app',
  render: h => h(App)
})
