import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import axios from "@/plugins/axios";
import vuetify from "./plugins/vuetify";
import TitleCard from "@/components/TitleCard";
import Spinner from "@/components/Spinner";
import "@mdi/font/css/materialdesignicons.css"; // Ensure you are using css-loader

Vue.prototype.$axios = axios;
Vue.component("TitleCard", TitleCard);
Vue.component("Spinner", Spinner);
Vue.config.productionTip = false;

new Vue({
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
