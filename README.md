# Daily Diet API

Esta é uma API desenvolvida como parte de um desafio da trilha de Node.js, com o objetivo de gerenciar refeições diárias e acompanhar métricas de dieta.

## Funcionalidades

- **Criação de Usuário:** Criação de novos usuários com identificação via `sessionId` nos cookies.
- **Registro de Refeição:** Cadastro de uma nova refeição contendo nome, descrição, data/hora, e indicação se a refeição está dentro ou fora da dieta.
- **Edição de Refeição:** Atualização de todos os dados de uma refeição já cadastrada.
- **Remoção de Refeição:** Exclusão de uma refeição.
- **Listagem de Refeições:** Listagem de todas as refeições de um usuário específico.
- **Visualização de Refeição Única:** Detalhamento de uma refeição.
- **Métricas do Usuário:**
  - Quantidade total de refeições registradas.
  - Quantidade total de refeições dentro da dieta.
  - Quantidade total de refeições fora da dieta.
  - Melhor sequência de refeições dentro da dieta.
- **Isolamento de Dados:** Usuários só podem acessar e modificar as próprias refeições identificadas pelo cookie de sessão.

## Tecnologias e Ferramentas

- [Node.js](https://nodejs.org/)
- [Fastify](https://fastify.dev/) - Framework web rápido e de baixa sobrecarga
- [Knex.js](https://knexjs.org/) - Query builder para interagir com o banco de dados
- [SQLite](https://www.sqlite.org/index.html) - Banco de dados embutido
- [Zod](https://zod.dev/) - Validação e declaração de esquemas TypeScript
- [TypeScript](https://www.typescriptlang.org/) - Superset tipado do JavaScript

## Instalação e Execução

### Pré-requisitos
- Node.js (v18 ou superior)
- NPM ou Yarn

### Passos

1. Clone este repositório:
   ```bash
   git clone https://github.com/BrunoBDevOceanoAzul/dailydiet-rocketseat-desafio-2.git
   ```

2. Acesse a pasta do projeto:
   ```bash
   cd dailydiet-rocketseat-desafio-2
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` na raiz do projeto copiando o conteúdo de `.env.example`.
   - Configure o caminho do banco de dados (ex: `./db/app.db`).

5. Execute as migrations para criar o banco de dados e as tabelas:
   ```bash
   npm run knex -- migrate:latest
   ```

6. Execute a aplicação em modo de desenvolvimento:
   ```bash
   npm run dev
   ```

A API estará rodando na porta especificada na variável de ambiente (por padrão `3333`).

## Estrutura do Banco de Dados

### Tabela `users`
- `id` (UUID, Primary Key)
- `session_id` (String, Unique)
- `name` (String)
- `email` (String, Unique)
- `created_at` (Timestamp)

### Tabela `meals`
- `id` (UUID, Primary Key)
- `name` (String)
- `description` (String)
- `is_on_diet` (Boolean)
- `date` (Timestamp/Integer)
- `user_id` (UUID, Foreign Key referenciando `users(id)`)
- `created_at` (Timestamp)

## Variáveis de Ambiente Necessárias

Exemplo de arquivo `.env`:

```env
NODE_ENV=development
DATABASE_CLIENT=sqlite
DATABASE_URL="./db/app.db"
PORT=3333
```
