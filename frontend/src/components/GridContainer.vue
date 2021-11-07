<template>
  <v-container fluid>
    <v-row align="center">
      <v-col md="3" v-for="item, index in items" :key="index">
        <v-card outlined tile class="">
          <v-img
            height="100"
            :contain="contain"
            class="indigo lighten-5"
            src="../assets/employee_icon.jpg"
          >
          </v-img>

          <v-card-title>{{ item.nombre }}</v-card-title>

          <v-card-subtitle>{{ item.cedula }}</v-card-subtitle>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn icon v-for="button in buttons" :key="button.accion">
              <v-icon :color="button.color">{{ button.icono }}</v-icon>
            </v-btn>
          </v-card-actions>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
    props: {
        items: Array,
        buttons: Array,
    },
    data() {
        return {
            contain: true,
        }
    },
}
</script>

<style>

</style>