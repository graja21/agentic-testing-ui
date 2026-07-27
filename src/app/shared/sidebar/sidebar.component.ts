import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import {
  RouterLink,
  RouterLinkActive
} from '@angular/router';

interface NavigationItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Input() open = false;

  @Output()
  closeSidebar = new EventEmitter<void>();

  readonly navigationItems: NavigationItem[] = [
    {
      label: 'Dashboard',
      icon: 'bi-grid-1x2',
      route: '/dashboard'
    },
    {
      label: 'Pipeline Runner',
      icon: 'bi-play-circle',
      route: '/pipeline'
    },
    {
      label: 'Reports',
      icon: 'bi-file-earmark-bar-graph',
      route: '/reports'
    }
  ];

  close(): void {
    this.closeSidebar.emit();
  }
}