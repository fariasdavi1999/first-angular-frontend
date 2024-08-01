import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cpf } from 'cpf-cnpj-validator';
import { LoginService } from './login.service';

import * as uuid from 'uuid';
import { Cliente } from 'src/app/cliente/cliente';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  cliente = new Cliente();

  cpf!: '';

  cpfValidado!: boolean;

  constructor(private router: Router, private loginService: LoginService) {}

  ngOnInit(): void {}

  async login(cpf: any) {
    // cpf = this.cpf.replace('.', '').replace('.', '').replace('-', '');

    this.loginService.getByCpf(cpf).subscribe(
      (res) => {
        this.cliente = res;

        let id: any = this.cliente.id;
        id = uuid.v4();
        this.loginService.idUsuario = id;

        console.log(id);
      },
      (erro) => {
        console.log(erro);
      }
    );
  }

  voltarParaInicio() {
    localStorage.clear();
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }

  validateCpf(event: Event) {
    const CPF = (event.target as HTMLInputElement).value;

    if (cpf.isValid(CPF)) {
      this.cpfValidado = true;
    } else {
      this.cpfValidado = false;
    }
  }
}
