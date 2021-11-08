<template>
  <v-container fluid>
    <v-form class="w-50">
        <v-container>
            <v-row align="center" justify="end">
                <v-col>
                    <h1>Lista de empleados activos</h1>
                </v-col>
                <v-col md-col="4">
                    <Buscador :label="placeholderBuscador" v-on:buscar="buscar" />
                </v-col>
            </v-row>
            </v-container>
    </v-form>

    <Grid :items="items" :buttons="buttons" />

    <v-row>
        <v-col>
    <v-fab-transition>
        <v-btn
            fab
            fixed
            large
            color="blue"
            bottom
            right
            class="floated-btn"
            >
                <v-icon large color="white">mdi-account-plus</v-icon>
        </v-btn>
    </v-fab-transition>
    </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Grid from '../../components/GridContainer.vue';
import Buscador from '../../components/BuscadorForm.vue';

export default {
    components: {
        Grid,
        Buscador,
    },
    data() {
        return {
            items: [
                {
                    nombre: 'Empleado 1',
                    cedula: '12345'
                },
                {
                    nombre: 'Empleado 1',
                    cedula: '12345'
                },
                {
                    nombre: 'Empleado 1',
                    cedula: '12345'
                },
                {
                    nombre: 'Empleado 1',
                    cedula: '12345'
                }
            ],

            buttons: [
                {
                    accion: 'teléfonos',
                    icono: 'mdi-cellphone-sound',
                    color: 'black'
                },
                {
                    accion: 'editar',
                    icono: 'mdi-pencil',
                    color: 'black'
                },
                {
                    accion: 'eliminar',
                    icono: 'mdi-delete',
                    color: 'black'
                }
            ],

            placeholderBuscador: "Buscar empleado"
        }
    },

    methods: {
        buscar(texto) {
            console.log("Buscar empleado:",texto);
        }
    },
};
</script>

<style scope>
.floated-btn {
    margin-bottom: 50px;
}
</style>