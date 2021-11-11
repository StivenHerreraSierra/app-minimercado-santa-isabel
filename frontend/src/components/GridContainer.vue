<template>
  <v-container fluid>
    <v-row align="center">
      <v-col md="3" v-for="item, index in items" :key="index">
        <CardPersona :persona="item" :acciones="buttons" :contain="contain" v-on:eventoTarjeta="emitirEvento" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CardPersona from "./CardPersona.vue";
export default {
    components: {
      CardPersona,
    },
    props: {
        items: Array,
        buttons: Array,
    },
    data() {
        return {
            contain: true,
        }
    },
    methods: {
      emitirEvento(boton, item) {
        console.log("Evento en grid")
        this.$emit('eventoTarjeta', boton, item);
      }
    }
}
</script>

<style>

</style>