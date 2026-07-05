import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { PartidoListComponent } from '../../components/partido-list/partido-list.component';
import { PartidosService } from '../../services/partidos.service';

@Component({
  selector: 'app-partidos-page',
  standalone: true,
  imports: [CommonModule, PartidoListComponent],
  templateUrl: './partidos.page.html',
  styleUrl: './partidos.page.css'
})
export class PartidosPageComponent {
  private readonly partidosService = inject(PartidosService);

  readonly partidos$ = this.partidosService.obtenerPartidos();
}
