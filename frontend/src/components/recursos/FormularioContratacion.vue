<template>
  <v-form ref="form" v-model="valid" lazy-validation class="px-8 pt-3">
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
        <span>Fecha contratación *</span>
        <v-menu
          transition="scale-transition"
          offset-y
          min-width="auto"
          :close-on-content-click="false"
          v-model="dialogFechaCon"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="fechaContrato"
              append-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
              :rules="fechaContratacionRules"
              outlined
              dense
              hide-details="auto"
            ></v-text-field>
          </template>

          <v-date-picker
            v-model="fechaContrato"
            no-title
            @input="dialogFechaCon = false"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" sm="12" md="12">
        <span>Fecha de terminación *</span>
        <v-menu
          transition="scale-transition"
          offset-y
          min-width="auto"
          v-model="dialogFechaTer"
          :close-on-content-click="false"
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
            no-title
            @input="dialogFechaTer = false"
          ></v-date-picker>
        </v-menu>
      </v-col>

      <v-col cols="12" sm="12" md="12">
        <span>Cargo *</span>
        <v-select
          v-model="cargo"
          :items="cargosLista"
          item-text="nombre"
          item-value="codigo"
          outlined
          dense
          hide-details="auto"
        ></v-select>
      </v-col>

      <v-col cols="12" sm="12" md="12">
        <span>Salario *</span>
        <v-text-field
          v-model="salario"
          prepend-inner-icon="mdi-currency-usd"
          outlined
          dense
          hide-details="auto"
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="12" md="12">
        <span>Detalles</span>
        <v-textarea outlined v-model="detalles" hide-details="auto">
        </v-textarea>
      </v-col>
    </v-row>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="submit" depressed> {{ submitBtn }}</v-btn>
    </v-card-actions>
  </v-form>
</template>

<script>
import { getCargos } from '../../services/recursos/contratos.service';

export default {
  props: {
    esRegistro: Boolean,
    submitBtn: String,
    contratoRegistrado: Boolean
  },
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
      cargosLista: [],
      cargo: 0,
      salario: "",
      detalles: "",
      fechaContratacionRules: [(v) => !!v || "Campo requerido"],
      contrato: {},
    };
  },
  methods: {
    submit() {
      this.contrato = {
        fechaContratacion: this.fechaContrato,
        fechaTerminacion: this.fechaTerminacion,
        cargoId: this.cargo,
        salario: this.salario,
        detalles: this.detalles
      };

      this.$emit('submitContrato', this.contrato);
    },
    limpiarCampos() {
      this.fechaContrato = new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10);
      this.fechaTerminacion = "";
      this.cargo = 0;
      this.salario = "";
      this.detalles = "";
      this.contrato = {};
    }
  },
  mounted() {
    getCargos()
      .then(response => this.cargosLista = response.data)
      .catch(err => console.error(err.message));
  },
  watch: {
    contratoRegistrado(nuevo) {
      if(nuevo) {
        this.limpiarCampos();
      }
    }
  }
};
</script>

<style scoped>
</style>