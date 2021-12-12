<template>
  <v-data-table :headers="columnas" :items="registros">
    <template v-slot:[`item.fechaContratacion`]="{ item }">
      {{ new Date(item.fechaContratacion).toLocaleDateString() }}
    </template>
    <template v-slot:[`item.fechaTerminacion`]="{ item }">
      {{ new Date(item.fechaTerminacion).toLocaleDateString() }}
    </template>

    <template v-slot:[`item.actions`]="{ item }">
      <v-btn fab x-small color="primary" class="mr-2" @click="abrirDialogoEditar(item)">
        <v-icon> mdi-pencil </v-icon>
      </v-btn>
      <v-btn fab x-small color="error"  @click="abrirDialogoEliminar(item)">
        <v-icon> mdi-delete </v-icon>
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import { eliminarContrato } from "../services/recursos/contratos.service";
export default {
  props: {
    columnas: Array,
    registros: Array,
  },
  data() {
    return {
      search: "",
    };
  },
  methods: {
    abrirDialogoEliminar(item) {
      this.$swal({
        title: '¿Desea eliminar el registro?',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar'
      }).then(response => {
        if(response.isConfirmed) {
          eliminarContrato(item.codigo)
            .then(res => {
              this.mostrarMensaje('Contrato eliminado', res.data.message, 'success', 2000)
              this.$emit("contratoEliminado");
            })
            .catch(err => this.mostrarMensaje('Error al eliminar', err.message, 'error', 2000));
        }
      });
    },
    abrirDialogoEditar(item) {
      console.log("editar", item);
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
    },
  },
};
</script>

<style>
</style>