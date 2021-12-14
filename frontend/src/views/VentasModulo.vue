<template>
  <v-container fluid>
    <v-sheet
    color="white"
    elevation="1"
    >
      <v-toolbar flat>
        <v-card-title class="text-h5">{{ titulo }}</v-card-title>
        <v-spacer></v-spacer>

        <v-dialog v-model="dialogRegistro" max-width="700px" persistent>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-on="on" v-bind="attrs" color="primary" dark depressed>
              Agregar
            </v-btn>
          </template>

          <v-card>
            <v-toolbar dense flat class="pa-3 mb-2">
              <v-toolbar-title class="text-h5">
                Registro de venta
              </v-toolbar-title>

              <v-spacer></v-spacer>

              <v-btn icon @click="cerrarDialogoRegistro">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>

            <FormularioVenta
              @ventaRegistrada="getVentas"
              :ventaEditar="ventaEditar"
              @ventaEditada="getVentas"  
            />
          </v-card>
        </v-dialog>
      </v-toolbar>

      <v-card>
        <v-card-title>
          <v-text-field
            v-model="campoFiltro"
            append-icon="mdi-magnify"
            label="Filtrar registros..."
            single-line
            hide-details
            @click:append="buscar"
          ></v-text-field>
        </v-card-title>
        <Tabla
          :columnas="headers"
          :registros="ventas"
          @ventaEliminada="getVentas"
          @editarVenta="editarVenta"
        />
      </v-card>
    </v-sheet>
  </v-container>
</template>

<script>
import Tabla from "../components/TablaVenta.vue";
import FormularioVenta from "../components/recursos/FormularioVenta.vue";
import { getVentas, getVentasFiltro } from "../services/recursos/ventas.service";

export default {
  components: {
    Tabla,
    FormularioVenta,
  },
  data() {
    return {
      campoFiltro: '',
      titulo: "Ventas",
      dialogRegistro: false,
      headers: [
        {
          text: "Código",
          align: "center",
          sortable: false,
          value: "codigo",
        },
        { text: "Fecha venta", value: "fechaVenta" },
        { text: "Cliente", value: "cliente" },
        { text: "Empleado", value: "empleado" },
        { text: "Total impuestos", value: "totalImpuestos" },
        { text: "Total descuentos", value: "totalDescuentos" },
        { text: "Total valor", value: "costo" },
        { text: "", value: "actions" },
      ],
      ventas: [],
      ventaEditar: ''
    };
  },
  methods: {
    buscar() {
      getVentasFiltro(this.campoFiltro)
        .then((response) => this.ventas = response.data)
        .catch(err => console.error(err));
    },
    cerrarDialogoRegistro() {
      this.dialogRegistro = false;
      this.ventaEditar = "";
    },
    getVentas() {
      getVentas()
        .then((response) => {
          this.ventas = response.data;
          this.cerrarDialogoRegistro();
        })
        .catch((err) => console.error(err.response.data.message));
    },
    editarVenta(codigoVenta) {
      this.ventaEditar = codigoVenta;
      this.dialogRegistro = true;
    }
  },
  mounted() {
    this.getVentas();
  },
};
</script>

<style>
</style>