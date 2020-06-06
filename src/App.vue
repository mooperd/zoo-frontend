<template>
  <v-app id="app">
    <v-content>
      <!-- we render the snackbar here so that it doesn't get affected by any of the events happening in children components
      since vuetify close events can sometimes be unpredictable and set values of things unexpectedly
      the v-model will determine whether or not this should be shown
       -->
      <v-snackbar top v-model="snackbarOpen" :timeout="4000">
        {{ message }}
        <!-- onclick on close button, set the global store's message back to empty so the snackbar goes away -->
        <v-btn color="green" text @click="$store.commit('setMessage', '')">
          Close
        </v-btn>
      </v-snackbar>
      <!-- Since App is mainly just a parent renderer, we call a component called "Zoo" to handle the content of the app,
      Zoo is essentially just a component that can represent a page
       -->
      <Zoo />
    </v-content>
  </v-app>
</template>

<script>
import Zoo from "@/components/Zoo";
export default {
  name: "App",
  components: {
    Zoo
  },
  data() {
    return {
      snackbarOpen: false
    };
  },
  computed: {
    /** we wanna keep track of the store's message every time it updates so that app can react,
     *  so by it being computed, it will auto update the value here locally every time it changes in the store
     * also we use a special computed value since if you click close the value of message needs to be set to empty so it dissapears,
     * you aren't ever supposed to set a computed value directly e.g. this.message = false
     * instead, you set the value the computed property is pulling from, in this case, the VueX's store state
     * called "message", with the mutation I setup called "setMessage", it allows for the value to be set directly
     * by VueX
     * */
    message: {
      set(val) {
        this.$store.commit("setMessage", val);
      },
      get() {
        return this.$store.state.message;
      }
    }
  },
  /**  I wanna watch to see when the message has changed so that I can determine to show the snackbar or not
   * there's multiple ways to go about this but I decided to go with a watcher to avoid having to set two different values in the
   * VueX store, being the message and whether or not the snackbar is shown,
   * it's less work to use a watcher in this particular situation instead of settingup a mutation in the vuexstore
   */
  watch: {
    message(newValue) {
      // watchers take 2 params, first param is the new value of the variable and second is the old
      // anytime the value of mesage is updated this will get called, if the newvalue has content, open snackbar else close
      if (newValue) this.snackbarOpen = true;
      else this.snackbarOpen = false;
    }
  }
};
</script>

<style lang="scss">
// just some basic styling to represent the app
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 30px;
}
</style>
