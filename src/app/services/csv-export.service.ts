import { Injectable } from '@angular/core';
import { Pedido } from '../models/pedido.model';

@Injectable({
  providedIn: 'root'
})
export class CsvExportService {
  exportarPedidos(pedidos: Pedido[]): void {
    const headers = ['Nombre', 'Género', 'Corte', 'Talla', 'Número camiseta', 'Teléfono', 'Notas', 'Fecha'];
    const rows = pedidos.map(pedido => [
      pedido.nombre,
      pedido.genero || '',
      pedido.corte || '',
      pedido.talla,
      pedido.numero ?? '',
      pedido.telefono || '',
      pedido.notas || '',
      pedido.fecha ? new Date(pedido.fecha).toLocaleString('es-PE') : ''
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    ].join('\n');

    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `pedidos-promocion-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }
}
