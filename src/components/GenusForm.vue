<template>
  <v-dialog v-model="open" max-width="600px">
    <v-card>
      <div v-if="error" class="text-center">
        <h2>{{ error }}</h2>
      </div>
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
      <Spinner v-if="loading" />
      <v-card-actions v-else>
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
      this.error = null;
      this.loading = true;
      this.$axios
        .post("/genus", {
          scientific_name: this.name
        })
        // eslint-disable-next-line no-unused-vars
        .then(({ data }) => {
          this.loading = false;
          this.$store.commit("setGenusList", {
            item: { scientific_name: this.name }
          });
          // we call the setmessage before we clear the value so the VueX store has the newly added Genus name
          this.$store.commit(
            "setMessage",
            `${this.name} has been added as a Genus`
          );
          this.name = "";
          this.$emit("toggleForm", false);
        })
        .catch(err => {
          this.loading = false;
          this.error = err.response.data;
        });
    }
  },
  data() {
    return {
      name: "",
      loading: false,
      error: null
    };
  }
};
</script>

<style></style>
