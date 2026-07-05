import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { GUIA_TALLAS, GrupoTallas } from '../../constants/tallas';
import { GeneroPedido } from '../../models/pedido.model';

@Component({
  selector: 'app-size-guide',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './size-guide.component.html',
  styleUrl: './size-guide.component.css'
})
export class SizeGuideComponent {
  @Input() genero: GeneroPedido | 'todos' = 'todos';
  @Input() compact = false;

  get grupos(): GrupoTallas[] {
    if (this.genero === 'todos') {
      return GUIA_TALLAS;
    }

    return GUIA_TALLAS.filter(grupo => grupo.genero === this.genero);
  }
}
