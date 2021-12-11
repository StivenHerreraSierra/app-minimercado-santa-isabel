<template>
  <v-card outlined tile class="">
    <v-img
      height="100"
      :contain="true"
      class="indigo lighten-5"
      src="../assets/employee_icon.jpg"
    >
    </v-img>

    <v-card-title>{{ persona.nombreCompleto }}</v-card-title>

    <v-card-subtitle>{{ persona.numeroDocumento }}</v-card-subtitle>

    <v-divider class="mx-4"></v-divider>

    <v-card-text>
      <v-chip-group
        active-class="deep-purple accent-4 white--text"
      >
        <v-chip v-for="telefono in telefonos" :key="telefono.numero">
          {{ telefono.numero }}
        </v-chip>
      </v-chip-group>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn icon :title="buttons.verMas.nombre" @click="verMas(persona.numeroDocumento)">
        <v-icon :color="buttons.verMas.color">{{ buttons.verMas.icono }}</v-icon>
      </v-btn>
      <v-btn icon :title="buttons.editar.nombre" @click="editar(persona.numeroDocumento)">
        <v-icon :color="buttons.editar.color">{{ buttons.editar.icono }}</v-icon>
      </v-btn>
      <v-btn icon :title="buttons.eliminar.nombre" @click="eliminar(persona.numeroDocumento)">
        <v-icon :color="buttons.eliminar.color">{{ buttons.eliminar.icono }}</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { removeEmpleado } from "../services/recursos/empleados.service";
import { listarTelefonos } from "../services/recursos/telefonosEmpleado.service";

export default {
    props: {
        contain: Boolean,
        persona: Object,
    },
    data() {
      return {
        buttons: {
          verMas: {
            nombre: "Ver más",
            icono: "mdi-magnify-plus-outline",
            color: "black",
          },
          editar: {
            nombre: "Editar",
            icono: "mdi-pencil",
            color: "black",
          },
          eliminar: {
            nombre: "Eliminar",
            icono: "mdi-delete",
            color: "black",
          },
        },
        telefonos: []
      }
    },
    mounted() {
      listarTelefonos(this.persona.numeroDocumento)
        .then((response) => this.telefonos = response.data)
        .catch((err) => console.error(err.response));
    },
    methods: {
        verMas(numeroDocumento) {
          console.log("EVENTO 'Ver más' NO DISPONIBLE: ", numeroDocumento);
        },
        editar(numeroDocumento) {
          this.$emit('editarEmpleado', numeroDocumento);
        },
        eliminar(numeroDocumento) {
          removeEmpleado(numeroDocumento)
            .then(() => this.$emit('eliminarEmpleadoLista', numeroDocumento))
            .catch((err) => console.error("Error", err.error));
        }
    }
};
</script>

<style>
</style>