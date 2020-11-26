import Vue from 'vue'
import App from './App.vue'
import router from './router'
//触摸
var VueTouch = require('vue-touch')
Vue.use(VueTouch, {
  name: 'v-touch'
})
//tabbar
import {
  Tabbar,
  TabbarItem
} from 'vant';
Vue.use(Tabbar);
Vue.use(TabbarItem);
//swiper
import {
  Swipe,
  SwipeItem
} from 'vant';
Vue.use(Swipe);
Vue.use(SwipeItem);
//nav
import {
  NavBar
} from 'vant';
Vue.use(NavBar);
//
import animate from 'animate.css'
Vue.use(animate)
//
import { Button } from 'vant';
Vue.use(Button);
Vue.config.productionTip = false
//
import { Form } from 'vant';
Vue.use(Form);
//
import { DatetimePicker } from 'vant';
Vue.use(DatetimePicker);
//
import { Field } from 'vant';
Vue.use(Field);
//
import { Popup } from 'vant';
Vue.use(Popup);
//
import { Cell, CellGroup } from 'vant';
Vue.use(Cell);
Vue.use(CellGroup);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')