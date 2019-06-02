import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/';
import Vuetify from 'vuetify';
import colors from 'vuetify/es5/util/colors';
import 'vuetify/dist/vuetify.min.css';
import {token, errors} from '@/helpers/interceptors';
import VueSweetalert2 from 'vue-sweetalert2';
import pl from 'vuetify/src/locale/pl';
// @ts-ignore
import VueSocketIO from 'vue-socket.io';

token();
errors();
Vue.use(new VueSocketIO({
    connection: process.env.VUE_APP_API_URL,
}));
Vue.use(VueSweetalert2);
Vue.use(Vuetify, {
    theme: {
        primary: colors.lightGreen,
        secondary: colors.grey.darken1,
        accent: colors.shades.black,
        error: colors.red.accent3,
    },
    iconfont: 'fa',
    lang: {
        locales: { pl },
        current: 'pl',
    },
});
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
