<script setup lang="ts">
import type { Cancion } from '@/models/cancion'
import { onMounted, ref } from 'vue'
import http from '@/plugins/axios'
import router from '@/router'

const props = defineProps<{
  ENDPOINT_API: string
}>()

const ENDPOINT = props.ENDPOINT_API ?? ''
var canciones = ref<Cancion[]>([])

async function getCanciones() {
  canciones.value = await http.get(ENDPOINT).then((response) => response.data)
}

function toEdit(id: number) {
  router.push(`/canciones/editar/${id}`)
}

async function toDelete(id: number) {
  var r = confirm('¿Está seguro que se desea eliminar la Canción?')
  if (r == true) {
    await http.delete(`${ENDPOINT}/${id}`).then(() => getCanciones())
  }
}

onMounted(() => {
  getCanciones()
})
</script>

<template>
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><RouterLink to="/">Inicio</RouterLink></li>
        <li class="breadcrumb-item active" aria-current="page">Canciones</li>
      </ol>
    </nav>

    <div class="row">
      <h2>Lista de Canciones</h2>
      <div class="col-12">
        <RouterLink to="/canciones/crear"
          ><font-awesome-icon icon="fa-solid fa-plus" /> Crear Nuevo</RouterLink
        >
      </div>
    </div>

    <div class="table-responsive">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">N°</th>
            <th scope="col">Género</th>
            <th scope="col">Intérprete</th>
            <th scope="col">Álbum</th>
            <th scope="col">Nombre</th>
            <th scope="col">Duración</th>
            <th scope="col">Tags</th>
            <th scope="col">URL</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(cancion, index) in canciones.values()" :key="cancion.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ cancion.genero.descripcion }}</td>
            <td>{{ cancion.album.interprete.nombre }}</td>
            <td>{{ cancion.album.nombre }}</td>
            <td>{{ cancion.nombre }}</td>
            <td>{{ cancion.duracion }}</td>
            <td>{{ cancion.tags }}</td>
            <td><a :href="cancion.url" target="_blank">Ver</a></td>
            <td>
              <button class="btn btn-link" @click="toEdit(cancion.id)">
                <font-awesome-icon icon="fa-solid fa-edit" />
              </button>
              <button class="btn btn-link" @click="toDelete(cancion.id)">
                <font-awesome-icon icon="fa-solid fa-trash" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped></style>
