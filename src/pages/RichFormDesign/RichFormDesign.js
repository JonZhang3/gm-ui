import Vue from 'vue';
import AvueUeditor from 'avue-plugin-ueditor'

import AvueFormDesign from '../../../packages';
import App from "./App";
import ProDateTime from '../../common/pro-date-time';
import ProTime from '../../common/pro-time';
import ProTimeRange from '../../common/pro-time-range';
import ProDateTimeRange from '../../common/pro-date-time-range';

Vue.use(window.ELEMENT);
Vue.use((vue) => {
    vue.component('pro-date-time', ProDateTime);
    vue.component('pro-time', ProTime);
    vue.component('pro-time-range', ProTimeRange);
    vue.component('pro-date-time-range', ProDateTimeRange);
});
Vue.use(window.AVUE);
Vue.use(AvueFormDesign);
Vue.use(AvueUeditor);

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app');
