<template>
  <v-container v-if="genusList.length">
    <AddGenus />
    <Genus
      v-for="genus in genusList"
      :key="genus.scientific_name"
      :genus="genus"
    />
  </v-container>
</template>

<script>
import AddGenus from "./AddGenus";
import Genus from "./Genus";
export default {
  components: {
    AddGenus,
    Genus
  },
  mounted() {
    this.getGenus();
    this.getSpecies();
    this.getSpecimens();
  },
  methods: {
    getGenus() {
      this.$axios
        .get("/genus/all")
        .then(({ data }) => {
          this.$store.commit("setGenusList", { list: data });
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    getSpecies() {
      this.$axios
        .get(`/species/all`)
        .then(({ data }) => {
          this.$store.commit("setSpeciesList", { list: data });
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    getSpecimens() {
      this.$axios
        .get(`/specimen/all`)
        .then(({ data }) => {
          this.$store.commit("setSpecimensList", { list: data });
        })
        .catch(err => {
          console.log("err", err);
        });
    }
  },
  computed: {
    genusList() {
      return this.$store.state.genusList;
    }
  }
};
</script>

<style></style>
