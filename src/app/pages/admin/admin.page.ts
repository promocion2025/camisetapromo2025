import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AgendaFormComponent } from '../../components/agenda-form/agenda-form.component';
import { AgendaListComponent } from '../../components/agenda-list/agenda-list.component';
import { RecuerdoGalleryComponent } from '../../components/recuerdo-gallery/recuerdo-gallery.component';
import { PartidoFormComponent } from '../../components/partido-form/partido-form.component';
import { PartidoListComponent } from '../../components/partido-list/partido-list.component';
import { PedidoDashboardComponent } from '../../components/pedido-dashboard/pedido-dashboard.component';
import { AgendaItem } from '../../models/agenda.model';
import { PedidosTableComponent } from '../../components/pedidos-table/pedidos-table.component';
import { Partido } from '../../models/partido.model';
import { Pedido } from '../../models/pedido.model';
import { Recuerdo } from '../../models/recuerdo.model';
import { AdminAuthService } from '../../services/admin-auth.service';
import { AgendaService } from '../../services/agenda.service';
import { CsvExportService } from '../../services/csv-export.service';
import { PartidosService } from '../../services/partidos.service';
import { PedidosService } from '../../services/pedidos.service';
import { RecuerdosService } from '../../services/recuerdos.service';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PedidosTableComponent,
    PedidoDashboardComponent,
    RecuerdoGalleryComponent,
    PartidoFormComponent,
    PartidoListComponent,
    AgendaFormComponent,
    AgendaListComponent
  ],
  templateUrl: './admin.page.html',
  styleUrl: './admin.page.css'
})
export class AdminPageComponent {
  private readonly adminAuth = inject(AdminAuthService);
  private readonly agendaService = inject(AgendaService);
  private readonly pedidosService = inject(PedidosService);
  private readonly recuerdosService = inject(RecuerdosService);
  private readonly partidosService = inject(PartidosService);
  private readonly csvExport = inject(CsvExportService);
  private readonly cdr = inject(ChangeDetectorRef);

  readonly user$ = this.adminAuth.user$;
  readonly isAdmin$ = this.adminAuth.isAdmin$;
  readonly agenda$ = this.agendaService.obtenerAgenda();
  readonly pedidos$ = this.pedidosService.obtenerPedidos();
  readonly recuerdos$ = this.recuerdosService.obtenerTodos();
  readonly partidos$ = this.partidosService.obtenerPartidos();

  loginError = '';
  actionMessage = '';
  email = '';
  password = '';

  async login(): Promise<void> {
    this.loginError = '';

    try {
      await this.adminAuth.loginWithGoogle();
    } catch (error: any) {
      this.loginError = error?.message || 'No se pudo iniciar sesión con Google.';
    } finally {
      this.cdr.detectChanges();
    }
  }

  async loginEmail(): Promise<void> {
    this.loginError = '';

    try {
      await this.adminAuth.loginWithEmail(this.email, this.password);
      this.password = '';
    } catch (error: any) {
      this.loginError = error?.message || 'No se pudo iniciar sesión con correo y contraseña.';
    } finally {
      this.cdr.detectChanges();
    }
  }

  logout(): Promise<void> {
    return this.adminAuth.logout();
  }

  exportar(pedidos: Pedido[]): void {
    this.csvExport.exportarPedidos(pedidos);
  }

  async eliminarPedido(pedido: Pedido): Promise<void> {
    if (!pedido.id || !confirm(`Eliminar el pedido de ${pedido.nombre}?`)) {
      return;
    }

    await this.pedidosService.eliminarPedido(pedido.id);
    this.mostrarAccion('Pedido eliminado.');
  }

  async aprobarRecuerdo(recuerdo: Recuerdo): Promise<void> {
    if (!recuerdo.id) {
      return;
    }

    await this.recuerdosService.aprobarRecuerdo(recuerdo.id);
    this.mostrarAccion('Recuerdo aprobado.');
  }

  async pausarRecuerdo(recuerdo: Recuerdo): Promise<void> {
    if (!recuerdo.id) {
      return;
    }

    await this.recuerdosService.marcarPendiente(recuerdo.id);
    this.mostrarAccion('Recuerdo pausado.');
  }

  async eliminarRecuerdo(recuerdo: Recuerdo): Promise<void> {
    if (!confirm(`Eliminar el recuerdo de ${recuerdo.nombre}?`)) {
      return;
    }

    await this.recuerdosService.eliminarRecuerdo(recuerdo);
    this.mostrarAccion('Recuerdo eliminado.');
  }

  async destacarRecuerdo(recuerdo: Recuerdo): Promise<void> {
    if (!recuerdo.id) {
      return;
    }

    await this.recuerdosService.destacarRecuerdo(recuerdo.id);
    this.mostrarAccion('Recuerdo destacado.');
  }

  async eliminarAgenda(item: AgendaItem): Promise<void> {
    if (!item.id || !confirm(`Eliminar ${item.titulo}?`)) {
      return;
    }

    await this.agendaService.eliminarItem(item.id);
    this.mostrarAccion('Actividad eliminada.');
  }

  async finalizarPartido(partido: Partido): Promise<void> {
    if (!partido.id) {
      return;
    }

    await this.partidosService.actualizarPartido(partido.id, { estado: 'finalizado' });
    this.mostrarAccion('Partido marcado como finalizado.');
  }

  async eliminarPartido(partido: Partido): Promise<void> {
    if (!partido.id || !confirm(`Eliminar ${partido.equipoA} vs ${partido.equipoB}?`)) {
      return;
    }

    await this.partidosService.eliminarPartido(partido.id);
    this.mostrarAccion('Partido eliminado.');
  }

  private mostrarAccion(message: string): void {
    this.actionMessage = message;
    this.cdr.detectChanges();
  }
}
