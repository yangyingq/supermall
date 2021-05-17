import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from 'components/common/toast'
import FastClick from 'fastclick'
import VueLazyLoad from "vue-lazyload";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()
Vue.use(toast)
//安装toast插件

Vue.use(ElementUI)

//解决移动端300ms 延迟
FastClick.attach(document.body)

//使用懒加载的插件
Vue.use(VueLazyLoad,{
  loading: import('./assets/img/common/placeholder.png'),
  error:import('./assets/img/common/placeholder.png')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
