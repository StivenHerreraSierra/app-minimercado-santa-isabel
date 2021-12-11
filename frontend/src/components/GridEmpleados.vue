<template>
  <v-container fluid>
    <v-row align="center">
      <v-col md="3" v-for="item, index in items" :key="index">
        <CardPersona :persona="item" @eliminarEmpleadoLista="eliminarEmpleadoLista(numeroDocumento)" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CardPersona from "./CardPersona.vue";
export default {
    components: {
      CardPersona,
    },
    props: {
        items: Array,
    },
    methods: {
      eliminarEmpleadoLista(numeroDocumento) {
        this.$emit('eliminarEmpleadoLista', numeroDocumento);
      }
    }
}
</script>

<style>

</style>