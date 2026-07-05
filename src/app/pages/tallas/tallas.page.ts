import { Component } from '@angular/core';
import { SizeGuideComponent } from '../../shared/size-guide/size-guide.component';

@Component({
  selector: 'app-tallas-page',
  standalone: true,
  imports: [SizeGuideComponent],
  templateUrl: './tallas.page.html',
  styleUrl: './tallas.page.css'
})
export class TallasPageComponent {}
