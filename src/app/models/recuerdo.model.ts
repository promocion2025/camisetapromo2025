export type EstadoRecuerdo = 'pendiente' | 'aprobado' | 'destacado';

export interface Recuerdo {
  id?: string;
  nombre: string;
  promocion?: string;
  mensaje: string;
  imagenUrl?: string;
  imagenPath?: string;
  estado: EstadoRecuerdo;
  fecha: string;
}

export interface RecuerdoRegistro {
  nombre: string;
  promocion?: string;
  mensaje: string;
}
