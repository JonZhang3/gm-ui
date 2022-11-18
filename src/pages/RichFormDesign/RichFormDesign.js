import Vue from 'vue';
import AvueUeditor from 'avue-plugin-ueditor'

import AvueFormDesign from '../../../packages';
import App from "./App";

Vue.use(window.ELEMENT);
Vue.use(window.AVUE);
Vue.use(AvueFormDesign);
Vue.use(AvueUeditor);

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app');
