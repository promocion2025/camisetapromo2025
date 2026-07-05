export type TipoAgenda = 'ceremonia' | 'misa' | 'almuerzo' | 'deporte' | 'baile' | 'general';

export interface AgendaItem {
  id?: string;
  titulo: string;
  tipo: TipoAgenda;
  fecha: string;
  horaInicio: string;
  horaFin?: string;
  lugar: string;
  descripcion?: string;
  orden?: number;
  creadoEn?: string;
}

export interface AgendaRegistro {
  titulo: string;
  tipo: TipoAgenda;
  fecha: string;
  horaInicio: string;
  horaFin?: string;
  lugar: string;
  descripcion?: string;
  orden?: number;
}
