# First Angular Frontend

Aplicação frontend desenvolvida em **Angular 19** com **PrimeNG 17**, servindo como projeto de aprendizado e referência de boas práticas com NgModule, lazy loading e autenticação via guard.

## Stack

| Tecnologia | Versão |
|---|---|
| Angular | ^19.0.0 |
| TypeScript | ~5.6.0 |
| PrimeNG | ^17.18.0 |
| PrimeFlex | ^3.3.1 |
| PrimeIcons | ^7.0.0 |
| RxJS | ~7.8.0 |
| zone.js | ~0.15.0 |

## Módulos e Rotas

| Rota | Módulo | Guard |
|---|---|---|
| `/` | redireciona para `/home` | — |
| `/login` | `LoginModule` | — |
| `/cadastro` | `CadastroModule` | — |
| `/home` | `HomeModule` | — |
| `/cliente` | `ClienteModule` | `authGuard` |
| `/tarefa` | `TarefaModule` | `authGuard` |

Todos os módulos de feature são carregados via **lazy loading**.

## Estrutura do Projeto

```
src/
├── app/
│   ├── app.module.ts               # Root NgModule
│   ├── app-routing.module.ts       # Rotas principais
│   ├── cadastro/                   # Módulo de cadastro de usuário
│   ├── cliente/                    # Módulo de clientes (CRUD)
│   │   ├── cliente.service.ts
│   │   ├── cliente/                # Formulário
│   │   └── cliente-lista/          # Listagem
│   ├── core/
│   │   ├── core/core.module.ts     # Provê HttpClient
│   │   └── menu/                   # Componente de menu
│   ├── guards/
│   │   ├── auth.guard.ts           # CanActivateFn
│   │   └── login/                  # Módulo e componente de login
│   ├── home/                       # Módulo home
│   └── tarefa/                     # Módulo de tarefas (CRUD)
│       ├── tarefa.service.ts
│       ├── tarefa/                 # Formulário
│       └── tarefa-lista/           # Listagem
├── environments/
│   ├── environment.ts              # dev  → urlApi: http://localhost:8080/api
│   └── environment.prod.ts         # prod → urlApi: <url de produção>
└── styles.css
```

## Pré-requisitos

- Node.js >= 18
- Angular CLI >= 19 (`npm install -g @angular/cli`)
- Backend rodando em `http://localhost:8080/api` (desenvolvimento)

## Instalação

```bash
npm install
```

## Desenvolvimento

```bash
npm start
# ou
ng serve
```

Acesse `http://localhost:4200/`. A aplicação recarrega automaticamente ao salvar arquivos.

## Build

```bash
# Produção
npm run build

# Watch (desenvolvimento)
npm run watch
```

Os artefatos são gerados em `dist/`.

## Testes

```bash
# Unitários (Karma + Jasmine)
npm test
```

## Configuração de Ambiente

O arquivo `src/environments/environment.ts` define a URL da API:

```ts
export const environment = {
  production: false,
  urlApi: 'http://localhost:8080/api',
};
```

Para produção, o Angular substitui automaticamente pelo `environment.prod.ts` durante o build.

## Geração de Código

```bash
ng generate component nome-do-componente
ng generate service nome-do-servico
ng generate module nome-do-modulo --routing
```
