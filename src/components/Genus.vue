<template>
  <div v-if="genus">
    <v-row justify="space-between">
      <v-col cols="2">
        <TitleCard
          :title="genus.scientific_name || 'My Genus'"
          button-title="Add Species"
        />
      </v-col>
      <!-- <TitleCard title="Felix The Cat" button-title="Add Speciman" /> -->
      <v-col class="pt-0 pb-12" cols="8">
        <v-row v-for="spec in speciesList" :key="spec.id">
          <v-col cols="7">
            <TitleCard
              button-title="Add Speciman"
              :title="spec.scientific_name"
            />
          </v-col>
          <v-col cols="5">
            <TitleCard title="My Genus" no-button />
            <TitleCard title="My Genus" no-button />
            <TitleCard title="My Genus" no-button />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-divider class="mt-8 mb-8" />
  </div>
</template>

<script>
export default {
  props: {
    genus: {
      type: Object,
      default: () => {}
    }
  },
  mounted() {
    // this.getSpecies();
  },
  data() {
    return {
      species: []
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
