<template>
  <div id="app">
    <Zoo />
  </div>
</template>

<script>
import Zoo from "@/components/Zoo";
export default {
  name: "App",
  components: {
    Zoo
  },
  mounted() {}
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
