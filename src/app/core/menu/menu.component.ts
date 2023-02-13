import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  constructor(private router: Router) {}

  items!: MenuItem[];

  ngOnInit() {
    this.items = [
      {
        label: 'Início',
        icon: 'pi pi-home',
        routerLink: '/home',
      },
      {
        label: 'Agenda',
        icon: 'pi pi-calendar',
        items: [
          {
            label: 'Clientes',
            icon: 'pi pi-users',
            routerLink: '/cliente',
          },
          {
            label: 'Tarefas',
            icon: 'pi pi-check-square',
            routerLink: '/tarefa',
          },
        ],
      },

      {
        label: 'Dashboard',
        routerLink: '/dashboard',
      },
      {
        label: 'Relatórios',
        routerLink: '/relatorios',
        icon: 'pi pi-chart-bar',
      },

      // {
      //   label: 'Sair',
      //   icon: 'pi pi-sign-out',
      // },
    ];
  }
}
