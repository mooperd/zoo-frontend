<template>
  <div>
    <GenusForm :formOpen="formOpen" @toggleForm="toggleForm" />
    <div class="mb-6">
      <v-btn @click="toggleForm()" color="orange" dark>
        Add Genus
      </v-btn>
    </div>
  </div>
</template>

<script>
import GenusForm from "./GenusForm";
export default {
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
