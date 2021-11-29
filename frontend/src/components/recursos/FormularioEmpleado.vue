<template>
  <v-form ref="form" v-model="valid" lazy-validation class="px-8 pt-3">
    <v-row dense>
      <v-col cols="12" sm="12" md="12">
        <span>Nombre completo *</span>
        <v-text-field
          v-model="nombreCompleto"
          :rules="nombreRules"
          required
          clearable
          dense
          outlined
          autofocus
          hide-details="auto"
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="6" md="6">
        <span>Tipo de documento *</span>
        <v-select
          v-model="tipoDocumento"
          :items="tiposDocumentoLista"
          item-text="nombre"
          item-value="idTipoDocumento"
          no-data-items="Sin opciones"
          outlined
          dense
          hide-details="auto"
        ></v-select>
      </v-col>

      <v-col cols="12" sm="6" md="6">
        <span>Número de documento *</span>
        <v-text-field
          v-model="numeroDocumento"
          :rules="documentoRules"
          required
          clearable
          dense
          outlined
          hide-details="auto"
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="12" md="12">
        <span>Número de teléfono</span>
        <v-text-field
          v-model="numeroTelefono"
          :rules="telefonoRules"
          clearable
          dense
          outlined
          hide-details="auto"
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="12" md="12">
        <span>Número de celular *</span>
        <v-text-field
          v-model="numeroCelular"
          :rules="celularRules"
          clearable
          dense
          outlined
          hide-details="auto"
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="12">
        <span>Dirección *</span>
        <v-text-field
          v-model="direccion"
          :rules="direccionRules"
          required
          clearable
          dense
          outlined
          hide-details="auto"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="submit" depressed>
        {{ submitBtn }}</v-btn>
    </v-card-actions>
  </v-form>
</template>

<script>
import { getTiposDocumento } from "../../services/tipos/tipoDocumento.service";

export default {
  props: {
    esRegistro: Boolean,
    submitBtn: String,
  },
  data() {
    return {
      valid: true,
      cedula: "",
      nombreCompleto: "",
      tiposDocumentoLista: [],
      tipoDocumento: 0,
      numeroDocumento: "",
      numeroTelefono: "",
      numeroCelular: "",
      direccion: "",
      documentoRules: [
        (v) => !!v || "El número de documento es requerido",
        (v) => (v && v.length <= 10) || "Puede contener máximo 10 caracteres",
      ],
      nombreRules: [
        (v) => !!v || "El nombre es requerido",
        (v) => (v && v.length <= 200) || "Puede contener máximo 200 caracteres",
      ],
      telefonoRules: [
        (v) => {
          if(v.length > 7 || !v.match(/^\d*$/)) {
            return "Ingrese un teléfono válido";
          }

          return true;
        },
      ],
      celularRules: [
        (v) => {
          if(!v) {
            this.celularDetails = false;
            return "El celular es requerido";
          } else if(v.length != 10 || !v.match(/^\d{10}$/)) {
            this.celularDetails = false;
            return "Ingrese un celular válido";
          }

          this.celularDetails = true;
          return true;
        },
      ],
      direccionRules: [
        (v) => !!v || "La dirección es requerida",
        (v) => (v && v.length <= 200) || "Puede contener máximo 200 caracteres",
      ],
    };
  },
  mounted() {
    getTiposDocumento()
      .then(response => this.tiposDocumentoLista = response.data)
      .catch(err => console.log("Error:", err));
  },
  methods: {
    submit() {
      if(this.$refs.form.validate()) {
        var empleado = {
          'nombreCompleto': this.nombreCompleto.trim(),
          'tipoDocumento': this.tipoDocumento,
          'numeroDocumento': this.numeroDocumento.trim(),
          'numeroCelular': this.numeroCelular.trim(),
          'numeroTelefono': this.numeroTelefono.trim(),
          'direccionResidencia': this.direccion.trim()
        }

        this.$emit('submitEmpleado', empleado);
      }
    }
  },
};
</script>

<style scoped>
</style>