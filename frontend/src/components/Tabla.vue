<template>
  <v-card>
    <v-card-title class="text-h5">{{ titulo }}</v-card-title>

    <v-data-table
      :headers="columnas"
      :items="registros"
      >
      <template v-slot:top>
        <v-dialog v-model="dialogDelete" persistent >
          <DialogoEliminar :item="selectedItem"  v-on:confirmar="eliminarItem" v-on:cancelar="cerrarDialogoEliminar" />
        </v-dialog>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-icon @click="abrirDialogoEliminar(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import DialogoEliminar from "./DialogoEliminar.vue";

export default {
  components: {
    DialogoEliminar,
  },
  props: {
    titulo: String,
    labelBuscador: String,
    columnas: Array,
    registros: Array,
  },
  data() {
    return {
      search: "",
      dialog: false,
      dialogDelete: false,
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
      this.dialogDelete = true;
    },
    cerrarDialogoEliminar() {
      this.selectedItem = {};
      this.dialogDelete = false;
      console.log("cerrar", this.dialogDelete);
    },
    eliminarItem() {
      if(this.selectedItem) {
        this.$emit('eliminarItem', this.selectedItem);
        this.$forceUpdate();
      }
    }
  },
};
</script>

<style>
</style>