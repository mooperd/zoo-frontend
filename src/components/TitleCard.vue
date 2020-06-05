<template>
  <v-card
    min-width="325px"
    class="mr-6 ml-6"
    style="padding: 2px 15px"
    max-height="85px"
  >
    <v-card-title>
      <v-row justify="space-between">
        <span>
          {{ title }}
        </span>
        <v-btn
          class="ml-4"
          @click="$emit('action', data)"
          v-if="!noButton"
          dark
          color="green"
        >
          {{ buttonTitle }}
        </v-btn>
      </v-row>
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
