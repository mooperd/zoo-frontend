<template>
  <v-dialog v-model="open" max-width="600px">
    <v-card>
      <div v-if="error" class="text-center">
        <h2>{{ error }}</h2>
      </div>
      <v-card-title>
        <span class="headline"
          >Add New Specimen to Species "{{
            species && species.scientific_name
          }}"</span
        >
      </v-card-title>
      <v-card-text>
        <v-container>
          <form @submit.prevent="addSpecimen()">
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="name" label="Name*" required />
              </v-col>
              <v-col cols="12">
                <v-menu
                  v-model="menu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="birth_date"
                      label="Birth Date"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="birth_date"
                    @input="menu = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
          </form>
        </v-container>
      </v-card-text>
      <Spinner v-if="loading" />
      <v-card-actions v-else>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="open = false">Close</v-btn>
        <v-btn color="blue darken-1" text @click="addSpecimens()">Save</v-btn>
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
    species: {
      type: [Object, Boolean],
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
    addSpecimens() {
      this.error = null;
      this.loading = true;
      this.$axios
        .post("/specimen", {
          name: this.name,
          birth_date_time: new Date(this.birth_date).getTime(),
          species: { id: this.species.id }
        })
        // eslint-disable-next-line no-unused-vars
        .then(({ data }) => {
          this.loading = false;
          this.$store.commit("setSpecimensList", {
            item: {
              id: data,
              name: this.name,
              birth_date_time: this.birth_date,
              species_id: this.species.id
            }
          });
          this.$store.commit(
            "setMessage",
            `${this.name} has been added as a Specimen of ${this.species.scientific_name}`
          );
          this.name = "";
          this.birth_date = "";
          this.$emit("toggleForm", false);
        })
        .catch(err => {
          this.error = err.response.data;
          this.loading = false;
        });
    }
  },
  data() {
    return {
      name: "",
      birth_date: "",
      menu: false,
      error: null,
      loading: false,
      message: "test"
    };
  }
};
</script>

<style></style>
