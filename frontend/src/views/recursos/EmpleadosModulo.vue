<template>
  <v-container fluid>
    <v-form class="w-50">
      <v-container>
        <v-row align="center" justify="end">
          <v-col>
            <h1>Lista de empleados activos</h1>
          </v-col>
          <v-col md-col="4">
            <Buscador :label="placeholderBuscador" v-on:buscar="buscar" />
          </v-col>
        </v-row>
      </v-container>
    </v-form>

    <Grid
      :items="empleados"
      :buttons="buttons"
      v-on:eventoTarjeta="identificarEvento"
    />

    <v-row justify="center">
      <v-dialog v-model="dialog" :esEdit="esEdit" persistent max-width="50%">
        <template v-slot:activator="{ on, attrs }">
          <v-fab-transition>
            <v-btn
              fab
              fixed
              large
              color="blue"
              bottom
              right
              class="floated-btn"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon large color="white">mdi-account-plus</v-icon>
            </v-btn>
          </v-fab-transition>
        </template>

        <v-card>
          <v-card-title>
            <span class="text-h5">Registrar empleado</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <FormularioEmpleado :esEdit="esEdit" />
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import Grid from "../../components/GridEmpleados.vue";
import Buscador from "../../components/BuscadorForm.vue";
import FormularioEmpleado from "../../components/recursos/FormularioEmpleado.vue";
import {
  getEmpleados,
  removeEmpleado,
} from "../../services/recursos/empleados.service";

export default {
  components: {
    Grid,
    Buscador,
    FormularioEmpleado,
  },
  data() {
    return {
      empleados: [],

      dialog: false,

      esEdit: false,

      buttons: [
        {
          nombre: "Ver teléfonos",
          icono: "mdi-cellphone-sound",
          color: "black",
          accion: "verTelefonos",
        },
        {
          nombre: "Editar",
          icono: "mdi-pencil",
          color: "black",
          accion: "editar",
        },
        {
          nombre: "Eliminar",
          icono: "mdi-delete",
          color: "black",
          accion: "eliminar",
        },
      ],

      placeholderBuscador: "Buscar empleado",
    };
  },

  methods: {
    buscar(texto) {
      console.log("Buscar empleado:", texto);
    },
    identificarEvento(boton, empleado) {
      if (boton.accion === "verTelefonos") {
        console.log("Evento no disponible");
      } else if (boton.accion === "editar") {
        this.mostrarFormularioEdicion(empleado);
      } else if (boton.accion === "eliminar") {
        this.eliminarEmpleado(empleado);
      }
    },
    eliminarEmpleado(empleado) {
      let cedula = empleado.cedula;

      removeEmpleado(cedula)
        .then((res) => {
          console.log("respuesta", res.data);

          this.empleados = this.empleados.filter(
            (empleado) => empleado.cedula != cedula
          );
        })
        .catch((err) => console.error("Error", err.error));
    },
    mostrarFormularioEdicion(empleado) {
      localStorage.setItem("empleadoEdit", JSON.stringify(empleado));

      this.esEdit = true;
      this.dialog = true;
    }
  },

  mounted() {
    getEmpleados()
      .then((response) => (this.empleados = response.data))
      .catch((error) => console.error(error));
  },
};
</script>

<style scope>
.floated-btn {
  margin-bottom: 50px;
}
</style>