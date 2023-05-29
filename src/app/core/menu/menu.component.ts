import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  usuarioLogado!: boolean;

  items!: MenuItem[];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.getItensMenuNaoLogado();
  }

  getItensMenuNaoLogado() {
    this.items = [
      {
        label: 'Início',
        routerLink: '/',
      },
      {
        label: 'Clientes',
        routerLink: '/cliente',
      },
      {
        label: 'Tarefas',
        routerLink: '/tarefa',
      },
      {
        label: 'Login',
        routerLink: '/login',
      },
      {
        label: 'Cadastro',
        routerLink: '/cadastro',
      },
    ];
  }

  getItensMenuLogado() {
    this.items = [
      {
        label: 'Início',
        routerLink: '/',
      },
      {
        label: 'Planos',
        routerLink: '/tipo-socio',
      },
      // {
      //   label: 'Sair',
      //   command() {
      //     localStorage.clear();
      //     window.location.href = '/login';
      //   },
      // },
    ];
  }

  logout() {
    this.usuarioLogado = false;
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
      localStorage.clear();
    });
  }
}
