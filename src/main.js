import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import axios from "@/plugins/axios";
import vuetify from "./plugins/vuetify";
import TitleCard from "@/components/TitleCard";
import Spinner from "@/components/Spinner";
import "@mdi/font/css/materialdesignicons.css"; // Ensure you are using css-loader

// here we setup a global way to reference our axios with the configurations from our plugin
Vue.prototype.$axios = axios;
// defining global components that will be used very commonly in the app
Vue.component("TitleCard", TitleCard);
Vue.component("Spinner", Spinner);
Vue.config.productionTip = false;

new Vue({
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
