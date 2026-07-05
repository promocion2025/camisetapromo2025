import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { PedidoFormComponent } from '../../components/pedido-form/pedido-form.component';
import { PedidosTableComponent } from '../../components/pedidos-table/pedidos-table.component';
import { SizeGuideComponent } from '../../shared/size-guide/size-guide.component';
import { PedidosService } from '../../services/pedidos.service';

@Component({
  selector: 'app-registro-page',
  standalone: true,
  imports: [CommonModule, PedidoFormComponent, PedidosTableComponent, SizeGuideComponent],
  templateUrl: './registro.page.html',
  styleUrl: './registro.page.css'
})
export class RegistroPageComponent {
  private readonly pedidosService = inject(PedidosService);

  readonly pedidos$ = this.pedidosService.obtenerPedidos();
}
