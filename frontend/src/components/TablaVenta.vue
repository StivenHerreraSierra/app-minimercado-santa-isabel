<template>
  <v-data-table :headers="columnas" :items="registros">
    <template v-slot:[`item.fechaVenta`]="{ item }">
      {{ new Date(item.fechaVenta).toLocaleDateString() }}
    </template>

    <template v-slot:[`item.costo`]="{ item }">
      {{ item.costo || 0 }}
    </template>

    <template v-slot:[`item.actions`]="{ item }">
      <v-btn fab x-small color="primary" class="mr-2" @click="editarVenta(item.codigo)">
        <v-icon> mdi-pencil </v-icon>
      </v-btn>
      <v-btn fab x-small color="error"  @click="abrirDialogoEliminar(item)">
        <v-icon> mdi-delete </v-icon>
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import { eliminarVenta } from "../services/recursos/ventas.service";
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
          eliminarVenta(item.codigo)
            .then(res => {
              this.mostrarMensaje('Factura de venta eliminada', res.data.message, 'success', 2000)
              this.$emit("ventaEliminada");
            })
            .catch(err => this.mostrarMensaje('Error al eliminar', err.message, 'error', 2000));
        }
      });
    },
    editarVenta(venta) {
      this.$emit('editarVenta', venta);
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