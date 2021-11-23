<template>
  <v-form ref="form" v-model="valid" lazy-validation class="px-8 pt-3">
    <v-row dense>
      <v-col cols="12" sm="12" md="12">
        <span>Nombre completo</span>
        <v-text-field
          v-model="nombreCompleto"
          :rules="nombreRules"
          required
          clearable
          dense
          outlined
          hide-details="auto"
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="6" md="6">
        <span>Tipo de documento</span>
        <v-select
          v-model="tipoDocumento"
          :items="tipoDocumentoItems"
          outlined
          dense
          hide-details
        ></v-select>
      </v-col>

      <v-col cols="12" sm="6" md="6">
        <span>Número de documento</span>
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
        <span>Número de celular</span>
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
        <span>Dirección</span>
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
  </v-form>
</template>

<script>
export default {
  props: {
    esEdit: Boolean,
  },
  data() {
    return {
      valid: true,
      cedula: "",
      nombreCompleto: "",
      tipoDocumentoItems: [],
      tipoDocumento: "",
      numeroDocumento: "",
      numeroTelefono: "",
      numeroCelular: "",
      direccion: "",
      empleado: {},
      documentoRules: [
        (v) => !!v || "La cédula es requerida",
        (v) => (v && v.length <= 10) || "Puede contener máximo 10 caracteres",
      ],
      nombreRules: [
        (v) => !!v || "El nombre es requerido",
        (v) => (v && v.length <= 200) || "Puede contener máximo 200 caracteres",
      ],
      telefonoRules: [
        (v) => {
          if(!v) {
            this.telefonoDetails = false;
            return "El Teléfono es requerido";
          } else if(v.length != 7 || !v.match(/^\d{7}$/)) {
            this.telefonoDetails = false;
            return "Ingrese un teléfono válido";
          }

          this.telefonoDetails = true;
          return true;
        },
      ],
      celularRules: [
        (v) => !!v || "El celular es requerido",
        (v) => (v && v.length == 10 && v.match(/^\d{10}$/)) || "Ingrese un teléfono válido",
      ],
      direccionRules: [
        (v) => !!v || "La dirección es requerida",
        (v) => (v && v.length <= 200) || "Puede contener máximo 200 caracteres",
      ],
      btnPrimario: "Registrar",
      btnSecundario: "Limpiar",
    };
  },
  created() {
    if (this.esEdit) {
      this.empleado = JSON.parse(localStorage.getItem("empleadoEdit"));

      if (this.empleado) {
        this.cedula = this.empleado.cedula;
        this.nombre = this.empleado.nombre;
        this.btnPrimario = "Editar";
      }
    }
  },
};
</script>

<style scoped>
</style>