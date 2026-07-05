export type GeneroPedido = 'hombre' | 'mujer';

export type CorteCamiseta = 'clasico' | 'entallado' | 'amplio';

export interface Pedido {
  id?: string;
  nombre: string;
  numero: number | null;
  talla: string;
  genero?: GeneroPedido;
  corte?: CorteCamiseta;
  telefono?: string;
  notas?: string;
  fecha?: string;
}

export interface PedidoRegistro {
  nombre: string;
  numero: number | null;
  talla: string;
  genero: GeneroPedido;
  corte: CorteCamiseta;
  telefono?: string;
  notas?: string;
}
