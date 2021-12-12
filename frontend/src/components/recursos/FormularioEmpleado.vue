<template>
  <v-form ref="form" v-model="valid" lazy-validation class="px-8 pt-3">
    <v-row dense>
      <v-col cols="12" sm="12" md="12">
        <span>Nombre completo *</span>
        <v-text-field
          v-model="nombreCompleto"
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
          :disabled="esEdit"
        ></v-select>
      </v-col>

      <v-col cols="12" sm="6" md="6">
        <span>Número de documento *</span>
        <v-text-field
          v-model="numeroDocumento"
          required
          clearable
          dense
          outlined
          hide-details="auto"
          :disabled="esEdit"
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="12" md="12">
        <span>Número de teléfono</span>
        <v-text-field
          v-model="numeroTelefono"
          clearable
          dense
          outlined
          hide-details="auto"
          v-if="!esEdit"
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="12" md="12">
        <span>Número de celular *</span>
        <v-text-field
          v-model="numeroCelular"
          clearable
          dense
          outlined
          hide-details="auto"
          v-if="!esEdit"
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="12">
        <span>Dirección *</span>
        <v-text-field
          v-model="direccion"
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
      <v-btn color="primary" @click="submit" v-if="!esEdit" depressed>Guardar</v-btn>
      <v-btn color="primary" @click="editar" v-else depressed>Editar</v-btn>
    </v-card-actions>
  </v-form>
</template>

<script>
import { getTiposDocumento } from "../../services/tipos/tipoDocumento.service";
import { agregarEmpleado, getEmpleado, editarEmpleado } from "../../services/recursos/empleados.service"
import { agregarNumero, listarTelefonos } from "../../services/recursos/telefonosEmpleado.service";

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
    };
  },
  watch: {
    empleadoEditar() {
      this.limpiarCampos();
      this.getEmpleado();
    }
  },
  mounted() {
    this.getEmpleado();

    getTiposDocumento()
      .then(response => this.tiposDocumentoLista = response.data)
      .catch(err => console.log("Error:", err));

      this.$refs.form.resetValidation();
  },
  methods: {
    getEmpleado() {
      if(this.empleadoEditar) {
        getEmpleado(this.empleadoEditar)
          .then(response => {
            this.numeroDocumento = response.data[0].numeroDocumento;
            this.nombreCompleto = response.data[0].nombreCompleto;
            this.tipoDocumento = response.data[0].tipoDocumento;
            this.direccion = response.data[0].direccionResidencia;

            this.getTelefonos();
            this.esEdit = true;
          })
          .catch((err) => console.log(err.response.data.message));
      }
    },
    getTelefonos() {
      if(this.empleadoEditar) {
        listarTelefonos(this.empleadoEditar)
          .then(response => {
            if(response.data.length > 1) {
              let numeros = response.data.sort((n1, n2) => {
                return n2.numero.length - n1.numero.length;
              });

              this.numeroCelular = numeros[0].numero;
              this.numeroTelefono = numeros[1].numero;
            } else {
              this.numeroCelular = response.data[0].numero;
              this.numeroTelefono = "";
            }
          })
          .catch((err) => console.log(err.message));
      }
    },
    submit() {
      if(this.validarDatos()) {
        var empleado = {
          'nombreCompleto': this.nombreCompleto.trim(),
          'tipoDocumento': this.tipoDocumento,
          'numeroDocumento': this.numeroDocumento.trim(),
          'direccionResidencia': this.direccion.trim(),
        };

        agregarEmpleado(empleado)
          .then(() => {
            this.registrarNumero(this.numeroDocumento, {numero: this.numeroCelular.trim(), tipo: "MOVIL"});
            if(this.numeroTelefono.trim()) {
              this.registrarNumero(this.numeroDocumento, {numero: this.numeroTelefono.trim(), tipo: "TELEFONO_FIJO"});
            }

            this.mostrarMensaje('Empleado registrado', '', 'success', 2000);
            this.$emit('empleadoAgregado');
            this.limpiarCampos();
          })
          .catch((err) => this.mostrarMensaje('Error al registrar', err, 'error', 2000));
      } else {
        this.mostrarMensaje('Error al registrar', 'Faltan campos por llenar', 'error', 2000);
      }
    },
    editar() {
      if(this.validarDatos()) {
        var empleado = {
          'nombreCompleto': this.nombreCompleto.trim(),
          'tipoDocumento': this.tipoDocumento,
          'numeroDocumento': this.numeroDocumento.trim(),
          'direccionResidencia': this.direccion.trim(),
        };

        editarEmpleado(empleado)
          .then(() => {
            this.mostrarMensaje('Empleado editado', '', 'success', 2000);
            this.$emit('empleadoEditado');
            this.limpiarCampos();
          })
          .catch((err) => this.mostrarMensaje('Error al editado', err, 'error', 2000));
      } else {
        this.mostrarMensaje('Error al registrar', 'Faltan campos por llenar', 'error', 2000);
      }
    },
    validarDatos() {
      return this.nombreCompleto.trim()
          && this.numeroDocumento.trim()
          && this.numeroCelular.trim()
          && this.direccion.trim();
    },
    registrarNumero(empleado, numero) {
      agregarNumero(empleado, numero)
        .then((response) => console.log(response.data))
        .catch((err) => console.error(err.response.data.message));
    },
    limpiarCampos() {
      this.$refs.form.reset();
      this.esEdit = false;
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