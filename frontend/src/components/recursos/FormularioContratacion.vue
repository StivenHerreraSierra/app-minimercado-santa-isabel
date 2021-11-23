<template>
  <v-form ref="form" v-model="valid" lazy-validation class="px-8 pt-3" >
    <v-row dense>
      <v-col cols="12" sm="12" md="12">
        <span>Negocio</span>
        <v-text-field
          hide-details="auto"
          :value="nombreNegocio"
          disabled
          outlined
          dense
          filled
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="12" md="12">
        <span>Fecha contratación</span>
        <v-menu
          transition="scale-transition"
          offset-y
          min-width="auto"
          v-model="dialogFechaCon"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="fechaContrato"
              append-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
              outlined
              dense
              hide-details="auto"
              required
            ></v-text-field>
          </template>

          <v-date-picker
            v-model="fechaContrato"
            @input="dialogFechaCon = false"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" sm="12" md="12">
        <span>Fecha de terminación</span>
        <v-menu
          transition="scale-transition"
          offset-y
          min-width="auto"
          v-model="dialogFechaTer"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="fechaTerminacion"
              append-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
              outlined
              dense
              hide-details="auto"
            ></v-text-field>
          </template>

          <v-date-picker
            v-model="fechaTerminacion"
            @input="dialogFechaTer = false"
          ></v-date-picker>
        </v-menu>
      </v-col>

      <v-col cols="12" sm="12" md="12">
        <span>Cargo</span>
        <v-combobox
          v-model="cargo"
          :items="cargoItems"
          outlined
          dense
          hide-details="auto"
          required
        ></v-combobox>
      </v-col>

      <v-col cols="12" sm="12" md="12">
        <span>Salario</span>
        <v-text-field
          v-model="salario"
          prepend-inner-icon="mdi-currency-usd"
          outlined
          dense
          hide-details="auto"
          required
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="12" md="12">
        <span>Detalles</span>
        <v-textarea outlined v-model="detalles" hide-details="auto">
        </v-textarea>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      valid: true,
      nombreNegocio: "Minimercado Santa Isabel",
      dialogFechaCon: false,
      fechaContrato: new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10),
      dialogFechaTer: false,
      fechaTerminacion: "",
      cargoItems: [],
      cargo: "",
      salario: "",
      detalles: "",
    };
  },
};
</script>

<style scoped>
</style>