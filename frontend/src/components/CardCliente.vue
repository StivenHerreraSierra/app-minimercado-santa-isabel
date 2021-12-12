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
    
    <v-card-text>{{ persona.direccionResidencia }}</v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-text>
      <v-chip-group
        active-class="deep-purple accent-4 white--text"
      >
        <v-chip>
          {{ persona.telefono }}
        </v-chip>
      </v-chip-group>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn :title="buttons.editar.nombre" @click="editar(persona.numeroDocumento)" small :color="buttons.editar.color" fab dark>
        <v-icon>{{ buttons.editar.icono }}</v-icon>
      </v-btn>
      <v-btn :title="buttons.eliminar.nombre" @click="eliminar(persona.numeroDocumento)" small :color="buttons.eliminar.color" fab dark>
        <v-icon>{{ buttons.eliminar.icono }}</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { removeCliente } from "../services/recursos/clientes.service";

export default {
    props: {
        contain: Boolean,
        persona: Object,
    },
    data() {
      return {
        buttons: {
          editar: {
            nombre: "Editar",
            icono: "mdi-pencil",
            color: "primary",
          },
          eliminar: {
            nombre: "Eliminar",
            icono: "mdi-delete",
            color: "error",
          },
        },
      }
    },
    methods: {
        editar(numeroDocumento) {
          this.$emit('editarCliente', numeroDocumento);
        },
        eliminar(numeroDocumento) {
          removeCliente(numeroDocumento)
            .then(() => {
              this.$emit('eliminarClienteLista', numeroDocumento)

              this.mostrarMensaje('Cliente eliminado', '', 'success', 2000);
            })
            .catch((err) => this.mostrarMensaje('Error al eliminar', err, 'error', 2000));
        },
        mostrarMensaje(title, text, icon, timer) {
          this.$swal({
            title,
            text,
            icon,
            toast: true,
            position: 'top-end',
            timer,
            showConfirmButton: false
          });
        }
    }
};
</script>

<style>
</style>