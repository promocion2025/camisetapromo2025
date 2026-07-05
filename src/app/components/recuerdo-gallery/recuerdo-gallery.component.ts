import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recuerdo } from '../../models/recuerdo.model';

@Component({
  selector: 'app-recuerdo-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recuerdo-gallery.component.html',
  styleUrl: './recuerdo-gallery.component.css'
})
export class RecuerdoGalleryComponent {
  @Input() recuerdos: Recuerdo[] | null = [];
  @Input() admin = false;
  @Output() aprobar = new EventEmitter<Recuerdo>();
  @Output() destacar = new EventEmitter<Recuerdo>();
  @Output() pendiente = new EventEmitter<Recuerdo>();
  @Output() eliminar = new EventEmitter<Recuerdo>();
}
