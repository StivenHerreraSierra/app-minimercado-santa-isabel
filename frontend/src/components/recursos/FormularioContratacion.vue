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
      <v-btn color="primary" v-if="!esEdit" @click="submit" depressed>Guardar</v-btn>
      <v-btn color="primary" v-else @click="editar" depressed>Editar</v-btn>
    </v-card-actions>
  </v-form>
</template>

<script>
import { getContrato, getCargos, getEstados, agregarContrato, editarContrato } from '../../services/recursos/contratos.service';
import { getEmpleados } from "../../services/recursos/empleados.service";

export default {
  props: ['contratoEditar'],
  data() {
    return {
      valid: true,
      empleado: {},
      empleadosLista: [],
      dialogFechaCon: false,
      fechaContrato: "",
      dialogFechaTer: false,
      fechaTerminacion: "",
      cargosLista: [],
      cargo: 0,
      estadosLista: [],
      estado: "",
      salario: "",
      detalles: "",
      esEdit: false
    };
  },
  watch: {
    contratoEditar() {
      this.limpiarCampos();
      this.getContrato();
    }
  },
  methods: {
    submit() {
      if(this.validarDatos()) {
      const contrato = {
        empleado: this.empleado,
        fechaContratacion: this.fechaContrato,
        fechaTerminacion: this.fechaTerminacion,
        estadoContrato: this.estado,
        cargoId: this.cargo,
        salario: this.salario,
        detalles: this.detalles
      };

      agregarContrato(contrato)
        .then(res => {
          this.mostrarMensaje('Contrato registrado', res.data.message, 'success', 2000);
          this.$emit('contratoRegistrado');
          this.limpiarCampos();
        })
        .catch(err => this.mostrarMensaje('Error al registrar', err.message, 'error', 2000));
      } else {
        this.mostrarMensaje('Error al registrar', 'Faltan campos por llenar', 'error', 2000);
      }
    },
    editar() {
      if(this.validarDatos()) {
        const contrato = {
          empleado: this.empleado,
          fechaContratacion: this.fechaContrato,
          fechaTerminacion: this.fechaTerminacion,
          estadoContrato: this.estado,
          cargoId: this.cargo,
          salario: this.salario,
          detalles: this.detalles,
          codigo: this.contratoEditar
        };

        console.log(contrato);

        editarContrato(contrato)
          .then(res => {
            this.mostrarMensaje('Contrato editado', res.data.message, 'success', 2000);
            this.$emit('contratoEditado');
            this.limpiarCampos();
          })
          .catch(err => this.mostrarMensaje('Error al editar', err.message, 'error', 2000));
      } else {
        this.mostrarMensaje('Error al editar', 'Faltan campos por llenar', 'error', 2000);
      }
    },
    validarDatos() {
      return this.empleado
        && this.fechaContrato
        && this.fechaTerminacion
        && this.estado
        && this.cargo
        && this.salario;
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
    },
    getContrato() {
      if(this.contratoEditar) {
        getContrato(this.contratoEditar)
          .then(response => {
            this.empleado = response.data[0].empleado;
            this.fechaContrato = new Date(response.data[0].fechaContratacion).toISOString().slice(0, 10);
            this.fechaTerminacion = new Date(response.data[0].fechaTerminacion).toISOString().slice(0, 10);
            this.estado = response.data[0].estado;
            this.cargo = response.data[0].codigoCargo;
            this.salario = response.data[0].salario;
            this.detalles = response.data[0].detalles;

            this.esEdit = true;
          })
          .catch((err) => console.log(err.message));
      }
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

    this.getContrato()
  },
};
</script>

<style scoped>
</style>