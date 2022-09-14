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
         ArtistaID: INTEGER, FK
         Categoria: STRING
      ARTISTA:
         ID: INTEGER, PK
         Nome: STRING
         Nacionalidade: STRING
         Foto: STRING

## Relacionamentos
   - UM usuário escuta VÁRIAS músicas, UMA música é escutada por VÁRIOS usuários (M:N)
   - UM artista canta VÁRIAS músicas, UMA música é cantada por UM artista (1:N)

# Como rodar:
   1. Clone este repositório
      
      git clone https://github.com/UFMGInformaticaJr/Trainee-Spotify
   2. Vá até a pasta da api

      cd Trainee-Spotify/api
   3. Instale as dependências

      npm install
   4. Rode a api

      npm start

# Rotas
## Users
### Login
Rota para fazer login no sistema, ou seja, obter o token JWT necessário para autenticação. Ele é automaticamente adicionado aos cookies do navegador.

- **URL:** localhost:3030/api/users/login
- **Método:** `POST`
- **URL params:** Não
- **Data params:**
   - `email=[string]`
   - `password=[string]`
- **Autenticação:** Não
- **Resposta de sucesso:**
   - **Status**: 204
   - **Conteúdo**: Vazio

### Logout
Rota para fazer logout no sistema, ou seja, remover o token JWT necessário para autenticação.

- **URL:** localhost:3030/api/users/logout
- **Método:** `POST`
- **URL params:** Não
- **Data params:** Não
- **Autenticação:** Sim
- **Resposta de sucesso:**
   - **Status**: 204
   - **Conteúdo**: Vazio

### Create
Rota para criar usuário no banco de dados.

- **URL:** localhost:3030/api/users
- **Método:** `POST`
- **URL params:** Não
- **Data params:**
   - `name=[string]`
   - `email=[string]`
   - `password=[string]`
   - `role=[string] ('admin' ou 'user')`
- **Autenticação:** Sim
- **Resposta de sucesso:**
   - **Status**: 201
   - **Conteúdo**: Vazio

### Get All
Rota para retornar todos os usuários no banco de dados.

- **URL:** localhost:3030/api/users
- **Método:** `GET`
- **URL params:** Não
- **Data params:** Não
- **Autenticação:** Sim
- **Resposta de sucesso:**
   - **Status**: 200
   - **Conteúdo**: `[{ id, name, email, role }]`

### Get Usuário Atual
Rota para retornar usuário logado.

- **URL:** localhost:3030/api/users/user
- **Método:** `GET`
- **URL params:** Não
- **Data params:** Não
- **Autenticação:** Sim
- **Resposta de sucesso:**
   - **Status**: 200
   - **Conteúdo**: `{ id, name, email, role }`

### Get Por ID
Rota para retornar o usuário com ID passado por parâmetro.

- **URL:** localhost:3030/api/users/:id
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

- **URL:** localhost:3030/api/users/:id
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

- **URL:** localhost:3030/api/users/:id
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

- **URL:** localhost:3030/api/songs
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

- **URL:** localhost:3030/api/songs
- **Método:** `GET`
- **URL params:** Não
- **Data params:** Não
- **Autenticação:** Sim
- **Resposta de sucesso:**
   - **Status**: 200
   - **Conteúdo**: `[{ title, cover_image, artist, genre }]`

### Get Por ID
Rota para retornar a música com ID passado por parâmetro.

- **URL:** localhost:3030/api/songs/:id
- **Método:** `GET`
- **URL params:** 
   - `id=[integer]`
- **Data params:** Não
- **Autenticação:** Sim
- **Resposta de sucesso:**
   - **Status**: 200
   - **Conteúdo**: `{ title, cover_image, artist, genre }`

### Get Random
Rota para retornar uma música aleatória do banco de dados.

- **URL:** localhost:3030/api/songs/songs/random
- **Método:** `GET`
- **URL params:** Não
- **Data params:** Não
- **Autenticação:** Sim
- **Resposta de sucesso:**
   - **Status**: 200
   - **Conteúdo**: `{ title, cover_image, artist, genre }`

### Get Songs By Artist
Rota para retornar todas as músicas do artista com ID passado como parâmetro.

- **URL:** localhost:3030/api/songs/artist/:id
- **Método:** `GET`
- **URL params:** 
   - `id=[integer]`
- **Data params:** Não
- **Autenticação:** Sim
- **Resposta de sucesso:**
   - **Status**: 200
   - **Conteúdo**: `[{ title, cover_image, artist, genre }]`   

### Update Por ID
Rota para editar música com ID passado por parâmetro.

- **URL:** localhost:3030/api/songs/:id
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

- **URL:** localhost:3030/api/songs/:id
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

- **URL:** localhost:3030/api/artists
- **Método:** `POST`
- **URL params:** Não
- **Data params:**
   - `name=[string]`
   - `nationality=[string]`
   - `image=[string]`
- **Autenticação:** Sim
- **Resposta de sucesso:**
   - **Status**: 201
   - **Conteúdo**: Vazio

### Get All
Rota para retornar todos os artistas no banco de dados.

- **URL:** localhost:3030/api/artists
- **Método:** `GET`
- **URL params:** Não
- **Data params:** Não
- **Autenticação:** Sim
- **Resposta de sucesso:**
   - **Status**: 200
   - **Conteúdo**: `[{ name, nationality, image}]`

### Get Por ID
Rota para retornar o artista com ID passado por parâmetro.

- **URL:** localhost:3030/api/artists/:id
- **Método:** `GET`
- **URL params:** 
   - `id=[integer]`
- **Data params:** Não
- **Autenticação:** Sim
- **Resposta de sucesso:**
   - **Status**: 200
   - **Conteúdo**: `{ name, nationality, image }`

### Update Por ID
Rota para editar artista com ID passado por parâmetro.

- **URL:** localhost:3030/api/artists/:id
- **Método:** `PUT`
- **URL params:**
   - `id=[integer]`
- **Data params:**
   - `name=[string] (opcional)`
   - `nationality=[string] (opcional)`
   - `image=[string] (opcional)`
- **Autenticação:** Sim
- **Resposta de sucesso:**
   - **Status**: 204
   - **Conteúdo**: Vazio

### Deletar Por ID
Rota para deletar artista com ID passado por parâmetro.

- **URL:** localhost:3030/api/artists/:id
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

- **URL:** localhost:3030/api/users-songs/:id
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

- **URL:** localhost:3030/api/users-songs/users/:id
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

- **URL:** localhost:3030/api/users-songs/songs/:id
- **Método:** `GET`
- **URL params:** 
   - `id=[integer]`
- **Data params:** Não
- **Autenticação:** Sim
- **Resposta de sucesso:**
   - **Status**: 200
   - **Conteúdo**: `[{ id, name, email, role }]`
