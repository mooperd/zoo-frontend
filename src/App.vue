<template>
  <v-app id="app">
    <v-content>
      <!-- we render the snackbar here so that it doesn't get affected by any of the events happening in children components
      since vuetify close events can sometimes be unpredictable and set values of things unexpectedly
       -->
      <v-snackbar top v-model="message" :timeout="4000">
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
  mounted() {},
  computed: {
    /** we wanna keep track of the store's message every time it updates so that app can react,
     *  so by it being computed, it will auto update the value here locally every time it changes in the store
     * */
    message() {
      return this.$store.state.message;
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
