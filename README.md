# Gabarito do Processo Trainee 2022.2 - Back-end
Esse é o gabarito do projeto da trilha do back-end do Processo Trainee. Nesse repositório encontra-se a maneira esperada de implementar a tarefa segundo os seguintes requisitos:

## Entidades:
      USUARIO:
         ID: INTEGER, PK
         Nome: STRING
         Email: STRING
         Senha: STRING
         Role: ENUM (Administrador, Ouvinte)
      MUSICA:
         ID: INTEGER, PK
         Foto: STRING
         Titulo: STRING
         Artista: INTEGER, FK
         Categoria: STRING
      ARTISTA:
         ID: INTEGER, PK
         Nome: STRING
         Nacionalidade: STRING

## Relacionamentos
   - UM usuário escuta VÁRIAS músicas, UMA música é escutada por VÁRIOS usuários (M:N)
   - UM artista canta VÁRIAS músicas, UMA música é cantada por UM artista (1:N)

# Rotas
## Users
### Login
Rota para fazer login no sistema, ou seja, obter o token JWT necessário para autenticação. Ele é automaticamente adicionado aos cookies do navegador.

- **URL:** /users/login
- **Método:** `POST`
- **URL params:** Não
- **Data params:**
   - `email=[string]`
   - `senha=[string]`
- **Autenticação:** Não
- **Resposta de sucesso:**
   - **Status**: 204
   - **Conteúdo**: Vazio

### Logout
Rota para fazer logout no sistema, ou seja, remover o token JWT necessário para autenticação.

- **URL:** /users/logout
- **Método:** `POST`
- **URL params:** Não
- **Data params:** Não
- **Autenticação:** Sim
- **Resposta de sucesso:**
   - **Status**: 204
   - **Conteúdo**: Vazio

### Create
Rota para criar usuário no banco de dados.

- **URL:** /users
- **Método:** `POST`
- **URL params:** Não
- **Data params:**
   - `name=[string]`
   - `email=[string]`
   - `password=[string]`
   - `role=[string]`
- **Autenticação:** Sim
- **Resposta de sucesso:**
   - **Status**: 201
   - **Conteúdo**: Vazio

### Get All
Rota para retornar todos os usuários no banco de dados.

- **URL:** /users
- **Método:** `GET`
- **URL params:** Não
- **Data params:** Não
- **Autenticação:** Sim
- **Resposta de sucesso:**
   - **Status**: 200
   - **Conteúdo**: `[{ id, name, email, role }]`

### Get Usuário Atual
Rota para retornar usuário logado.

- **URL:** /users/user
- **Método:** `GET`
- **URL params:** Não
- **Data params:** Não
- **Autenticação:** Sim
- **Resposta de sucesso:**
   - **Status**: 200
   - **Conteúdo**: `{ id, name, email, role }`

### Get Por ID
Rota para retornar o usuário com ID passado por parâmetro.

- **URL:** /users/:id
- **Método:** `GET`
- **URL params:** 
   - `id=[integer]`
- **Data params:** Não
- **Autenticação:** Sim
- **Resposta de sucesso:**
   - **Status**: 200
   - **Conteúdo**: `{ id, name, email, role }`

### Update Por ID
Rota para editar usuário com ID passado por parâmetro.

- **URL:** /users/:id
- **Método:** `PUT`
- **URL params:**
   - `id=[integer]`
- **Data params:**
   - `name=[string] (opcional)`
   - `email=[string] (opcional)`
   - `password=[string] (opcional)`
   - `role=[string] (opcional)`
- **Autenticação:** Sim
- **Resposta de sucesso:**
   - **Status**: 204
   - **Conteúdo**: Vazio

### Deletar Por ID
Rota para deletar usuário com ID passado por parâmetro.

- **URL:** /users/:id
- **Método:** `DELETE`
- **URL params:**
   - `id=[integer]`
- **Data params:** Não
- **Autenticação:** Sim
- **Resposta de sucesso:**
   - **Status**: 204
   - **Conteúdo**: Vazio

## Songs
### Create
Rota para criar música no banco de dados.

- **URL:** /songs
- **Método:** `POST`
- **URL params:** Não
- **Data params:**
   - `title=[string]`
   - `cover_image=[string]`
   - `artist=[integer]`
   - `genre=[string]`
- **Autenticação:** Sim
- **Resposta de sucesso:**
   - **Status**: 201
   - **Conteúdo**: Vazio

### Get All
Rota para retornar todas as músicas no banco de dados.

- **URL:** /songs
- **Método:** `GET`
- **URL params:** Não
- **Data params:** Não
- **Autenticação:** Sim
- **Resposta de sucesso:**
   - **Status**: 200
   - **Conteúdo**: `[{ title, cover_image, artist, genre }]`

