<template>
  <v-data-table :headers="columnas" :items="registros">
    <template v-slot:[`item.fechaContratacion`]="{ item }">
      {{ new Date(item.fechaContratacion).toLocaleDateString() }}
    </template>
    <template v-slot:[`item.fechaTerminacion`]="{ item }">
      {{ new Date(item.fechaTerminacion).toLocaleDateString() }}
    </template>

    <template v-slot:[`item.actions`]="{ item }">
      <v-icon @click="abrirDialogoEliminar(item)"> mdi-delete </v-icon>
    </template>
  </v-data-table>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  props: {
    columnas: Array,
    registros: Array,
  },
  data() {
    return {
      search: "",
      dialog: false,
      selectedItem: {},
      botonEliminar: {
        color: "primary",
        isDark: true,
      },
    };
  },
  methods: {
    abrirDialogoEliminar(item) {
      this.selectedItem = Object.assign({}, item);
      Swal.fire({
        title: '¿Desea eliminar el registro?',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar'
      }).then(response => {
        if(response.isConfirmed) {
          this.$emit('eliminarRegistro', item);
        }
      });
    },
  },
};
</script>

<style>
</style>