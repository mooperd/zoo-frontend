<template>
  <div>
    <!-- here we import the form that awaits to be opened by the formOpen state variable which is passed as a prop "formOpen"
      we need to bind JavaScript so we utilize the colons to emphasize the prop will involve JavaSript,
      we could have very easily passed the toggleForm function as a prop too but it's more convient to just pass it as a event
      then the GenusForm child can dispatch it with this.$emit("toggleForm")
     -->
    <GenusForm :formOpen="formOpen" @toggleForm="toggleForm" />
    <!-- Genus Form End -->
    <div class="mb-6">
      <!-- onClick toggle the form from false to true -->
      <v-btn @click="toggleForm()" color="orange" dark>
        Add Genus
      </v-btn>
    </div>
  </div>
</template>

<script>
import GenusForm from "./GenusForm";
export default {
  // our state variable for opening the form
  data() {
    return {
      formOpen: false
    };
  },
  methods: {
    toggleForm() {
      this.formOpen = !this.formOpen;
    }
  },
  components: {
    GenusForm
  }
};
</script>

<style></style>
