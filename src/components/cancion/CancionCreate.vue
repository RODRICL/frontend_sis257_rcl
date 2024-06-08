<script setup lang="ts">
import { onMounted, ref } from 'vue'
import http from '@/plugins/axios'
import router from '@/router'
import type { Cancion } from '@/models/cancion'
import type { Genero } from '@/models/genero'
import type { Album } from '@/models/album'
import type { Interprete } from '@/models/interprete'

const props = defineProps<{
  ENDPOINT_API: string
}>()

const ENDPOINT = props.ENDPOINT_API ?? ''
const cancion = ref<Cancion>({} as Cancion)

const idGenero = ref<number>(0)
const idInterprete = ref<number>(0)
const idAlbum = ref<number>(0)

const generos = ref<Genero[]>([])
const interpretes = ref<Interprete[]>([])
const albumes = ref<Album[]>([])

async function crearCancion() {
  await http
    .post(ENDPOINT, {
      idGenero: idGenero.value,
      idAlbum: idAlbum.value,
      nombre: cancion.value.nombre,
      duracion: cancion.value.duracion,
      tags: cancion.value.tags,
      url: cancion.value.tags
    })
    .then(() => router.push('/canciones'))
}

async function obtenerInterpretes() {
  interpretes.value = await http.get('interpretes/genero/' + idGenero.value).then((res) => res.data)
}

async function obtenerAlbumes() {
  albumes.value = await http.get('albumes/interprete/' + idInterprete.value).then((res) => res.data)
}

onMounted(async () => {
  generos.value = await http.get('generos').then((res) => res.data)
})

function goBack() {
  router.go(-1)
}
</script>

<template>
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><RouterLink to="/">Inicio</RouterLink></li>
        <li class="breadcrumb-item">
          <RouterLink to="/interpretes">Canciones</RouterLink>
        </li>
        <li class="breadcrumb-item active" aria-current="page">Crear</li>
      </ol>
    </nav>

    <div class="row">
      <h2>Crear Nueva Canción</h2>
    </div>

    <div class="row">
      <form @submit.prevent="crearCancion">
        <div class="form-floating mb-2">
          <select class="form-select" v-model="idGenero" required @change="obtenerInterpretes">
            <option value="" :disabled="true">Seleccione un elemento</option>
            <option v-for="genero in generos" :key="genero.id" :value="genero.id">
              {{ genero.descripcion }}
            </option>
          </select>
          <label for="genero">Géneros</label>
        </div>
        <div class="form-floating mb-2">
          <select class="form-select" v-model="idInterprete" required @change="obtenerAlbumes">
            <option value="" :disabled="true">Seleccione un elemento</option>
            <option v-for="interprete in interpretes" :key="interprete.id" :value="interprete.id">
              {{ interprete.nombre }}
            </option>
          </select>
          <label for="interprete">Intérpretes</label>
        </div>
        <div class="form-floating mb-2">
          <select class="form-select" v-model="idAlbum" required>
            <option value="" :disabled="true">Seleccione un elemento</option>
            <option v-for="album in albumes" :key="album.id" :value="album.id">
              {{ album.nombre }}
            </option>
          </select>
          <label for="album">Álbum</label>
        </div>
        <div class="form-floating mb-2">
          <input
            type="text"
            class="form-control"
            v-model="cancion.nombre"
            placeholder="Nombre"
            required
          />
          <label for="nombre">Nombre</label>
        </div>
        <div class="form-floating mb-2">
          <input
            type="text"
            class="form-control"
            v-model="cancion.duracion"
            placeholder="Duración"
            required
          />
          <label for="duracion">Duración</label>
        </div>
        <div class="form-floating mb-2">
          <input
            type="text"
            class="form-control"
            v-model="cancion.tags"
            placeholder="Tags"
            required
          />
          <label for="tags">Tags</label>
        </div>
        <div class="form-floating mb-2">
          <input
            type="text"
            class="form-control"
            v-model="cancion.url"
            placeholder="URL"
            required
          />
          <label for="url">URL</label>
        </div>
        <div class="text-center mt-3">
          <button type="submit" class="btn btn-primary btn-lg">
            <font-awesome-icon icon="fa-solid fa-save" /> Crear
          </button>
        </div>
      </form>
    </div>
    <div class="text-left">
      <button class="btn btn-link" @click="goBack">Volver</button>
    </div>
  </div>
</template>

<style></style>
