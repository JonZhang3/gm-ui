import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Avue from '@smallwei/avue';
import '@smallwei/avue/lib/index.css';
import AvueFormDesign from '../../../packages';
import App from "./App";

Vue.use(ElementUI);
Vue.use(Avue);
Vue.use(AvueFormDesign);

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app');
