<template>
  <v-form ref="form" v-model="valid" lazy-validation class="px-8 pt-3">
    <v-row dense>
      <v-col cols="12" sm="12" md="12">
        <span>Empleado *</span>
        <v-select
          v-model="empleado"
          :items="empleadosLista"
          item-text="nombreCompleto"
          item-value="numeroDocumento"
          outlined
          dense
          hide-details="auto"
          placeholder="Seleccione un empleado"
        ></v-select>
      </v-col>

      <v-col cols="12" sm="12" md="6">
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
      <v-col cols="12" sm="12" md="6">
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
        <span>Estado *</span>
        <v-select
          v-model="estado"
          :items="estadosLista"
          item-text="nombre"
          item-value="codigo"
          outlined
          dense
          hide-details="auto"
          placeholder="Seleccione un estado"
        ></v-select>
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
          placeholder="Seleccione un cargo"
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
        <v-textarea outlined v-model="detalles" hide-details="auto" no-resize>
        </v-textarea>
      </v-col>
    </v-row>

    <v-card-actions>
      <v-spacer />
      <v-btn color="primary" @click="submit" depressed>Guardar</v-btn>
    </v-card-actions>
  </v-form>
</template>

<script>
import { getCargos, getEstados, agregarContrato } from '../../services/recursos/contratos.service';
import { getEmpleados } from "../../services/recursos/empleados.service";

export default {
  data() {
    return {
      valid: true,
      empleado: {},
      empleadosLista: [],
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
      estadosLista: [],
      estado: "",
      salario: "",
      detalles: "",
    };
  },
  methods: {
    submit() {
      const contrato = {
        empleado: this.empleado,
        fechaContratacion: this.fechaContrato,
        fechaTerminacion: this.fechaTerminacion,
        estadoContrato: this.estado,
        cargoId: this.cargo,
        salario: this.salario,
        detalles: this.detalles
      };

      console.log(contrato);

      agregarContrato(contrato)
        .then(res => this.mostrarMensaje('Contrato registrado', res.data.message, 'success', 2000))
        .catch(err => this.mostrarMensaje('Error al registrar', err.message, 'error', 2000));
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
    },
    limpiarCampos() {
      this.$refs.form.reset();

      this.fechaContrato = new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10);
    }
  },
  mounted() {
    getCargos()
      .then(response => this.cargosLista = response.data)
      .catch(err => console.error(err.response.data.message));

    getEstados()
      .then(response => this.estadosLista = response.data)
      .catch(err => console.error(err.response.data.message));

    getEmpleados()
      .then((response) => this.empleadosLista = response.data)
      .catch(err => console.error(err));
  },
};
</script>

<style scoped>
</style>