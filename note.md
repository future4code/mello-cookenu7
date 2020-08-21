***********************************************************
=== OK ===
### 1. Cadastro
POST /signup

Usuário deve informar:
- Id
- E-mail
- Nome
- Senha (mínimo 6 caracteres)
* DEVE RETORNAR UM TOKEN *
***********************************************************
=== OK ===
### 2. Login
POST /login

Informar:
- E-mail
- Senha 
* DEVE RETORNAR UM TOKEN *
***********************************************************
=== OK ===
### 3. Infos do próprio perfil
GET /user/profile

A partir do token de autenticação fornecido no login, usuário deverá ser capaz de:
- Ver as suas informações NÃO SENSÍVEIS salvas no banco (id, nome e e-mail)
***********************************************************
=== OK ===
### 4. Criar receitas
POST /recipe

Usuário poderá criar uma receita. Ela deve ter:
- Título
- Descrição/modo de preparo
- Data de criação
**********************************************************
=== OK ===
### 5. Seguir usuário
POST /user/follow

Um usuário deve poder seguir outros usuários - fornecer o ID do usuário que deseja seguir
``` um usuário seguir outro, não significa que "esse outro" está seguindo o primeiro ```
**********************************************************
=== OK ===
### 6. Feed
GET /user/feed

Usuário pode visualizar as receitas criadas pelos usuários que ele segue.
* RECEITAS DEVEM ESTAR ORDENADAS PELA DATA DE CRIAÇÃO * 
**********************************************************
=== OK ===
### 7. Pegar perfil de outro usuário
GET /user/:id
**********************************************************
=== OK ===
### 8. Pegar receita
GET /recipe/:id
**********************************************************
=== OK ===
### 9. Deixar de seguir usuário
POST /user/unfollow
**********************************************************

### SQL Workbench

- Tabela de usuários (CookenuUsers) 

CREATE TABLE CookenuUsers (
    id VARCHAR(255) PRIMARY KEY, 
    name VARCHAR(255) NULL, 
    email VARCHAR(255) UNIQUE NOT NULL, 
    password VARCHAR(255) UNIQUE NOT NULL
)

- Tabela de receitas (CookenuRecipes)

CREATE TABLE CookenuRecipes (
	id VARCHAR(255) PRIMARY KEY, 
    title VARCHAR(255) NOT NULL, 
    description TEXT NOT NULL, 
    date DATE NOT NULL,
    creator_user_id varchar(255) NOT NULL,
    FOREIGN KEY (creator_user_id) REFERENCES CookenuUsers(id)
);

- Tabela de followers (CookenuUserFollow)

CREATE TABLE CookenuUserFollow (
	user_id varchar(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES CookenuUsers(id),
    user_id_to_follow varchar(255) NOT NULL,
    FOREIGN KEY (user_id_to_follow) REFERENCES CookenuUsers(id)
);

SELECT * FROM CookenuUsers;
SELECT * FROM CookenuRecipes;
SELECT * FROM CookenuUserFollow;

**********************************************************

### DESAFIOS 

**********************************************************
=== OK ===
### 10. Criar mais um tipo de usuário
Adicionar um role para representar o tipo de usuário. 
Alterar o signUp e o login
**********************************************************
=== OK === SÓ ADMIN ESTÁ PODENDO EDITAR
### 11. Editar receita 
Usuário "NORMAL" edita sua própria receita
Retornar erro se a receita não for dele
**********************************************************
=== OK === SÓ ADMIN ESTÁ PODENDO DELETAR
### 12. Deletar receita
Usuário "NORMAL" deleta sua própria receita
Retornar erro se a receita não for dele
Se usuário for "ADMIN", permitir que ele delete qualquer post
**********************************************************

### 13. Deletar conta
Usuário "ADMIN" pode deletar a conta de qualquer usuário
Retornar erro se usuário for "NORMAL"
Lembrar que ao deletar, deletar todas as relações como receita e usuários que segue

### 14. Refresh token
Implementar e alterar os endpoints para que haja um refresh token
Coloque o tempo de expiração de 10min para o access token e 1 ano para o refresh token

ALTER TABLE CookenuUsers
ADD role ENUM("ADMIN","NORMAL") DEFAULT "NORMAL";

SELECT * FROM USERS

SELECT 
	r.id,
	r.title,
	r.description,
	r.created_at AS createdAt,
	u.id AS userId,
	u.name AS userName
FROM
	Follow f JOIN User u ON f.followed_id = u.id
	JOIN Recipes r ON r.creator_id = u.id
WHERE 
	f.user_id = 'id de quem segue'