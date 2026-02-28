Desafio:

Portal de Vendas CaixaDrive Concessionária

O sistema deve permitir que o cliente navegue pelo catálogo e gerencie suas intenções de compra em um painel personalizado.

Requisitos Funcionais 

Acesso ao Portal: Tela de login vinculada ao usuarios.json para identificar o perfil do cliente (VIP, Standard ou Admin).

Catálogo: Exibir o estoque de veículos elétricos usando Cards Visuais.

Cada card deve conter: Foto do modelo, Descrição, Preço e Botão "Reservar Veículo".

Gestão de Reservas (Meu Perfil): Espaço onde o cliente visualiza seus dados e a lista de carros que ele marcou interesse.

Os dados devem persistir no navegador (LocalStorage) para simular uma reserva real.

Segurança de Rota: Impedir que curiosos acessem o catálogo sem estarem devidamente logados no portal.


Estrutura principais

estoque.json	Lista de veículos (ID, Modelo, Preço, Imagem).

usuarios.json	Base de clientes autorizados.

auth.guard.ts	Proteção de entrada no catálogo.

consorcio.resolver.ts	Carregamento antecipado do catálogo.

app.routes.ts - gerenciar as rotas

perfil.component.ts	Painel de controle do comprador.

# CaixadriveConcessionaria

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.21.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
