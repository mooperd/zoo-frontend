import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
// the vuex store is a way to store global variables and reference them across every component to avoid "prop drilling"
export default new Vuex.Store({
  state: {
    genusList: [],
    speciesList: [],
    specimensList: [],
    message: ""
  },
  // Mutations handle updating, adding, or deleting data out of the store
  mutations: {
    /**
     * these setLists functions by default get ahold of the state object located at the top of the file
     * as their first parameters', they all do the same thing for different arrays, the second parameter
     * is user defined and you can only pass one parameter to these mutations so if you need to pass multiple
     * fields or conditional fields, then sending an object is neccessary e.g., $store.commit('setGenusList', { list: [] })
     * or $store.commit('setGenusList', { item: {} }), with that being said the functions handle accordingly,
     * We destructure out the variables directly, from the object by setting the parameter to an object and selecting the
     * potentialy properties. In my case, list and item are the one's I'm conditionally passing depending if
     * I'm loading the app or just added a new item from a form.
     * If the property item is detected in the passed object parameter we check for it, if it exists,
     * add it to the array genusList array,
     * "return" stops any line after that from executing in the function so it works as a if/else statement
     * but if item isn't found, then just set the genusList to the passed array
     */
    setGenusList(state, { list, item }) {
      // was the item parameter passed?
      if (item) {
        // spread operator, it means set the genusList to a copy of the current genusList and append this item to it
        state.genusList = [...state.genusList, item];
        // stops state.genusList = list from executing since you shouldn't be passing "list" and "item" at the same time
        return;
      }
      // set the genusList array to the passed array, only really happens on app load to get all the current data from the database
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
    // global message for toast alerts
    setMessage(state, message) {
      state.message = message;
    }
  },
  actions: {},
  modules: {}
});
