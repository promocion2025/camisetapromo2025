import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { AgendaService } from '../../services/agenda.service';
import { PedidosService } from '../../services/pedidos.service';
import { PartidosService } from '../../services/partidos.service';
import { RecuerdosService } from '../../services/recuerdos.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.page.html',
  styleUrl: './home.page.css'
})
export class HomePageComponent {
  private readonly pedidosService = inject(PedidosService);
  private readonly agendaService = inject(AgendaService);
  private readonly recuerdosService = inject(RecuerdosService);
  private readonly partidosService = inject(PartidosService);

  readonly pedidos$ = this.pedidosService.obtenerPedidos();
  readonly agenda$ = this.agendaService.obtenerAgenda();
  readonly recuerdos$ = this.recuerdosService.obtenerAprobados();
  readonly partidos$ = this.partidosService.obtenerPartidos();
  readonly recuerdosPreview$ = this.recuerdos$.pipe(map(recuerdos => recuerdos.slice(0, 3)));
}
