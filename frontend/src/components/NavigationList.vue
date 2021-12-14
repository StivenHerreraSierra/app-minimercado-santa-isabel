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
      ["mdi-file-document-outline", "Contratos", "/contratos"],
      ["mdi-account-multiple-outline", "Empleados", "/empleados"],
      ["mdi-cart-outline", "Clientes", "/clientes"],
      ["mdi-basket-outline", "Ventas", "/ventas"],
      ["mdi-chart-pie", "Reportes", "/reportes"],
    ],
  }),
};
</script>

<style>
</style>