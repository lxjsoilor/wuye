// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Footer from './components/common/footer/footer'
Vue.config.productionTip = false

import axios from 'axios'
import Qs from 'qs'
import { Checklist } from 'mint-ui';
import { Swipe, SwipeItem } from 'mint-ui';
import { DatetimePicker,Toast,Popup,Picker,Indicator   } from 'mint-ui';
import { MessageBox } from 'mint-ui';
import store from '@/store/store'
import vconsole from 'vconsole'
// new vconsole();
Vue.use(require('vue-wechat-title'))
Vue.component(Popup.name, Popup);
Vue.component(DatetimePicker.name, DatetimePicker);
Vue.component(Picker.name, Picker);
import "mint-ui/lib/style.css"
// Vue.component(MessageBox.name, MessageBox);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Checklist.name, Checklist);
//QS是axios库中带的，不需要我们再npm安装一个
 
Vue.prototype.$axios = axios;
Vue.prototype.qs = Qs;
Vue.$messagebox = Vue.prototype.$messagebox = MessageBox;
Vue.$Toast = Vue.prototype.$Toast = Toast;
Vue.$Indicator = Vue.prototype.$Indicator = Indicator;

 
router.beforeEach((to, from, next) => {
  if(to.path == '/cart' || to.path.indexOf("/O_user") != -1 || to.path == '/Renting' || to.path== '/submit_suggest'){
    if (!sessionStorage.getItem('userInfos')) {
        console.log(store.state.userInfo)

        next({ path: '/login' })
      } else {
        next()
      }
  }else{
    next()
  }
  if(to.path == '/T_reg'){
    console.log(to)
   let userInfo = JSON.parse(sessionStorage.getItem('userInfos'));
    if(userInfo.user_rank == 2){
      next()
    }else if(userInfo.user_rank == 99){
      next({ path: '/T_user' })
    }else if(userInfo.user_rank == 98){
       next({ path: '/yezhu_status' })
    }
    
  }
  
})


Vue.component('header-item', {
  props: ['message', 'backUrl'],
  template: `<div id="header">
			<a href="javascript:void(0)" @click="go_back"><</a>
			{{message}}
		</div>`,
  methods:{
  	go_back(){
			this.$router.go(-1)
		}
  }
})
Vue.component('footer-view',Footer)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
