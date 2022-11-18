import Vue from 'vue';
import App from "./App";

Vue.use(window.ELEMENT);
Vue.use(window.AVUE);

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app');
