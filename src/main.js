import Vue from 'vue'
import ElementUI from 'element-ui';
import App from './App.vue'
import Avue from '@smallwei/avue';
import AvueFormDesign from '../packages';

Vue.use(ElementUI);
Vue.use(Avue);
Vue.use(AvueFormDesign);

Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
}).$mount('#app')
