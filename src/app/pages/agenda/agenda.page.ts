import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AgendaListComponent } from '../../components/agenda-list/agenda-list.component';
import { AgendaService } from '../../services/agenda.service';

@Component({
  selector: 'app-agenda-page',
  standalone: true,
  imports: [CommonModule, AgendaListComponent],
  templateUrl: './agenda.page.html',
  styleUrl: './agenda.page.css'
})
export class AgendaPageComponent {
  private readonly agendaService = inject(AgendaService);

  readonly agenda$ = this.agendaService.obtenerAgenda();
}
