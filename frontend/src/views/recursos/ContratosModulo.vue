<template>
  <Tabla :titulo="tituloTabla" :labelBuscador="labelBuscador" :columnas="headers" :registros="items" v-on:eliminarItem="eliminarRegistro" />
</template>

<script>
import Tabla from "../../components/Tabla.vue";
export default {
  components: {
    Tabla,
  },
  data() {
    return {
      tituloTabla: "Contratos",
      labelBuscador: "Buscar contrato por código",
      headers: [
        {
          text: "Dessert (100g serving)",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Calories", value: "calories" },
        { text: "Fat (g)", value: "fat" },
        { text: "", value: "actions"}
      ],
      items: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          dialog: false,
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          dialog: false,
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          dialog: false,
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          dialog: false,
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          dialog: false,
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          dialog: false,
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          dialog: false,
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          dialog: false,
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          dialog: false,
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          dialog: false,
        },
      ],
    };
  },
  methods: {
    eliminarRegistro(registro) {
      if(registro) {
        console.log("Eliminar registro");
        this.items = this.items.filter(item => item != registro);
      }
    }
  }
};
</script>

<style>
</style>