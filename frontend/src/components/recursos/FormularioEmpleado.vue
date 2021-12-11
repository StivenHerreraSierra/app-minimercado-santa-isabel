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
          placeholder="Seleccione un tipo"
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
      <v-btn color="primary" @click="submit" depressed>Guardar</v-btn>
    </v-card-actions>
  </v-form>
</template>

<script>
import { getTiposDocumento } from "../../services/tipos/tipoDocumento.service";
import { agregarEmpleado, getEmpleado } from "../../services/recursos/empleados.service"
import { agregarNumero } from "../../services/recursos/telefonosEmpleado.service";

export default {
  props: {
    esRegistro: Boolean,
    empleadoEditar: String
  },
  data() {
    return {
      valid: true,
      numeroDocumento: "",
      nombreCompleto: "",
      tiposDocumentoLista: [],
      tipoDocumento: 0,
      numeroTelefono: "",
      numeroCelular: "",
      direccion: "",
      esEdit: false,
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
  created() {
    if(this.empleadoEditar) {
      getEmpleado(this.empleadoEditar)
        .then(response => {
          console.log(response.data[0]);
          
          this.numeroDocumento = response.data[0].numeroDocumento;
          this.nombreCompleto = response.data[0].nombreCompleto;
          this.tipoDocumento = response.data[0].tipoDocumento;
          this.numeroTelefono = "";
          this.numeroCelular = "";
          this.direccion = response.data[0].direccionResidencia;
          this.esEdit = true;
        })
        .catch((err) => console.log(err.response.data.message));
    }
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
          'direccionResidencia': this.direccion.trim(),
        };

        agregarEmpleado(empleado)
          .then(() => {
            this.registrarNumero(this.numeroDocumento, {numero: this.numeroCelular.trim()});
            if(this.numeroTelefono.trim()) {
              this.registrarNumero(this.numeroDocumento, {numero: this.numeroTelefono.trim()});
            }

            this.mostrarMensaje('Empleado registrado', '', 'success', 2000);
          })
          .catch((err) => this.mostrarMensaje('Error al registrar', err, 'error', 2000));
      }
    },
    registrarNumero(empleado, numero) {
      agregarNumero(empleado, numero)
        .then((response) => console.log(response.data))
        .catch((err) => console.error(err.response.data.message));
    },
    limpiarCampos() {
      this.numeroDocumento = "";
      this.nombreCompleto = "";
      this.tipoDocumento = 0;
      this.numeroDocumento = "";
      this.numeroTelefono = "";
      this.numeroCelular = "";
      this.direccion = "";
    },
    mostrarMensaje(title, text, icon, timer) {
      this.$swal({
        title,
        text,
        icon,
        toast: true,
        position: 'top-end',
        timer,
        showConfirmButton: false
      });
    }
  },
};
</script>

<style scoped>
</style>