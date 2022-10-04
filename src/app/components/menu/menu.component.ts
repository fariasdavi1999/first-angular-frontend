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
        label: 'Navigate',
        items: [{
          label: 'Angular',
          icon: 'pi pi-external-link',
          url: ''
        },
        {
          label: 'Router',
          icon: 'pi pi-upload',
          routerLink: ''
        }
        ]
      }
    ];
  }
}