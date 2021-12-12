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

            <FormularioEmpleado :empleadoEditar="empleadoEditar" @empleadoEditado="getEmpleados" />
          </v-card>
        </v-dialog>
      </v-toolbar>

      <v-card>
        <v-card-title>
          <v-text-field
            v-model="campoFiltro"
            append-icon="mdi-magnify"
            @click:append="buscar"
            label="Filtrar registros..."
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>

        <Grid
          :items="empleados"
          v-on:editarEmpleado="editarEmpleado"
          @eliminarEmpleadoLista="eliminarEmpleadoLista"
        />
      </v-card>
    </v-sheet>
  </v-container>
</template>

<script>
import Grid from "../components/GridEmpleados.vue";
import FormularioEmpleado from "../components/recursos/FormularioEmpleado.vue";
import { getEmpleados, getEmpleadosFiltrado } from "../services/recursos/empleados.service";

export default {
  components: {
    Grid,
    FormularioEmpleado,
  },
  data() {
    return {
      campoFiltro: '',
      titulo: "Empleados",
      dialogRegistro: false,
      empleados: [],
      dialog: false,
      esEdit: false,
      empleadoEditar: ''
    };
  },

  methods: {
    buscar() {
      getEmpleadosFiltrado(this.campoFiltro)
        .then((response) => this.empleados = response.data)
        .catch(err => console.error(err));
    },
    cerrarDialogoRegistro() {
      this.empleado = {};
      this.dialogRegistro = false;
      this.empleadoEditar = "";
    },
    editarEmpleado(numeroDocumento) {
      this.empleadoEditar = numeroDocumento;
      this.dialogRegistro = true;
    },
    eliminarEmpleadoLista(numeroDocumento) {
      this.empleados = this.empleados.filter(
        (empleado) => empleado.numeroDocumento != numeroDocumento
      );
    },
    getEmpleados() {
      this.dialogRegistro = false;
      this.campoFiltro = "";
      getEmpleados()
        .then((response) => (this.empleados = response.data))
        .catch((error) => console.error(error));
    }
  },

  mounted() {
    this.getEmpleados();
  },
};
</script>

<style scope>
.floated-btn {
  margin-bottom: 50px;
}
</style>