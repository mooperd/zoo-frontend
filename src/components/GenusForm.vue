<template>
  <v-dialog v-model="open" max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Add New Genus</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <form @submit.prevent="addGenus()">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="name"
                  label="Scientific Name*"
                  required
                />
              </v-col>
            </v-row>
          </form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="open = false">Close</v-btn>
        <v-btn color="blue darken-1" text @click="addGenus()">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    formOpen: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    open: {
      get() {
        return this.formOpen;
      },
      set(val) {
        this.$emit("toggleForm", val);
      }
    }
  },
  methods: {
    addGenus() {
      this.$axios
        .post("/genus", {
          scientific_name: this.name
        })
        .then(({ data }) => {
          console.log("data", data);
          this.name = "";
        })
        .catch(err => {
          console.log("err", err);
        });
    }
  },
  data() {
    return {
      name: ""
    };
  }
};
</script>

<style></style>
