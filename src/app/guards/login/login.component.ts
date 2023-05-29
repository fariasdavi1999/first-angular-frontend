import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cpf } from 'cpf-cnpj-validator';
import { LoginService } from './login.service';

import * as uuid from 'uuid';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  cpf!: '';

  cpfValidado!: boolean;

  constructor(private router: Router, private loginService: LoginService) {}

  ngOnInit(): void {}

  async login(cpf: any) {
    this.loginService.getByCpf(cpf).subscribe(
      (res) => {
        res.id = uuid.v4();

        console.log(res.id);
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
