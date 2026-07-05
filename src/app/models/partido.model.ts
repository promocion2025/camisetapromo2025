export type EstadoPartido = 'programado' | 'en_juego' | 'finalizado';

export interface Partido {
  id?: string;
  deporte: string;
  categoria: string;
  equipoA: string;
  equipoB: string;
  fecha: string;
  hora: string;
  lugar: string;
  estado: EstadoPartido;
  marcadorA?: number | null;
  marcadorB?: number | null;
  detalle?: string;
  creadoEn?: string;
}

export interface PartidoRegistro {
  deporte: string;
  categoria: string;
  equipoA: string;
  equipoB: string;
  fecha: string;
  hora: string;
  lugar: string;
  estado: EstadoPartido;
  marcadorA?: number | null;
  marcadorB?: number | null;
  detalle?: string;
}
