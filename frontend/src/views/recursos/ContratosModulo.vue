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
              <FormularioContratacion />
            </v-window-item>

            <v-window-item :value="2">
              <FormularioEmpleado :esEdit="false" />
            </v-window-item>
          </v-window>

          <v-card-actions class="mt-6">
            <v-btn
              color="primary"
              @click="atrasWindow"
              depressed
              :disabled="atrasEnabled"
              >Regresar</v-btn
            >
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              @click="continuarWindow"
              depressed
              :disabled="continuarEnabled"
              >Continuar</v-btn
            >
          </v-card-actions>
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

export default {
  components: {
    Tabla,
    FormularioContratacion,
    FormularioEmpleado,
  },
  data() {
    return {
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
      this.step = this.step === 1 ? 2 : this.step - 1;
    },
    continuarWindow() {
      this.step = this.step === 2 ? 1 : this.step + 1;
    },
    cerrarDialogoRegistro() {
      this.step = 1;
      this.contrato = {};
      this.empleado = {};
      this.dialogRegistro = false;
    }
  },
  computed: {
    continuarEnabled() {
      return this.step != 1;
    },
    atrasEnabled() {
      return this.step != 2;
    },
  },
};
</script>

<style>
</style>