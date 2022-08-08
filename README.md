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

## Rotas
### Login
Rota para fazer login no sistema, ou seja, obter o token JWT necessário para autenticação. Ele é automaticamente adicionado aos cookies do navegador.

- **URL:** /usuarios/login
- **Método:** `POST`
- **URL params:** Não
- **Data params:**
   - `email=[string]`
   - `senha=[string]`
- **Autenticação:** Não
- **Resposta de sucesso:**
   - **Status**: 200
   - **Conteúdo**: `{ id, email }`

**...**
   
