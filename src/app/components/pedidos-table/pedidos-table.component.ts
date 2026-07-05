import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pedido } from '../../models/pedido.model';

@Component({
  selector: 'app-pedidos-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pedidos-table.component.html',
  styleUrl: './pedidos-table.component.css'
})
export class PedidosTableComponent {
  @Input() pedidos: Pedido[] | null = [];
  @Input() admin = false;
  @Output() eliminar = new EventEmitter<Pedido>();

  get pedidosOrdenados(): Pedido[] {
    return [...(this.pedidos || [])].sort((a, b) => (a.numero ?? 0) - (b.numero ?? 0));
  }
}
