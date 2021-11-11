<template>
  <v-card outlined tile class="">
    <v-img
      height="100"
      :contain="contain"
      class="indigo lighten-5"
      src="../assets/employee_icon.jpg"
    >
    </v-img>

    <v-card-title>{{ persona.nombre }}</v-card-title>

    <v-card-subtitle>{{ persona.cedula }}</v-card-subtitle>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn icon v-for="button in acciones" :key="button.nombre" @click="emitirEvento(button, persona)" :title="button.nombre">
        <v-icon :color="button.color">{{ button.icono }}</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
    props: {
        contain: Boolean,
        persona: Object,
        acciones: Array
    },
    methods: {
        emitirEvento(boton, persona) {
            console.log("Evento en tarjeta")
            this.$emit("eventoTarjeta", boton, persona);
        }
    }
};
</script>

<style>
</style>