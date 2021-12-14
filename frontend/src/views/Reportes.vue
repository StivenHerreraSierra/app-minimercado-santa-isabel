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

        <v-col class="pa-2" outlined>
          <Donut
            :chartOptions="donutEstadoPedidoOptions"
            :series="seriesEstadoPedido"
          />
        </v-col>

        <v-col class="mt-5 pa-2" outlined>
          <Barra :chartOptions="barComprasOptions" :data="dataCompras" />
        </v-col>

        <v-col class="mt-5 pa-2" outlined>
          <LineChart :chartOptions="lineMesOptions" :data="dataMes" />
        </v-col>

        <v-col class="mt-5 pa-2" outlined>
          <Barra :chartOptions="barMediosOptions" :data="dataMedios" />
        </v-col>

        <v-col class="mt-5 pa-2" outlined>
          <LineChart :chartOptions="lineGastosOptions" :data="dataGastos" />
        </v-col>

        <v-col class="pa-2" outlined>
          <Donut
            :chartOptions="donutProductosCategoriaOptions"
            :series="seriesProductosCategoria"
          />
        </v-col>
      </v-row>
    </v-sheet>
  </v-container>
</template>

<script>
import Barra from "../components/graficas/Barra.vue";
import Donut from "../components/graficas/Donut.vue";
import LineChart from "../components/graficas/Line.vue";
import {
  getNominaPorCargo,
  getCantidadPedidosEstado,
  getTotalCompradoPorClientes,
  getVentasPorMes,
  getMediosFrecuentesRegistroPedidos,
  getGastosPorMes,
  getProductosPorCategoria
} from "../services/reportes/reportes.service";

export default {
  components: {
    Barra,
    Donut,
    LineChart,
  },
  data() {
    return {
      titulo: "Reportes",
      barNominaOptions: {
        tooltip: {
          enabled: false,
          fixed: false,
          x: false,
        },
        bar: {
          posLabel: "center",
          horizontal: false,
        },
        title: {
          text: "Nómina por cargo",
          align: "Center",
        },
      },
      data: [],

      //Donut estado pedidos
      seriesEstadoPedido: [],
      donutEstadoPedidoOptions: {
        labels: [],
        title: {
          text: "Cantidad de pedidos por estado",
          align: "Center",
        },
      },

      //Compras
      barComprasOptions: {
        tooltip: {
          enabled: false,
          fixed: false,
          x: false,
        },
        bar: {
          posLabel: "center",
          horizontal: true,
        },
        title: {
          text: "Total comprado por cliente (mayor a $15000)",
          align: "Center",
        },
      },
      dataCompras: [],

      //Ventas por mes
      lineMesOptions: {
        title: {
          text: "Ventas por mes",
          align: "Center",
        },
      },
      dataMes: [],

      //Medios registro
      barMediosOptions: {
        tooltip: {
          enabled: false,
          fixed: false,
          x: false,
        },
        bar: {
          posLabel: "center",
          horizontal: false,
        },
        title: {
          text: "Total pedidos registrados por un medio diferente",
          align: "Center",
        },
      },
      dataMedios: [],

      //Gastos por mes
      lineGastosOptions: {
        title: {
          text: "Gastos por mes",
          align: "Center",
        },
      },
      dataGastos: [],

      //Donut productos categoria
      seriesProductosCategoria: [],
      donutProductosCategoriaOptions: {
        labels: [],
        title: {
          text: "Cantidad de productos por categoría",
          align: "Center",
        },
      },
    };
  },
  mounted() {
    getNominaPorCargo()
      .then((response) => {
        for (let item of response.data) {
          this.data.push({ x: item.nombre, y: item.nomina });
        }
      })
      .catch((err) => console.error(err.message));

    getCantidadPedidosEstado()
      .then((response) => {
        for (let item of response.data) {
          this.seriesEstadoPedido.push(item.Total);
          this.donutEstadoPedidoOptions.labels.push(item.nombre);
        }
      })
      .catch((err) => console.error(err.message));

    getTotalCompradoPorClientes()
      .then((response) => {
        for (let item of response.data) {
          this.dataCompras.push({
            x: item.nombreCompleto,
            y: item.totalComprado,
          });
        }
      })
      .catch((err) => console.error(err.message));

    getVentasPorMes()
      .then((response) => {
        for (let item of response.data) {
          this.dataMes.push({ x: item.mes, y: item.total });
        }
      })
      .catch((err) => console.error(err.message));

    getMediosFrecuentesRegistroPedidos()
      .then((response) => {
        for (let item of response.data) {
          this.dataMedios.push({ x: item.medioDeRegistro, y: item.frecuencia });
        }
      })
      .catch((err) => console.error(err.message));

    getGastosPorMes()
      .then((response) => {
        for (let item of response.data) {
          this.dataGastos.push({ x: item.mes, y: item.gasto });
        }
      })
      .catch((err) => console.error(err.message));

    getProductosPorCategoria()
      .then((response) => {
        for (let item of response.data) {
          this.seriesProductosCategoria.push(item.total);
          this.donutProductosCategoriaOptions.labels.push(item.nombre);
        }
      })
      .catch((err) => console.error(err.message));
  },
};
</script>

<style>
</style>