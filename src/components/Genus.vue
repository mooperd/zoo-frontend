<template>
  <!-- this component takes a Genus as a prop and renders them accordingly -->
  <div v-if="genus">
    <!-- define the forms that are ready to be triggered, see GenusForm.vue for main documentation on forms -->
    <!-- We need to pass the genus as a prop to the species form, use it's id in the fetch request as reference it in the title -->
    <SpeciesForm
      :genus="genus"
      :formOpen="speciesFormOpen"
      @toggleForm="toggleSpeciesFormOpen"
    />
    <!-- Pass species to the specimens form to use it's id in the fetch request and in the title -->
    <SpecimensForm
      :species="currentSpecies"
      :formOpen="specimensFormOpen"
      @toggleForm="toggleSpecimensFormOpen"
    />
    <!-- forms end -->

    <!-- utilizing vuetify's grid system, this translate to display: flex; justify-content: space-betweeen -->
    <v-row justify="space-between">
      <!-- We define a column for the Genus that'll take up 2 of the 12 grid spaces -->
      <v-col cols="2">
        <!-- See TitleCard.vue to see why this is consistently used -->
        <TitleCard
          :title="genus.scientific_name || 'My Genus'"
          button-title="Add Species"
          @action="toggleSpeciesFormOpen"
        />
      </v-col>
      <!-- Genus Column End -->
      <!-- We then define the columns for species and their specimens within a v-for of the species -->
      <v-col class="pt-0 pb-12" cols="8">
        <!-- We want the Species and Specimens to be a flex box so that when new specimens are created, it will push down the content of each species,
             species column will take up as much vertical whitespace as the specimens
         -->
        <v-row v-for="spec in speciesList" :key="spec.scientific_name">
          <v-col cols="7">
            <!-- Species for loop -->
            <TitleCard
              button-title="Add Speciman"
              :title="spec.scientific_name"
              @action="toggleSpecimensFormOpen"
              :data="spec"
            />
            <!-- Species for loop end -->
          </v-col>
          <v-col cols="5">
            <!-- Specimens for loop(nested in the species for loop), controlled by the specimensList local method of this component -->
            <TitleCard
              class="mb-5"
              v-for="specimen in specimensList(spec)"
              :key="specimen.name"
              :title="specimen.name"
              no-button
            />
            <!-- Specimens for loop end -->
          </v-col>
        </v-row>
        <!-- Species and Specimens row end -->
      </v-col>
      <!-- Species/Specimens Parent Column End -->
    </v-row>
    <!-- Parent Grid System End -->

    <!-- The divider you seen under each Genus -->
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
    // takes a species as a paramater and spits out it's specimans as an array(via filter)
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
    // we only want species that are apart of this Genus
    speciesList() {
      return this.$store.state.speciesList.filter(
        spec => spec.genus_id === this.genus.id
      );
    }
  }
};
</script>

<style></style>
