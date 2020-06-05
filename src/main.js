import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import axios from "@/plugins/axios";
import vuetify from "./plugins/vuetify";

Vue.prototype.$axios = axios;

Vue.config.productionTip = false;

new Vue({
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
