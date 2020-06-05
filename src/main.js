import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import axios from "@/plugins/axios";
import vuetify from "./plugins/vuetify";
import TitleCard from "@/components/TitleCard";

Vue.prototype.$axios = axios;
Vue.component("TitleCard", TitleCard);
Vue.config.productionTip = false;

new Vue({
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
