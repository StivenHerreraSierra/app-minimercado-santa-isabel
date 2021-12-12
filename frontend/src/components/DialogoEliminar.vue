<template>
  <v-card>
    <v-card-title class="text-h5"
      >¿Desea eliminar el contrato {{ item.name }}?</v-card-title
    >
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn class="blue darken-1" text @click="cancelar">Cancelar</v-btn>
      <v-btn class="blue darken-1" text @click="confirmar">Confirmar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    item: Object,
  },
  mounted() {
    console.log(this.item);
  },
  methods: {
    cancelar() {
      this.$emit('cancelar');
    },
    confirmar() {
      this.$emit('confirmar');
    }
  }
};
</script>

<style>
</style>