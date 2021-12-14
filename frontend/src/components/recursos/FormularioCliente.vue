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
        <span>Número de teléfono/celular *</span>
        <v-text-field
          v-model="numeroTelefono"
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
import { agregarCliente, getCliente, editarCliente } from "../../services/recursos/clientes.service";

export default {
  props: {
    clienteEditar: String
  },
  data() {
    return {
      valid: true,
      numeroDocumento: "",
      nombreCompleto: "",
      tiposDocumentoLista: [],
      tipoDocumento: 0,
      numeroTelefono: "",
      direccion: "",
      esEdit: false,
    };
  },
  watch: {
    clienteEditar() {
      this.limpiarCampos();
      this.getCliente();
    }
  },
  mounted() {
    this.getCliente();

    getTiposDocumento()
      .then(response => this.tiposDocumentoLista = response.data)
      .catch(err => console.log("Error:", err));
  },
  methods: {
    getCliente() {
      if(this.clienteEditar) {
        getCliente(this.clienteEditar)
          .then(response => {
            this.numeroDocumento = response.data[0].numeroDocumento;
            this.nombreCompleto = response.data[0].nombreCompleto;
            this.tipoDocumento = response.data[0].tipoDocumento;
            this.direccion = response.data[0].direccionResidencia;
            this.numeroTelefono = response.data[0].telefono;

            this.esEdit = true;
          })
          .catch((err) => console.log(err.response.data.message));
      }
    },
    submit() {
      if(this.validarDatos()) {
        var cliente = {
          'nombreCompleto': this.nombreCompleto.trim(),
          'tipoDocumento': this.tipoDocumento,
          'numeroDocumento': this.numeroDocumento.trim(),
          'direccionResidencia': this.direccion.trim(),
          'telefono': this.numeroTelefono.trim()
        };

        agregarCliente(cliente)
          .then(() => {
            this.mostrarMensaje('Cliente registrado', '', 'success', 2000);
            this.$emit('clienteAgregado');
            this.limpiarCampos();
          })
          .catch((err) => this.mostrarMensaje('Error al registrar', err, 'error', 2000));
      } else {
        this.mostrarMensaje('Error al registrar', 'Faltan campos por llenar', 'error', 2000);
      }
    },
    editar() {
      if(this.validarDatos()) {
        var cliente = {
          'nombreCompleto': this.nombreCompleto.trim(),
          'tipoDocumento': this.tipoDocumento,
          'numeroDocumento': this.numeroDocumento.trim(),
          'direccionResidencia': this.direccion.trim(),
          'telefono': this.numeroTelefono.trim()
        };

        editarCliente(cliente)
          .then(() => {
            this.mostrarMensaje('Cliente editado', '', 'success', 2000);
            this.$emit('clienteEditado');
            this.limpiarCampos();
          })
          .catch((err) => this.mostrarMensaje('Error al editar', err, 'error', 2000));
      } else {
        this.mostrarMensaje('Error al registrar', 'Faltan campos por llenar', 'error', 2000);
      }
    },
    validarDatos() {
      return this.nombreCompleto.trim()
          && this.numeroDocumento.trim()
          && this.direccion.trim()
          && this.numeroTelefono.trim();
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