import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AgendaRegistro, TipoAgenda } from '../../models/agenda.model';
import { AgendaService } from '../../services/agenda.service';

@Component({
  selector: 'app-agenda-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './agenda-form.component.html',
  styleUrl: './agenda-form.component.css'
})
export class AgendaFormComponent {
  @Output() itemCreado = new EventEmitter<void>();

  private readonly agendaService = inject(AgendaService);
  private readonly cdr = inject(ChangeDetectorRef);

  readonly tipos: TipoAgenda[] = ['misa', 'ceremonia', 'almuerzo', 'deporte', 'baile', 'general'];
  form: AgendaRegistro = this.crearFormulario();
  isLoading = false;
  message = '';
  error = '';

  async guardar(): Promise<void> {
    this.message = '';
    this.error = '';

    if (!this.form.titulo.trim() || !this.form.fecha || !this.form.horaInicio || !this.form.lugar.trim()) {
      this.error = 'Completa título, fecha, hora y lugar.';
      return;
    }

    this.isLoading = true;

    try {
      await this.agendaService.crearItem(this.form);
      this.form = this.crearFormulario();
      this.message = 'Actividad agregada a la agenda.';
      this.itemCreado.emit();
    } catch (error: any) {
      this.error = error?.message || 'No se pudo guardar la actividad.';
    } finally {
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  }

  private crearFormulario(): AgendaRegistro {
    return {
      titulo: '',
      tipo: 'ceremonia',
      fecha: '',
      horaInicio: '',
      horaFin: '',
      lugar: 'IEE José María Arguedas',
      descripcion: '',
      orden: 1
    };
  }
}
