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

    <Grid :items="empleados" :buttons="buttons" v-on:eventoTarjeta="identificarEvento" />

    <v-row>
      <v-col>
        <v-fab-transition>
          <v-btn fab fixed large color="blue" bottom right class="floated-btn">
            <v-icon large color="white">mdi-account-plus</v-icon>
          </v-btn>
        </v-fab-transition>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Grid from "../../components/GridContainer.vue";
import Buscador from "../../components/BuscadorForm.vue";
import { getEmpleados, removeEmpleado } from '../../services/recursos/empleados.service';

export default {
  components: {
    Grid,
    Buscador,
  },
  data() {
    return {
      empleados: [],

      buttons: [
        {
          nombre: "Ver teléfonos",
          icono: "mdi-cellphone-sound",
          color: "black",
          accion: "verTelefonos"
        },
        {
          nombre: "Editar",
          icono: "mdi-pencil",
          color: "black",
          accion: "editar"
        },
        {
          nombre: "Eliminar",
          icono: "mdi-delete",
          color: "black",
          accion: "eliminar"
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
      if(boton.accion === "verTelefonos") {
        console.log("Evento no disponible");
      } else if(boton.accion === "editar") {
        console.log("Evento no disponible");
      } else if(boton.accion === "eliminar") {
        this.eliminarEmpleado(empleado);
      }
    },
    eliminarEmpleado(empleado) {
      let cedula = empleado.cedula;

      removeEmpleado(cedula)
        .then(res => {
          console.log("respuesta", res.data);

          this.empleados = this.empleados.filter((empleado) => empleado.cedula != cedula);
        })
        .catch(err => console.error("Error", err.error));
    }
  },

  mounted() {
      getEmpleados()
        .then(response => this.empleados = response.data)
        .catch(error => console.error(error));
  },
};
</script>

<style scope>
.floated-btn {
  margin-bottom: 50px;
}
</style>