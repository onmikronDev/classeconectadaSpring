# ClasseConectada - Sistema Educacional

## Tecnologias
- Spring Boot 3.x
- MySQL
- JPA/Hibernate
- Lombok

## Como Executar
1. Configure MySQL (usuário: root, senha: root)
2. Execute: `./mvnw spring-boot:run`
3. API disponível em: http://localhost:8080

## Endpoints

### Alunos
- GET /api/students - Listar todos
- GET /api/students/{id} - Buscar por ID
- POST /api/students - Criar novo
- PUT /api/students/{id} - Atualizar
- DELETE /api/students/{id} - Deletar

### Professores
- GET /api/teachers
- GET /api/teachers/{id}
- POST /api/teachers
- PUT /api/teachers/{id}
- DELETE /api/teachers/{id}

### Disciplinas
- GET /api/subjects
- GET /api/subjects/{id}
- POST /api/subjects
- PUT /api/subjects/{id}
- DELETE /api/subjects/{id}
