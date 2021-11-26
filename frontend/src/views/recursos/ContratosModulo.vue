<template>
  <v-card>
    <v-toolbar flat>
      <v-card-title class="text-h5">{{ titulo }}</v-card-title>
      <v-spacer></v-spacer>

      <v-dialog v-model="dialogRegistro" max-width="500px" persistent>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-on="on" v-bind="attrs" color="primary" dark depressed>
            Agregar
          </v-btn>
        </template>

        <v-card>
          <v-toolbar dense flat class="pa-3 mb-2">
            <v-toolbar-title class="text-h5"> Registro de contrato </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon @click="cerrarDialogoRegistro">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>

          <v-window v-model="step">
            <v-window-item :value="1">
              <FormularioContratacion :submitBtn="continuarContratoBtn" @submitContrato="submitContrato" />
            </v-window-item>

            <v-window-item :value="2">
              <FormularioEmpleado :submitBtn="continuarEmpleadoBtn" @submitEmpleado="submitEmpleado" />
            </v-window-item>
          </v-window>
        </v-card>
      </v-dialog>
    </v-toolbar>

    <Tabla
      :columnas="headers"
      :registros="items"
      v-on:eliminarItem="eliminarRegistro"
    />
  </v-card>
</template>

<script>
import Tabla from "../../components/Tabla.vue";
import FormularioContratacion from "../../components/recursos/FormularioContratacion.vue";
import FormularioEmpleado from "../../components/recursos/FormularioEmpleado.vue";
import { agregarEmpleado } from '../../services/recursos/empleados.service';
import { agregarContrato } from '../../services/recursos/contratos.service';
import { agregarNumero } from '../../services/recursos/telefonosEmpleado.service';

export default {
  components: {
    Tabla,
    FormularioContratacion,
    FormularioEmpleado,
  },
  data() {
    return {
      validContrato: true,
      titulo: "Contratos",
      labelBuscador: "Buscar contrato por código",
      dialogRegistro: false,
      step: 1,
      headers: [
        {
          text: "Código",
          align: "start",
          sortable: false,
          value: "codigo",
        },
        { text: "Empleado", value: "empleado" },
        { text: "Cargo", value: "cargo" },
        { text: "Salario", value: "salario" },
        { text: "Estado", value: "estado" },
        { text: "Fecha contrato", value: "fechaContrato" },
        { text: "Fecha terminación", value: "fechaTerminacion" },
        { text: "", value: "actions" },
      ],
      items: [],
      contratoInput: {},
      empleadoInput: {},
      telefonoInput: {},
      celularInput: {},
      regresarBtn: "Regresar",
      continuarContratoBtn: "continuar",
      continuarEmpleadoBtn: "Guardar",
      esRegistro: true,
    };
  },
  methods: {
    eliminarRegistro(registro) {
      if (registro) {
        this.items = this.items.filter(
          (item) => item.codigo != registro.codigo
        );
      }
    },
    atrasWindow() {
      if(this.step === 2) {
        this.step -= 1;
      }
    },
    continuarWindow() {
      if(this.step === 1) {
        this.step += 1;
      }
    },
    cerrarDialogoRegistro() {
      this.step = 1;
      this.contrato = {};
      this.empleado = {};
      this.dialogRegistro = false;
    },
    submitContrato(contrato) {
      this.contratoInput = contrato;

      this.step += 1;
    },
    submitEmpleado(empleado) {
      this.celularInput = {
        'numero': empleado.numeroCelular,
        'numeroDocumento': empleado.numeroDocumento
      };
      delete empleado.numeroCelular;

      if(empleado.numeroTelefono) {
        this.telefonoInput = {
          'numero': empleado.numeroTelefono,
          'numeroDocumento': empleado.numeroDocumento
        }

        delete empleado.numeroTelefono;
      }

      this.empleadoInput = empleado;

      if(this.contratoInput) this.guardarRegistro();
    },
    guardarRegistro() {
      if(this.contratoInput && this.empleadoInput) {
        this.registrarEmpleado();
        
        this.registrarNumero(this.celularInput);

        if(this.telefonoInput.numero) this.registrarNumero(this.telefonoInput);

/*
        this.contratoInput.empleadoNumeroDocumento = this.empleadoInput.numeroDocumento;
        this.registrarContrato();
*/        
      }

    },
    registrarContrato() {
      agregarContrato(this.contratoInput)
        .then(response => console.log(response.data))
        .catch(err => console.error(err.response.data.message));

      this.contratoInput = {};
    },
    registrarEmpleado() {
      agregarEmpleado(this.empleadoInput)
        .then(response => console.log(response.data))
        .catch(err => console.error("Error: ", err.response.data.message));

      this.empleadoInput = {};
    },
    registrarNumero(numero) {
      agregarNumero(numero)
        .then(response => console.log(response.data))
        .catch(err => console.error(err.response.data.message));
    }
  },
  computed: {
    puedeRegresar() {
      return this.step > 1;
    }
  },
};
</script>

<style>
</style>