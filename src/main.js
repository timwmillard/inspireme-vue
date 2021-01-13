import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

// require('./assets/css/main.scss');

Vue.config.productionTip = false

Vue.use(Buefy)

new Vue({
  render: h => h(App),
}).$mount('#app')
