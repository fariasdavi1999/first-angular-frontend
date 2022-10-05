import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor() { }

  items!: MenuItem[];

  ngOnInit() {

    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: '/home'
      },
      {
        label: 'Clientes',
        icon: 'pi pi-users',
        routerLink: '/cliente-listar'
      },
      {
        label: 'Sair',
        icon: 'pi pi-sign-out',
        routerLink: ''
      }


    ];
  }
}