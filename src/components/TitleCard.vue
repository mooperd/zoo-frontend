<template>
  <!-- This component handles how Genus, Species, and Specimans look in the white boxes -->
  <v-card width="100%" class="mr-6 ml-6" style="padding: 2px 15px">
    <v-card-title>
      <!-- Flex the button and title and justify: space-between so that they aren't next to each other -->
      <v-row
        class="flex-column align-center flex-lg-row align-lg-start"
        justify="space-between"
      >
        <!--  -->
        <span>
          {{ title }}
        </span>
        <!-- this button will dispatch any function passed to @action as a prop, data is the optional paramter sent as a prop
        the data was used to set the current specimen since it was nested in a foor loop
         -->
        <v-btn
          class="ml-4"
          @click="$emit('action', data)"
          v-if="!noButton"
          dark
          color="green"
        >
          <!-- each button will need a different title so we pass it as a prop to set it  -->
          {{ buttonTitle }}
        </v-btn>
      </v-row>
      <!-- Flex row end -->
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    buttonTitle: {
      type: String,
      default: ""
    },
    noButton: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: () => {}
    }
  }
};
</script>

<style></style>
