<template>
  <v-layout class="d-flex column pa-8">
    <Empleados class="pl-4 pr-4 mb-10" v-if="mostrarEmpleados"/>

    <Contratos class="pl-4 pr-4 mb-10" v-if="mostrarContratos" />

    <BottomMenu v-bind:items="items" class="fixed" v-on:click="setEstado"/>
  </v-layout>
</template>

<script>
import BottomMenu from "../../components/BottomMenu.vue";
import Empleados from "./EmpleadosModulo.vue";
import Contratos from "./ContratosModulo.vue";

export default {
  components: {
    BottomMenu,
    Empleados,
    Contratos
  },

  data() {
    return {
      items: [
        ["mdi-folder-account", "Contratos"],
        ["mdi-account-multiple", "Empleados"],
        ["mdi-view-grid-plus", "Productos"],
        ["mdi-message-alert", "PQR"],
      ],
      ruta: "Recursos/",
      mostrarEmpleados: true,
      mostrarContratos: true,
    };
  },

  methods: {
    setEstado(elemento) {
      this.mostrarEmpleados = false;
      this.mostrarContratos = false;

      if(elemento === "Empleados")
        this.mostrarEmpleados = true;
      else if(elemento === "Contratos")
        this.mostrarContratos = true;
    }
  },

  created() {
    this.mostrarEmpleados = false;
    this.mostrarContratos = true;
  },
};
</script>

<style>
</style>