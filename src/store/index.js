import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    genusList: [],
    speciesList: [],
    specimensList: [],
    message: ""
  },
  mutations: {
    setGenusList(state, { list, item }) {
      if (item) {
        state.genusList = [...state.genusList, item];
        return;
      }
      state.genusList = list;
    },
    setSpeciesList(state, { list, item }) {
      if (item) {
        state.speciesList = [...state.speciesList, item];
        return;
      }
      state.speciesList = list;
    },
    setSpecimensList(state, { list, item }) {
      if (item) {
        state.specimensList = [...state.specimensList, item];
        return;
      }

      state.specimensList = list;
    },
    setMessage(state, message) {
      state.message = message;
    }
  },
  actions: {},
  modules: {}
});
