<template>
  <!-- if open is true show the dialog -->
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
          <!-- submit.prevent prevents form from refreshing page like a normal form would so that we can make a ajax request through Vue -->
          <form @submit.prevent="addGenus()">
            <v-row>
              <v-col cols="12">
                <!-- v-model will update the local state variable every time this input is changed -->
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
      <!-- if loading is true trigger the loader, else show the options to create or close -->
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
    // the formOpen prop handles the value of this computed value
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
      // set error to false so it doesn't persist when adding a new Genus
      this.error = null;
      // set loading to true to trigger the loader
      this.loading = true;
      // our fetch request
      this.$axios
        .post("/genus", {
          scientific_name: this.name
        })
        // eslint-disable-next-line no-unused-vars
        .then(({ data }) => {
          // set loading to false on successful api call to render the "save" and "cancel" buttons
          this.loading = false;
          // update the genusList, we defined in the vuex store that if "item" is passed, then append to the end of the list
          this.$store.commit("setGenusList", {
            item: { id: data, scientific_name: this.name }
          });
          // we call the setmessage before we clear the value so the VueX store has the newly added Genus name
          this.$store.commit(
            "setMessage",
            `${this.name} has been added as a Genus`
          );
          this.name = "";
          // hide form, emit refers to the @toggleForm we passed from the parent, the second paramater is the paramater that gets sent back to the parent
          this.$emit("toggleForm", false);
        })
        .catch(err => {
          this.loading = false;
          // set error to what ever the server responds with
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
