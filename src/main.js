import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import axios from 'axios'
// import './assets/css.global.css'

axios.defaults.baseURL = 'http://localhost:3000'

import $ from 'jquery'



Vue.prototype.$http = axios

Vue.config.productionTip = false

//全局vue过滤器(时间戳过滤器)
Vue.filter('dateFormat',function (originVal) {
    const dt = new Date(originVal)

    const y = dt.getFullYear()
    const m = (dt.getMonth()+ 1 +'').padStart(2,'0')
    const d = (dt.getDay() + '').padStart(2,'0')

    const hh = (dt.getHours() + '').padStart(2,'0')
    const mm = (dt.getMinutes() + '').padStart(2,'0')
    const ss = (dt.getSeconds() + '').padStart(2,'0')

    return `${hh}:${mm}:${ss}`
})

Vue.filter('formatCount',function(value){
	
	if(value >=10000 && value <=100000000){
		value /= 10000;
		return value.toFixed(1)+'万';
	}else if(value>100000000){
		value /= 100000000;
		return value.toFixed(1) +'亿';
	}
	else{
		return value
	}
	
})

Vue.filter('musicTime',function (value) {
    const time = new Date(value)
    const secondTime= parseInt(value)
    var minuteTime = 0
	var timemm = 0
	
	if(time < 60){
		timemm = secondTime >= 10 ? secondTime : '0' + secondTime
		return `${'00'}:${timemm}`
	}else{
		 minuteTime = parseInt(time / 60)
		 timemm = parseInt(time%60)
		  var newminuteTime = minuteTime >=10 ? minuteTime : '0' + minuteTime
		  var newtimemm = timemm>=10 ? timemm : '0' + timemm
		  return `${newminuteTime}:${newtimemm}`
	}
    
})

Vue.filter('formatTime',function(value){
	var date = new Date(value);
	return date.getFullYear() + '-' + (date.getMonth()+1) + '-' +date.getDate();
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
