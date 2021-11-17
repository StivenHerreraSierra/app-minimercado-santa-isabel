<template>
  <v-card>
    <v-card-title class="text-h5">{{ titulo }}</v-card-title>

    <Tabla
      :columnas="headers"
      :registros="items"
      v-on:eliminarItem="eliminarRegistro"
    />
  </v-card>
</template>

<script>
import Tabla from "../../components/Tabla.vue";
export default {
  components: {
    Tabla,
  },
  data() {
    return {
      titulo: "Contratos",
      labelBuscador: "Buscar contrato por código",
      headers: [
        {
          text: "Código",
          align: "start",
          sortable: false,
          value: "codigo",
        },
        { text: "Empleado", value: "empleado" },
        { text: "Cargo", value: "cargo" },
        { text: "Salario", value: "salario" },
        { text: "Estado", value: "estado" },
        { text: "Fecha contrato", value: "fechaContrato" },
        { text: "Fecha terminación", value: "fechaTerminacion" },
        { text: "", value: "actions" },
      ],
      items: [],
    };
  },
  methods: {
    eliminarRegistro(registro) {
      if (registro) {
        this.items = this.items.filter((item) => item.name != registro.name);
      }
    },
  },
};
</script>

<style>
</style>