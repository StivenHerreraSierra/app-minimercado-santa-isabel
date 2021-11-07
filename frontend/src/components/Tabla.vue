<template>
  <v-data-table :headers="headers">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Empleados</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
      </v-toolbar>
    </template>
  </v-data-table>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        {
          text: "Cédula",
          align: "start",
          sortable: false,
          value: "cedula",
        },
        { text: "Nombre", value: "nombre" },
      ],
    };
  },
};
</script>

<style>
</style>