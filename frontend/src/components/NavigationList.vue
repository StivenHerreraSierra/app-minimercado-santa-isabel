<template>
  <v-list dense>
    <v-list-item
      v-for="[icon, text, path] in links"
      :key="icon"
      link
      :to="path"
    >
      <v-list-item-icon>
        <v-icon>{{ icon }}</v-icon>
      </v-list-item-icon>

      <v-list-item-content>
        <v-list-item-title>{{ text }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  data: () => ({
    links: [
      ["mdi-truck", "Compras", "/compras"],
      ["mdi-currency-usd", "Finanzas", "/finanzas"],
      ["mdi-wallet-giftcard", "Recursos", "/recursos"],
      ["mdi-shopping-outline", "Ventas", "/ventas"],
    ],
  }),
};
</script>

<style>
</style>