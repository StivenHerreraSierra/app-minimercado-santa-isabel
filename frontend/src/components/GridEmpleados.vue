<template>
  <v-container fluid>
    <v-row align="center">
      <v-col md="3" v-for="item, index in items" :key="index">
        <CardPersona :persona="item" @eliminarEmpleadoLista="eliminarEmpleadoLista" v-on:editarEmpleado="editarEmpleado" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CardPersona from "./CardEmpleado.vue";
export default {
    components: {
      CardPersona,
    },
    props: {
        items: Array,
    },
    methods: {
      editarEmpleado(numeroDocumento) {
        this.$emit('editarEmpleado', numeroDocumento);
      },
      eliminarEmpleadoLista(numeroDocumento) {
        this.$emit('eliminarEmpleadoLista', numeroDocumento);
      }
    }
}
</script>

<style>

</style>