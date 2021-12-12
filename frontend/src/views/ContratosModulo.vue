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
              @contratoRegistrado="getContratos"
              :contratoEditar="contratoEditar"
              @contratoEditado="getContratos"  
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
          :registros="contratos"
          @contratoEliminado="getContratos"
          @editarContrato="editarContrato"
        />
      </v-card>
    </v-sheet>
  </v-container>
</template>

<script>
import Tabla from "../components/TablaContratos.vue";
import FormularioContratacion from "../components/recursos/FormularioContratacion.vue";
import { getContratos, getContratosFiltro } from "../services/recursos/contratos.service";

export default {
  components: {
    Tabla,
    FormularioContratacion,
  },
  data() {
    return {
      campoFiltro: '',
      titulo: "Contratos",
      dialogRegistro: false,
      headers: [
        {
          text: "Código",
          align: "center",
          sortable: false,
          value: "codigo",
        },
        { text: "Empleado", value: "empleado" },
        { text: "Cargo", value: "cargo" },
        { text: "Salario", value: "salario" },
        { text: "Estado", value: "estado" },
        { text: "Fecha contrato", value: "fechaContratacion" },
        { text: "Fecha terminación", value: "fechaTerminacion" },
        { text: "", value: "actions" },
      ],
      contratos: [],
      contratoEditar: ''
    };
  },
  methods: {
    buscar() {
      getContratosFiltro(this.campoFiltro)
        .then((response) => this.contratos = response.data)
        .catch(err => console.error(err));
    },
    cerrarDialogoRegistro() {
      this.dialogRegistro = false;
      this.contratoEditar = "";
    },
    getContratos() {
      getContratos()
        .then((response) => {
          this.contratos = response.data;
          this.cerrarDialogoRegistro();
        })
        .catch((err) => console.error(err.response.data.message));
    },
    editarContrato(codigoContrato) {
      this.contratoEditar = codigoContrato;
      this.dialogRegistro = true;
    }
  },
  mounted() {
    this.getContratos();
  },
};
</script>

<style>
</style>