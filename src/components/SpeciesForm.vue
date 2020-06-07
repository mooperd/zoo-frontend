<template>
  <v-dialog v-model="open" max-width="600px">
    <v-card>
      <div v-if="error" class="text-center">
        <h2>{{ error }}</h2>
      </div>
      <v-card-title>
        <span class="headline"
          >Add New Species to Genus "{{ genus.scientific_name }}"</span
        >
      </v-card-title>
      <v-card-text>
        <v-container>
          <form @submit.prevent="addSpecies()">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="scientific_name"
                  label="Scientific Name*"
                  required
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="common_name"
                  label="Common Name*"
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
        <v-btn color="blue darken-1" text @click="addSpecies()">Save</v-btn>
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
    },
    genus: {
      type: Object,
      default: () => {}
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
    addSpecies() {
      this.loading = true;
      this.error = null;
      this.$axios
        .post("/species", {
          scientific_name: this.scientific_name,
          common_name: this.common_name,
          genus: { id: this.genus.id }
        })
        // eslint-disable-next-line no-unused-vars
        .then(({ data }) => {
          this.loading = false;
          this.$store.commit("setSpeciesList", {
            item: {
              id: data,
              scientific_name: this.scientific_name,
              common_name: this.common_name,
              genus_id: this.genus.id
            }
          });
          this.$store.commit(
            "setMessage",
            `${this.scientific_name} has been added as a Species of ${this.genus.scientific_name}`
          );
          this.scientific_name = "";
          this.common_name = "";
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
      scientific_name: "",
      common_name: "",
      error: null,
      loading: false
    };
  }
};
</script>

<style></style>
