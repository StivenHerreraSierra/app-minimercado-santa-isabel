<template>
  <v-container fluid>
    <v-sheet color="white" elevation="1">
      <v-toolbar flat>
        <v-card-title class="text-h5">{{ titulo }}</v-card-title>
      </v-toolbar>

      <v-row class="pa-6">
        <v-col class="pa-2" outlined>
          <Barra :chartOptions="barNominaOptions" :data="data" />
        </v-col>
      </v-row>
    </v-sheet>
  </v-container>
</template>

<script>
import Barra from "../components/graficas/Barra.vue";
import { getNominaPorCargo } from "../services/reportes/reportes.service";

export default {
  components: {
    Barra,
  },
  data() {
    return {
      titulo: "Reportes",
      barNominaOptions: {
        tooltip: {
          enabled: false,
          fixed: false,
          x: false
        },
        bar: {
          posLabel: 'center',
          horizontal: false
        },
        title: {
          text: 'Nómina por cargo',
          align: 'Center'
        }
      },
      data: []
    };
  },
  mounted() {
    getNominaPorCargo()
      .then(response => {
        for(let item of response.data) {
          this.data.push({x: item.nombre, y: item.nomina});
        }
      })
      .catch(err => console.error(err.message));
  }
};
</script>

<style>
</style>