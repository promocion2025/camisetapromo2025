import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-site-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './site-header.component.html',
  styleUrl: './site-header.component.css'
})
export class SiteHeaderComponent {
  menuOpen = false;

  closeMenu(): void {
    this.menuOpen = false;
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }
}
