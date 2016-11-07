# vue-ZdatePicker

> a simple datePicker plugin for vue.js2.0

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

### use datePicker plugin

```bash
# import ZdatePicker component
import datepicker from './component/datePicker.vue'

# use ZdatePicker
Vue.component('z-datepicker', datepicker)

# App.vue
<z-datepicker @selected="log($event)" :defaultDay="'2012/12/21'"></z-datepicker>

 methods: {
    log (data) {
      this.msg = '选中的日期: ' + data.date
      // console.log(data)
    }
 }

// @selected  监听日历选择事件
// :defaultDay  设置日历默认选中的日期(不设置默认当天,必须为字符串)
```

