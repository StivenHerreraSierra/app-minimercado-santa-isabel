<template>
  <v-sheet color="grey lighten-4" class="pa-4" id="background-color">
    <v-avatar class="mb-4" color="grey darken-1" size="64">
      <img :src="picture" alt="foto" />
    </v-avatar>

    <div class="white--text">john@vuetifyjs.com</div>
  </v-sheet>
  
</template>

<script>
import image from "../assets/userImage.jpg";

export default {
    data() {
        return {
            picture: image,
        }
    },
};
</script>

<style>
</style>