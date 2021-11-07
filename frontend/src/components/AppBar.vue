<template>
  <v-toolbar
    id="background-color"
    color="grey lighten-4"
    dense
    app
  >
    
  </v-toolbar>
</template>

<script>
import logo from "../assets/store.png"
export default {
  data() {
    return {
      titulo: 'Minimercado Santa Isabel',
      logo: logo,
      logout: "Cerrar sesión",
    };
  },
  methods: {
    openNav() {
      this.$emit("openNav");
    },
  },
};
</script>

<style>
</style>