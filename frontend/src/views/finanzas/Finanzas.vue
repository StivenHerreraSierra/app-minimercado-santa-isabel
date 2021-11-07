<template>
  <BottomMenu v-bind:items="items" />
</template>

<script>
import BottomMenu from "../../components/BottomMenu.vue";

export default {
  components: {
    BottomMenu,
  },
  data() {
    return {
      items: [
        ["mdi-piggy-bank", "Cierres de caja"],
        ["mdi-cash-100", "Gastos"],
        ["mdi-file-document-outline", "Facturas de compra"],
        ["mdi-receipt", "Facturas de venta"],
      ],
    };
  },
};
</script>

<style>
</style>