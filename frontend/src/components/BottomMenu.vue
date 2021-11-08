<template>
  <v-bottom-navigation
    horizontal
    fixed
  >
    <v-btn v-for="[icono, nombre] in items" :key="nombre"  color="blue accent-4" text @click="clicked(nombre)">
      <span>{{ nombre }}</span>

      <v-icon class="mr-2">{{ icono }}</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
    props: {
        items: Array,
    },
    methods: {
      clicked(elemento) {
        this.$emit('click', elemento);
      }
    },
};
</script>

<style scoped>
</style>