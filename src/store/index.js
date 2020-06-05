import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    genusList: [],
    speciesList: []
  },
  mutations: {
    setGenusList(state, list) {
      state.genusList = list;
    },
    setSpeciesList(state, list) {
      state.speciesList = list;
    }
  },
  actions: {},
  modules: {}
});
