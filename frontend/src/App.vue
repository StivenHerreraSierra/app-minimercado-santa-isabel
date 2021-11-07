<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" temporary app>
      <NavigationUser />
      <NavigationList />
    </v-navigation-drawer>

    <!--<v-app-bar id="background-color" dense color="grey lighten-4" app>-->

    <v-app-bar id="background-color" dense app>
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        color="white"
      ></v-app-bar-nav-icon>

      <v-toolbar-title class="pa-2 white--text">
        <span class="text-h5 d-flex justify">
          <img class="mr-2" height="30px" :src="logo" />
          {{ titulo }}
        </span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn text color="white">
        {{ logout }}
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import logo from "./assets/store.png"
import NavigationUser from "./components/NavigationUser.vue";
import NavigationList from "./components/NavigationList.vue";
//import AppBar from "./components/AppBar.vue";

export default {
  components: {
    NavigationUser,
    NavigationList,
    //AppBar,
  },
  data() {
    return {
      drawer: true,
      titulo: 'Minimercado Santa Isabel',
      logo: logo,
      logout: "Cerrar sesión",
    };
  },
};
</script>

<style>
#background-color {
  background-color: #4169e1 !important;
}
</style>