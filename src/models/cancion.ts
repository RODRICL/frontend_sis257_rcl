import type { Album } from './album'
import type { Genero } from './genero'

export interface Cancion {
  id: number
  nombre: string
  duracion: string
  tags: string
  url: string
  album: Album
  genero: Genero
}
