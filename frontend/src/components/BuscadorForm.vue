<template>
  <v-text-field
    append-icon="mdi-magnify"
    type="text"
    v-model="texto"
    :placeholder="label"
    @click:append="buscar"
  ></v-text-field>
</template>

<script>
export default {
    props: {
        label: String,
    },
    data() {
        return {
            texto: "",
        }
    },
    methods: {
        buscar() {
            this.$emit("buscar", this.texto)
        }
    },
};
</script>

<style>
</style>