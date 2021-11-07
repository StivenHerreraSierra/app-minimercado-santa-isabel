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
        ["mdi-receipt", "Facturas"],
        ["mdi-package-up", "Pedidos"],
        ["mdi-truck-outline", "Proveedores"],
        ["mdi-clipboard-account", "Vendedores"],
      ],
    };
  },
};
</script>

<style>
</style>