<template>
  <!-- Wrap the entire page in a container to add some default padding/margin -->
  <v-container>
    <AddGenus class="pl-0 pl-sm-6 text-center text-sm-start" />
    <!-- here I don't wanna render another html element so I use template to conditionally render genus' if they exists -->
    <template v-if="genusList.length">
      <!-- Renders each individual Genus within a for loop, the data coming from the VueX store after being set from the API -->
      <Genus
        v-for="genus in genusList"
        :key="genus.scientific_name"
        :genus="genus"
      />
      <!-- Genus For Loop end -->
    </template>
  </v-container>
</template>

<script>
import AddGenus from "./AddGenus";
import Genus from "./Genus";
export default {
  // Here I import the components that represent Adding a Genus and each Genus
  components: {
    AddGenus,
    Genus
  },
  mounted() {
    // when the component is loaded, get all the data and store it in the VueX store
    this.getGenus();
    this.getSpecies();
    this.getSpecimens();
  },
  /**
   * see plugins/axios.js to see how I configured the proxy
   * see main.js to see how I configured it to be referenced as "this.$axios"
   */
  methods: {
    getGenus() {
      this.$axios
        .get("/genus/all")
        .then(({ data }) => {
          // set genusList in the vuex store, the way we set it up, passing "list", will newly define the state in the store
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
          // set speciesList in the vuex store, the way we set it up, passing "list", will newly define the state in the store
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
          // set specimensList in the vuex store, the way we set it up, passing "list", will newly define the state in the store
          this.$store.commit("setSpecimensList", { list: data });
        })
        .catch(err => {
          console.log("err", err);
        });
    }
  },
  computed: {
    // we just wanna get the dynamically updated genusList that we setup from the VueX store so whenever it updates there, it updates on the UI as well
    genusList() {
      return this.$store.state.genusList;
    }
  }
};
</script>

<style></style>
