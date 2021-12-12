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
                Registro de contrato
              </v-toolbar-title>

              <v-spacer></v-spacer>

              <v-btn icon @click="cerrarDialogoRegistro">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>

            <FormularioContratacion
              submitBtn="Guardar"
              @submitContrato="submitContrato"
              :contratoRegistrado="contratoRegistrado"
            />
          </v-card>
        </v-dialog>
      </v-toolbar>

      <v-card>
        <v-card-title>
          <v-text-field
            v-model="campoBusqueda"
            append-icon="mdi-magnify"
            label="Filtrar registros..."
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <Tabla
          :columnas="headers"
          :registros="items"
          v-on:eliminarRegistro="eliminarRegistro"
        />
      </v-card>
    </v-sheet>
  </v-container>
</template>

<script>
import Tabla from "../components/Tabla.vue";
import FormularioContratacion from "../components/recursos/FormularioContratacion.vue";
import {
  agregarContrato,
  getContratos,
  eliminarContrato,
} from "../services/recursos/contratos.service";
import Swal from "sweetalert2";

export default {
  components: {
    Tabla,
    FormularioContratacion,
  },
  data() {
    return {
      campoBusqueda: '',
      validContrato: true,
      titulo: "Contratos",
      labelBuscador: "Buscar contrato por código",
      dialogRegistro: false,
      headers: [
        {
          text: "Código",
          align: "start",
          sortable: false,
          value: "codigo",
        },
        { text: "Empleado", value: "Empleado_numeroDocumento" },
        { text: "Cargo", value: "Cargo_codigo" },
        { text: "Salario", value: "salario" },
        { text: "Estado", value: "estado" },
        { text: "Fecha contrato", value: "fechaContratacion" },
        { text: "Fecha terminación", value: "fechaTerminacion" },
        { text: "", value: "actions" },
      ],
      items: [],
      contratoInput: {},
      esRegistro: true,
      contratoRegistrado: false,
    };
  },
  methods: {
    eliminarRegistro(registro) {
      if (registro) {
        eliminarContrato(registro.codigo, registro.Empleado_numeroDocumento)
          .then((response) => {
            this.mostrarAlerta(
              "success",
              "Eliminación de contrato",
              response.data.message,
              ""
            );

            this.items = this.items.filter(
              (item) => item.codigo != registro.codigo
            );
          })
          .catch((err) =>
            this.mostrarAlerta(
              "error",
              "Eliminación de contrato",
              err.message,
              ""
            )
          );
      }
    },
    cerrarDialogoRegistro() {
      this.contrato = {};
      this.dialogRegistro = false;
      this.contratoRegistrado = false;
    },
    submitContrato(contrato) {
      this.contratoInput = contrato;

      this.step += 1;

      this.contratoRegistrado = true;
    },
    guardarRegistro() {
      if (this.contratoInput) {
        this.registrarContrato();
      }
    },
    registrarContrato() {
      agregarContrato(this.contratoInput)
        .then((response) => {
          console.log(response.data);
          this.contratoInput = {};
        })
        .catch((err) => {
          console.error(err.response.data.message);
        });
    },
    cargarContratos() {
      getContratos()
        .then((response) => (this.items = response.data))
        .catch((err) => console.error(err.response.data.message));
    },
    mostrarAlerta(icon, title, text, footer) {
      Swal.fire({
        icon,
        title,
        text,
        footer,
      });
    },
  },
  computed: {
    puedeRegresar() {
      return this.step > 1;
    },
  },
  mounted() {
    this.cargarContratos();
  },
};
</script>

<style>
</style>