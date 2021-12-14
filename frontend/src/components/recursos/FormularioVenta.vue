<template>
  <v-form ref="form" lazy-validation class="px-8 pt-3">
    <v-row dense>
      <v-col cols="12" sm="12" md="12">
        <span>Fecha de venta *</span>
        <v-text-field
          v-model="fechaVenta"
          outlined
          dense
          hide-details="auto"
          disabled
        ></v-text-field>
      </v-col>

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

      <v-col cols="12" sm="12" md="12">
        <span>Cliente *</span>
        <v-select
          v-model="cliente"
          :items="clientesLista"
          item-text="nombreCompleto"
          item-value="numeroDocumento"
          outlined
          dense
          hide-details="auto"
          placeholder="Seleccione un cliente"
        ></v-select>
      </v-col>

      <v-col cols="12" sm="12" md="12">
        <span>Total impuestos *</span>
        <v-text-field
          v-model="totalImpuestos"
          prepend-inner-icon="mdi-currency-usd"
          outlined
          dense
          hide-details="auto"
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="12" md="12">
        <span>Total descuentos *</span>
        <v-text-field
          v-model="totalDescuentos"
          prepend-inner-icon="mdi-currency-usd"
          outlined
          dense
          hide-details="auto"
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="12" md="12">
        <span>Productos comprados *</span>
        <v-card min-width="100%" max-height="250" style="overflow: auto">
          <v-list shaped>
            <v-list-item-group
              v-model="productosComprados"
              multiple
            >
              <template v-for="producto in productos">
                <v-divider v-if="!producto" :key="producto.codigo"></v-divider>

                <v-list-item
                  v-else
                  :key="producto.codigo"
                  :value="producto"
                  active-class="deep-purple--text text--accent-4"
                >
                  <template v-slot:default="{ active }">
                    <v-list-item-content>
                      <v-list-item-title
                        v-text="producto.nombre"
                      ></v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-action>
                      <v-checkbox
                        :input-value="productosComprados.includes(producto)"
                        color="deep-purple accent-4"
                        :value="active"
                      ></v-checkbox>
                    </v-list-item-action>
                  </template>
                </v-list-item>
              </template>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
    <v-card-actions>
      <v-spacer />
      <v-btn color="primary" v-if="!esEdit" @click="submit" depressed
        >Guardar</v-btn
      >
      <v-btn color="primary" v-else @click="editar" depressed>Editar</v-btn>
    </v-card-actions>
  </v-form>
</template>

<script>
import {
  getVenta,
  agregarVenta,
  editarVenta,
} from "../../services/recursos/ventas.service";
import {
  getEmpleados,
  getEmpleado,
} from "../../services/recursos/empleados.service";
import {
  getClientes,
  getCliente,
} from "../../services/recursos/clientes.service";
import { getProductos, agregarProductoVenta, getProductosComprados } from "../../services/recursos/productos.service";

export default {
  props: ["ventaEditar"],
  data() {
    return {
      empleado: {},
      empleadosLista: [],
      cliente: {},
      clientesLista: [],
      totalImpuestos: 0,
      totalDescuentos: 0,
      fechaVenta: new Date().toISOString().slice(0, 19).replace("T", " "),
      esEdit: false,
      productos: [],
      productosComprados: [],
    };
  },
  watch: {
    ventaEditar() {
      this.limpiarCampos();
      this.getVenta();
    },
  },
  methods: {
    submit() {
        console.log(this.productosComprados);
      if (this.validarDatos()) {
        const venta = {
          empleado: this.empleado,
          cliente: this.cliente,
          totalImpuestos: parseFloat(this.totalImpuestos),
          totalDescuentos: parseFloat(this.totalDescuentos),
          fechaVenta: this.fechaVenta,
        };

        agregarVenta(venta)
          .then((res) => {
            this.agregarProductos(res.data.result.insertId);

            this.mostrarMensaje(
              "Venta registrada",
              res.data.message,
              "success",
              2000
            );
            this.$emit("ventaRegistrada");
            this.limpiarCampos();
          })
          .catch((err) =>
            this.mostrarMensaje(
              "Error al registrar",
              err.message,
              "error",
              2000
            )
          );
      } else {
        this.mostrarMensaje(
          "Error al registrar",
          "Faltan campos por llenar",
          "error",
          2000
        );
      }
    },
    agregarProductos(codigoVenta) {
        for(let producto of this.productosComprados) {
            agregarProductoVenta({
                "codigoVenta": codigoVenta,
                "codigoProducto": producto.codigo,
                "precio": producto.precio,
                "cantidad": 1
            })
            .then(res => console.log(res.data.message))
            .catch(err => console.error(err));
        }
    },
    editar() {
      if (this.validarDatos()) {
        const venta = {
          empleado: this.empleado,
          cliente: this.cliente,
          totalImpuestos: parseFloat(this.totalImpuestos),
          totalDescuentos: parseFloat(this.totalDescuentos),
          fechaVenta: this.fechaVenta.slice(0, 19).replace("T", " "),
          codigo: this.ventaEditar,
        };

        editarVenta(venta)
          .then((res) => {
            this.agregarProductos(this.ventaEditar);

            this.mostrarMensaje(
              "Venta editada",
              res.data.message,
              "success",
              2000
            );
            this.$emit("ventaEditada");
            this.limpiarCampos();
          })
          .catch((err) =>
            this.mostrarMensaje("Error al editar", err.message, "error", 2000)
          );
      } else {
        this.mostrarMensaje(
          "Error al editar",
          "Faltan campos por llenar",
          "error",
          2000
        );
      }
    },
    validarDatos() {
      return this.empleado && this.cliente && this.fechaVenta;
    },
    mostrarMensaje(title, text, icon, timer) {
      this.$swal({
        title,
        text,
        icon,
        toast: true,
        position: "top-end",
        timer,
        showConfirmButton: false,
      });
    },
    limpiarCampos() {
      this.$refs.form.reset();
      this.esEdit = false;
      this.fechaVenta = new Date().toISOString().slice(0, 19).replace("T", " ");
    },
    getVenta() {
      if (this.ventaEditar) {
        getVenta(this.ventaEditar)
          .then((response) => {
            this.empleado = response.data[0].empleado;
            this.cliente = response.data[0].cliente;
            this.totalImpuestos = response.data[0].totalImpuestos;
            this.totalDescuentos = response.data[0].totalDescuentos;
            this.fechaVenta = response.data[0].fechaVenta
              .slice(0, 19)
              .replace("T", " ");

            this.esEdit = true;
          })
          .catch((err) => console.log(err.message));
      }
    },
    getEmpleado(numeroDocumento) {
      getEmpleado(numeroDocumento)
        .then((response) => (this.empleado = response.data[0]))
        .catch((err) => console.error(err.message));
    },
    getCliente(numeroDocumento) {
      getCliente(numeroDocumento)
        .then((response) => (this.cliente = response.data[0]))
        .catch((err) => console.error(err.message));
    },
    getProductosComprados() {
        if(this.ventaEditar) {
            getProductosComprados(this.ventaEditar)
                .then(res => this.productosComprados = res.data)
                .catch(err => console.log(err.message));
        }
    }
  },
  mounted() {
    getEmpleados()
      .then((response) => (this.empleadosLista = response.data))
      .catch((err) => console.error(err));

    getClientes()
      .then((response) => (this.clientesLista = response.data))
      .catch((err) => console.error(err));

    getProductos()
      .then((response) => (this.productos = response.data))
      .catch((err) => console.error(err.message));

    this.getVenta();
  },
};
</script>

<style scoped>
</style>