### Get Por ID
Rota para retornar a música com ID passado por parâmetro.

- **URL:** /songs/:id
- **Método:** `GET`
- **URL params:** 
   - `id=[integer]`
- **Data params:** Não
- **Autenticação:** Sim
- **Resposta de sucesso:**
   - **Status**: 200
   - **Conteúdo**: `{ title, cover_image, artist, genre }`

### Random
Rota para retornar uma música aleatória do banco de dados.

- **URL:** /songs/songs/random
- **Método:** `GET`
- **URL params:** Não
- **Data params:** Não
- **Autenticação:** Sim
- **Resposta de sucesso:**
   - **Status**: 200
   - **Conteúdo**: `{ title, cover_image, artist, genre }`

### Update Por ID
Rota para editar música com ID passado por parâmetro.

- **URL:** /songs/:id
- **Método:** `PUT`
- **URL params:**
   - `id=[integer]`
- **Data params:**
   - `title=[string] (opcional)`
   - `cover_image=[string] (opcional)`
   - `artist=[string] (opcional)`
   - `genre=[string] (opcional)`
- **Autenticação:** Sim
- **Resposta de sucesso:**
   - **Status**: 204
   - **Conteúdo**: Vazio

### Deletar Por ID
Rota para deletar música com ID passado por parâmetro.

- **URL:** /songs/:id
- **Método:** `DELETE`
- **URL params:**
   - `id=[integer]`
- **Data params:** Não
- **Autenticação:** Sim
- **Resposta de sucesso:**
   - **Status**: 204
   - **Conteúdo**: Vazio

## Artists
### Create
Rota para criar artista no banco de dados.

- **URL:** /artists
- **Método:** `POST`
- **URL params:** Não
- **Data params:**
   - `name=[string]`
   - `nationality=[string]`
- **Autenticação:** Sim
- **Resposta de sucesso:**
   - **Status**: 201
   - **Conteúdo**: Vazio

### Get All
Rota para retornar todos os artistas no banco de dados.

- **URL:** /artists
- **Método:** `GET`
- **URL params:** Não
- **Data params:** Não
- **Autenticação:** Sim
- **Resposta de sucesso:**
   - **Status**: 200
   - **Conteúdo**: `[{ name, nationality}]`

### Get Por ID
Rota para retornar o artista com ID passado por parâmetro.

- **URL:** /artists/:id
- **Método:** `GET`
- **URL params:** 
   - `id=[integer]`
- **Data params:** Não
- **Autenticação:** Sim
- **Resposta de sucesso:**
   - **Status**: 200
   - **Conteúdo**: `{ name, nationality }`

### Update Por ID
Rota para editar artista com ID passado por parâmetro.

- **URL:** /artists/:id
- **Método:** `PUT`
- **URL params:**
   - `id=[integer]`
- **Data params:**
   - `name=[string] (opcional)`
   - `nationality=[string] (opcional)`
- **Autenticação:** Sim
- **Resposta de sucesso:**
   - **Status**: 204
   - **Conteúdo**: Vazio

### Deletar Por ID
Rota para deletar artista com ID passado por parâmetro.

- **URL:** /artists/:id
- **Método:** `DELETE`
- **URL params:**
   - `id=[integer]`
- **Data params:** Não
- **Autenticação:** Sim
- **Resposta de sucesso:**
   - **Status**: 204
   - **Conteúdo**: Vazio

## UserSongs
### Create
Rota para associar usuário com música no banco de dados. Recebemos o ID da música como parâmetro e associamos com o usuário logado.

- **URL:** /users-songs/:id
- **Método:** `POST`
- **URL params:** 
   - `id=[integer]`
- **Data params:**
- **Autenticação:** Sim
- **Resposta de sucesso:**
   - **Status**: 201
   - **Conteúdo**: Vazio

### Get All Songs By User
Rota para retornar todas as músicas associadas a um usuário.

- **URL:** /users-songs/users/:id
- **Método:** `GET`
- **URL params:**
   - `id=[integer]`
- **Data params:** Não
- **Autenticação:** Sim
- **Resposta de sucesso:**
   - **Status**: 200
   - **Conteúdo**: `[{ title, cover_image, artist, genre }]`

### Get All Users By Song
Rota para retornar todos os usuários associados a uma música.

- **URL:** /users-songs/songs/:id
- **Método:** `GET`
- **URL params:** 
   - `id=[integer]`
- **Data params:** Não
- **Autenticação:** Sim
- **Resposta de sucesso:**
   - **Status**: 200
   - **Conteúdo**: `[{ id, name, email, role }]`