# TaskLy — Gerenciador de Tarefas

Aplicação web para cadastro e gerenciamento de tarefas, desenvolvida com **Angular** no front-end, **ASP.NET Core Web API** no back-end e **SQL Server** como banco de dados.

---

## Tecnologias utilizadas

| Camada | Tecnologia |
|--------|-----------|
| Front-end | Angular 19 (standalone components) |
| Back-end | ASP.NET Core Web API (.NET 10) |
| Banco de dados | SQL Server Express |
| ORM | Entity Framework Core 10 |
| Comunicação | API REST (JSON) |

---

## Funcionalidades

- ✅ Listar todas as tarefas
- ✅ Criar nova tarefa
- ✅ Editar tarefa existente
- ✅ Excluir tarefa com confirmação
- ✅ Status: Pendente / Em andamento / Concluída
- ✅ Mensagens de sucesso e erro
- ✅ Validação de formulário
- ✅ Tratamento de erros HTTP

---

## Estrutura do projeto

```
Taskly/
├── TaskLy.Api/          # Back-end ASP.NET Core
│   ├── Controllers/
│   ├── Models/
│   ├── Data/
│   └── appsettings.json
└── TaskLy.Web/          # Front-end Angular
    └── src/
        └── app/
            ├── components/
            │   ├── tarefa-lista/
            │   └── tarefa-formulario/
            ├── models/
            ├── services/
            └── routes.ts
```

---

## Pré-requisitos

- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- [Node.js 20+](https://nodejs.org/)
- [Angular CLI](https://angular.io/cli): `npm install -g @angular/cli`
- [SQL Server Express](https://www.microsoft.com/sql-server/sql-server-downloads)
- [dotnet-ef](https://www.nuget.org/packages/dotnet-ef): `dotnet tool install --global dotnet-ef --version 10.0.7`

---

## Como executar

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/taskly.git
cd taskly
```

### 2. Configurar o banco de dados

Edite o arquivo `TaskLy.Api/appsettings.json` e ajuste a connection string:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=.\\SQLEXPRESS;Database=TaskLyDB;Trusted_Connection=True;TrustServerCertificate=True;"
  }
}
```

### 3. Executar o back-end

```bash
cd TaskLy.Api
dotnet restore
dotnet ef migrations add InitialCreate   # somente na primeira vez
dotnet ef database update                # cria as tabelas no SQL Server
dotnet run
```

A API estará disponível em: `http://localhost:5062`  
Swagger UI: `http://localhost:5062/swagger`

### 4. Executar o front-end

```bash
cd TaskLy.Web
npm install
ng serve
```

A aplicação estará disponível em: `http://localhost:4200`

> O proxy está configurado em `proxy.conf.json` para redirecionar `/api` para o back-end automaticamente.

---

## Endpoints da API

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/tarefas` | Listar todas as tarefas |
| GET | `/api/tarefas/{id}` | Buscar tarefa por ID |
| POST | `/api/tarefas` | Criar nova tarefa |
| PUT | `/api/tarefas/{id}` | Atualizar tarefa |
| DELETE | `/api/tarefas/{id}` | Excluir tarefa |

### Exemplo de payload (POST/PUT)

```json
{
  "titulo": "Estudar Angular",
  "descricao": "Revisar componentes standalone",
  "status": "Pendente"
}
```

---

## Diferenciais implementados

- Código organizado em serviços, modelos e componentes separados
- Validação de campos obrigatórios no formulário
- Tratamento de erros HTTP centralizado no serviço
- Mensagens de feedback ao usuário (sucesso/erro)
- Confirmação antes de excluir uma tarefa
- Retry automático (x2) nas requisições de listagem
- Gerenciamento de subscriptions com `takeUntil` / `takeUntilDestroyed`
- Layout responsivo com tema escuro

---

## Observações

- O projeto **não** implementa autenticação
- O projeto **não** utiliza arquiteturas avançadas (DDD, CQRS)
- O foco foi em clareza de código e funcionamento correto do CRUD# TaskLy — Gerenciador de Tarefas

Aplicação web para cadastro e gerenciamento de tarefas, desenvolvida com **Angular** no front-end, **ASP.NET Core Web API** no back-end e **SQL Server** como banco de dados.

---

