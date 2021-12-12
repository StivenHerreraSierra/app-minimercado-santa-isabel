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
                Registro de cliente
              </v-toolbar-title>

              <v-spacer></v-spacer>

              <v-btn icon @click="cerrarDialogoRegistro">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>

            <FormularioCliente
              :clienteEditar="clienteEditar"
              @clienteEditado="listarClientes"
              @clienteAgregado="listarClientes"
            />
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
          :items="clientes"
          v-on:editarCliente="editarCliente"
          @eliminarClienteLista="eliminarClienteLista"
        />
      </v-card>
    </v-sheet>
  </v-container>
</template>

<script>
import Grid from "../components/GridClientes.vue";
import FormularioCliente from "../components/recursos/FormularioCliente.vue";

import { getClientes, getClientesFiltrado } from "../services/recursos/clientes.service";

export default {
  components: {
    Grid,
    FormularioCliente,
  },
  data() {
    return {
      campoFiltro: '',
      titulo: "Clientes",
      dialogRegistro: false,
      clientes: [],
      dialog: false,
      esEdit: false,
      clienteEditar: ''
    };
  },

  methods: {
    buscar() {
      getClientesFiltrado(this.campoFiltro)
        .then((response) => this.clientes = response.data)
        .catch(err => console.error(err));
    },
    cerrarDialogoRegistro() {
      this.dialogRegistro = false;
      this.clienteEditar = "";
    },
    editarCliente(numeroDocumento) {
      this.clienteEditar = numeroDocumento;
      this.dialogRegistro = true;
    },
    eliminarClienteLista(numeroDocumento) {
      this.clientes = this.clientes.filter(
        (cliente) => cliente.numeroDocumento != numeroDocumento
      );
    },
    listarClientes() {
      this.dialogRegistro = false;
      this.campoFiltro = "";
      getClientes()
        .then((response) => (this.clientes = response.data))
        .catch((error) => console.error(error));
    }
  },

  mounted() {
    this.listarClientes();
  },
};
</script>

<style scope>
.floated-btn {
  margin-bottom: 50px;
}
</style>