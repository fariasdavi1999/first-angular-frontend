import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { Cliente } from 'src/app/cliente/cliente';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false,
})
export class LoginComponent implements OnInit {
  cliente = new Cliente();

  cpf!: '';

  cpfValidado!: boolean;

  constructor(
    private readonly router: Router,
    private readonly loginService: LoginService,
  ) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  async login(cpf: any) {

    this.loginService.getByCpf(cpf).subscribe(
      (res) => {
        this.cliente = res;

        let id: any = this.cliente.id;
        id = crypto.randomUUID();
        this.loginService.idUsuario = id;

        console.log(id);
      },
      (erro) => {
        console.log(erro);
      },
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
    this.cpfValidado = this.isValidCpf(CPF);
  }

  private isValidCpf(cpf: string): boolean {
    cpf = cpf.replace(/[^\d]/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let sum = 0;
    for (let i = 0; i < 9; i++) sum += parseInt(cpf[i]) * (10 - i);
    let rest = (sum * 10) % 11;
    if (rest === 10 || rest === 11) rest = 0;
    if (rest !== parseInt(cpf[9])) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) sum += parseInt(cpf[i]) * (11 - i);
    rest = (sum * 10) % 11;
    if (rest === 10 || rest === 11) rest = 0;
    return rest === parseInt(cpf[10]);
  }
}
