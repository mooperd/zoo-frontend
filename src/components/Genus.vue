<template>
  <div v-if="genus">
    <SpeciesForm
      :genus="genus"
      :formOpen="speciesFormOpen"
      @toggleForm="toggleSpeciesFormOpen"
    />
    <SpecimensForm
      :species="currentSpecies"
      :formOpen="specimensFormOpen"
      @toggleForm="toggleSpecimensFormOpen"
    />
    <v-row justify="space-between">
      <v-col cols="2">
        <TitleCard
          :title="genus.scientific_name || 'My Genus'"
          button-title="Add Species"
          @action="toggleSpeciesFormOpen"
        />
      </v-col>
      <v-col class="pt-0 pb-12" cols="8">
        <v-row v-for="spec in speciesList" :key="spec.scientific_name">
          <v-col cols="7">
            <TitleCard
              button-title="Add Speciman"
              :title="spec.scientific_name"
              @action="toggleSpecimensFormOpen"
              :data="spec"
            />
          </v-col>
          <v-col cols="5">
            <TitleCard
              class="mb-5"
              v-for="specimen in specimensList(spec)"
              :key="specimen.name"
              :title="specimen.name"
              no-button
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-divider class="mt-8 mb-8" />
  </div>
</template>

<script>
import SpeciesForm from "./SpeciesForm";
import SpecimensForm from "./SpecimensForm";
export default {
  components: {
    SpeciesForm,
    SpecimensForm
  },
  props: {
    genus: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      species: [],
      speciesFormOpen: false,
      specimensFormOpen: false,
      currentSpecies: null
    };
  },
  methods: {
    getSpecies() {
      this.$axios
        .get(`/species/${this.genus.id}`)
        .then(({ data }) => {
          this.species = data;
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    toggleSpeciesFormOpen() {
      this.speciesFormOpen = !this.speciesFormOpen;
    },
    toggleSpecimensFormOpen(data) {
      this.specimensFormOpen = !this.specimensFormOpen;
      this.setCurrentSpecies(data);
    },
    specimensList(species) {
      return this.$store.state.specimensList.filter(
        spec => spec.species_id === species.id
      );
    },
    setCurrentSpecies(species) {
      this.currentSpecies = species;
    }
  },
  computed: {
    speciesList() {
      return this.$store.state.speciesList.filter(
        spec => spec.genus_id === this.genus.id
      );
    }
  }
};
</script>

<style></style>
