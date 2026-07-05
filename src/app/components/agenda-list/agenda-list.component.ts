import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AgendaItem } from '../../models/agenda.model';

@Component({
  selector: 'app-agenda-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './agenda-list.component.html',
  styleUrl: './agenda-list.component.css'
})
export class AgendaListComponent {
  @Input() items: AgendaItem[] | null = [];
  @Input() admin = false;
  @Output() eliminar = new EventEmitter<AgendaItem>();

  get agenda(): AgendaItem[] {
    return this.items || [];
  }

  formatFecha(item: AgendaItem): string {
    if (!item.fecha) {
      return 'Fecha por confirmar';
    }

    const [year, month, day] = item.fecha.split('-').map(Number);
    return new Date(year, month - 1, day).toLocaleDateString('es-PE', {
      weekday: 'long',
      day: '2-digit',
      month: 'long'
    });
  }

  icono(tipo: string): string {
    const iconos: Record<string, string> = {
      ceremonia: 'fa-award',
      misa: 'fa-church',
      almuerzo: 'fa-utensils',
      deporte: 'fa-futbol',
      baile: 'fa-music',
      general: 'fa-calendar-day'
    };
    return iconos[tipo] || iconos['general'];
  }
}
