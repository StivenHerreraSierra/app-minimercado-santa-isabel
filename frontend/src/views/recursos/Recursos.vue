<template>
  <v-layout class="d-flex column pa-8">
    <Empleados class="pl-4 pr-4 mb-10" v-if="mostrarEmpleados"/>

    <BottomMenu v-bind:items="items" class="fixed" v-on:click="setEstado"/>
  </v-layout>
</template>

<script>
import BottomMenu from "../../components/BottomMenu.vue";
import Empleados from "./EmpleadosModulo.vue";

export default {
  components: {
    BottomMenu,
    Empleados,
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
    };
  },

  methods: {
    setEstado(elemento) {
      this.mostrarEmpleados = false;

      if(elemento === "Empleados")
        this.mostrarEmpleados = true;
    }
  },
};
</script>

<style>
</style>