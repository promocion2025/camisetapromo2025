import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Partido } from '../../models/partido.model';

@Component({
  selector: 'app-partido-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './partido-list.component.html',
  styleUrl: './partido-list.component.css'
})
export class PartidoListComponent {
  @Input() partidos: Partido[] | null = [];
  @Input() admin = false;
  @Output() finalizar = new EventEmitter<Partido>();
  @Output() eliminar = new EventEmitter<Partido>();

  get items(): Partido[] {
    return this.partidos || [];
  }

  formatFecha(partido: Partido): string {
    if (!partido.fecha) {
      return 'Fecha por confirmar';
    }

    const [year, month, day] = partido.fecha.split('-').map(Number);
    return new Date(year, month - 1, day).toLocaleDateString('es-PE', {
      weekday: 'short',
      day: '2-digit',
      month: 'short'
    });
  }
}
