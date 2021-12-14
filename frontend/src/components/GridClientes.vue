<template>
  <v-container fluid>
    <v-row align="center">
      <v-col md="3" v-for="item, index in items" :key="index">
        <CardPersona :persona="item" @eliminarClienteLista="eliminarClienteLista" v-on:editarCliente="editarCliente" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CardPersona from "./CardCliente.vue";
export default {
    components: {
      CardPersona,
    },
    props: {
        items: Array,
    },
    methods: {
      editarCliente(numeroDocumento) {
        this.$emit('editarCliente', numeroDocumento);
      },
      eliminarClienteLista(numeroDocumento) {
        this.$emit('eliminarClienteLista', numeroDocumento);
      }
    }
}
</script>

<style>

</style>