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
        ["mdi-account-multiple", "Clientes"],
        ["mdi-moped", "Pedidos"],
        ["mdi-receipt", "Facturas"]
      ],
    };
  },
};
</script>

<style>
</style>