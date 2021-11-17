<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="cedula"
      :counter="10"
      :rules="cedulaRules"
      label="Cédula"
      required
      clearable
    ></v-text-field>

    <v-text-field
      v-model="nombre"
      :counter="200"
      :rules="nombreRules"
      label="Nombre"
      required
      clearable
    ></v-text-field>

    <v-row justify="end" class="mt-4">
      <v-btn color="primary" class="mr-4"> {{ btnPrimario }} </v-btn>
      <v-btn color="secondary"> {{ btnSecundario }} </v-btn>
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
            cedula: "",
            nombre: "",
            valid: true,
            empleado: null,
            cedulaRules: [
                v => !!v || "La cédula es requerida",
                v => (v && v.length <= 10) || "Puede contener máximo 10 caracteres"
            ],
            nombreRules: [
                v => !!v || "El nombre es requerido",
                v => (v && v.length <= 200) || "Puede contener máximo 200 caracteres"
            ],
            btnPrimario: "Registrar",
            btnSecundario: "Limpiar",
        }
    },
    created() {
        if(this.esEdit) {
            this.empleado = JSON.parse(localStorage.getItem("empleadoEdit"));

            if(this.empleado) {
                this.cedula = this.empleado.cedula;
                this.nombre = this.empleado.nombre;
                this.btnPrimario = "Editar"
            }
        }
    },
};
</script>

<style>
</style>