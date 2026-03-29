# Tech Store - Backend

Aplicação backend completa de uma loja virtual de tecnologia, desenvolvida com **Node.js puro (JavaScript)**, **Express.js**, **PostgreSQL**, **Prisma ORM** e **JWT**, seguindo os princípios da **Clean Architecture**.

## 🎯 Stack Obrigatória

| Componente | Tecnologia |
|-----------|-----------|
| **Runtime** | Node.js (JavaScript puro, sem TypeScript) |
| **Framework** | Express.js |
| **Banco de Dados** | PostgreSQL |
| **ORM** | Prisma |
| **Autenticação** | JWT (JSON Web Tokens) |
| **Hash de Senhas** | bcrypt |
| **Arquitetura** | Clean Architecture |

---

## 📁 Estrutura do Projeto

```
src/
├── domain/
│   ├── entities/         # Entidades de negócio puras
│   └── repositories/     # Interfaces/contratos dos repositórios
├── usecases/             # Casos de uso (lógica de negócio)
├── infra/
│   ├── database/
│   │   └── prisma/       # Schema, migrations e cliente Prisma
│   └── repositories/     # Implementações concretas dos repositórios
├── interfaces/
│   ├── controllers/      # Controllers Express
│   ├── middlewares/      # Auth, role, errors, logs
│   └── routes/           # Definição de rotas
├── shared/
│   └── errors/           # AppError e error handler global
└── server.js             # Ponto de entrada da aplicação
```

---

## 🚀 Instalação e Configuração

### 1. Clonar o repositório
```bash
git clone <url-do-repositorio>
cd Backend_proj2
```

### 2. Instalar dependências
```bash
npm install
```

### 3. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto (ou copie de `.env.example`):

```bash
# .env
PORT=3000
NODE_ENV=development
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/backend_proj2?schema=public"
JWT_SECRET="seu-secret-jwt-super-secreto"
JWT_EXPIRES_IN="1d"
```

**Ajuste as credenciais do PostgreSQL conforme seu ambiente.**

### 4. Executar migrações do banco de dados

Certifique-se de que o PostgreSQL está rodando:

```bash
npx prisma migrate dev --name init --schema=./src/infra/database/prisma/schema.prisma
```

Isso criará as tabelas no banco de dados.

### 5. Popular o banco com dados iniciais (seed)

```bash
npm run seed
```

Este comando cria:
- **3 categorias**: Laptops, Smartphones, Acessórios
- **10 produtos**: Com preços, descrições e alguns marcados como destaque
- **1 usuário ADMIN**: `admin@techstore.com` / `admin123`

### 6. Iniciar o servidor

**Desenvolvimento (com auto-reload):**
```bash
npm run dev
```

**Produção:**
```bash
npm start
```

A API estará disponível em: **`http://localhost:3000/api`**

---

## 🔌 Endpoints da API

**URL Base:** `http://localhost:3000/api`

### ✅ Health Check
- **GET** `/` - Verifica se a API está rodando

```bash
curl http://localhost:3000/api
```

**Resposta:**
```json
{
  "message": "Tech Store API is running!",
  "timestamp": "2026-03-29T17:18:52.985Z"
}
```

---

### 🔐 Autenticação

#### **Registrar novo usuário**
- **POST** `/auth/register`

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@example.com",
    "password": "senha123"
  }'
```

**Resposta (201 Created):**
```json
{
  "id": "uuid-aqui",
  "name": "João Silva",
  "email": "joao@example.com",
  "role": "CUSTOMER",
  "createdAt": "2026-03-29T17:19:11.471Z"
}
```

#### **Login**
- **POST** `/auth/login`

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@example.com",
    "password": "senha123"
  }'
```

**Resposta (200 OK):**
```json
{
  "user": {
    "id": "uuid-aqui",
    "name": "João Silva",
    "email": "joao@example.com",
    "role": "CUSTOMER",
    "createdAt": "2026-03-29T17:19:11.471Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 📦 Produtos

#### **Listar produtos (com filtros e paginação)**
- **GET** `/products?category=laptops&search=pro&page=1&limit=10&orderBy=price_asc`

```bash
# Todos os produtos
curl http://localhost:3000/api/products

# Por categoria
curl http://localhost:3000/api/products?category=laptops

# Com busca
curl http://localhost:3000/api/products?search=gamer

# Com paginação
curl http://localhost:3000/api/products?page=2&limit=5

# Ordenação: price_asc, price_desc, createdAt_asc, createdAt_desc
curl http://localhost:3000/api/products?orderBy=price_asc
```

#### **Listar produtos em destaque**
- **GET** `/products/featured`

```bash
curl http://localhost:3000/api/products/featured
```

#### **Buscar produto por ID**
- **GET** `/products/:id`

```bash
curl http://localhost:3000/api/products/a1bfc30c-592f-4786-ad54-dec706ea392b
```

#### **Criar produto (ADMIN)**
- **POST** `/products` (Requer autenticação + role ADMIN)

```bash
TOKEN="seu-token-jwt-aqui"

curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "Novo Produto",
    "description": "Descrição do produto",
    "price": 2999.99,
    "imageUrl": "https://via.placeholder.com/150",
    "stock": 50,
    "featured": true,
    "categoryId": "7726edc2-b32a-4be8-a28a-9af11f8e8d2e"
  }'
```

#### **Atualizar produto (ADMIN)**
- **PUT** `/products/:id`

```bash
curl -X PUT http://localhost:3000/api/products/product-id \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "price": 2499.99,
    "stock": 30
  }'
```

#### **Deletar produto (ADMIN)**
- **DELETE** `/products/:id`

```bash
curl -X DELETE http://localhost:3000/api/products/product-id \
  -H "Authorization: Bearer $TOKEN"
```

---

### 🏷️ Categorias

#### **Listar categorias**
- **GET** `/categories`

```bash
curl http://localhost:3000/api/categories
```

#### **Criar categoria (ADMIN)**
- **POST** `/categories`

```bash
curl -X POST http://localhost:3000/api/categories \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"name": "Monitores"}'
```

---

### 🛒 Carrinho (Rotas Protegidas)

#### **Ver carrinho do usuário**
- **GET** `/cart`

```bash
curl http://localhost:3000/api/cart \
  -H "Authorization: Bearer $TOKEN"
```

#### **Adicionar item ao carrinho**
- **POST** `/cart`

```bash
curl -X POST http://localhost:3000/api/cart \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "productId": "a1bfc30c-592f-4786-ad54-dec706ea392b",
    "quantity": 2
  }'
```

#### **Atualizar quantidade do item**
- **PUT** `/cart/:id`

```bash
curl -X PUT http://localhost:3000/api/cart/cart-item-id \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"quantity": 5}'
```

#### **Remover item do carrinho**
- **DELETE** `/cart/:id`

```bash
curl -X DELETE http://localhost:3000/api/cart/cart-item-id \
  -H "Authorization: Bearer $TOKEN"
```

---

### 📋 Pedidos (Rotas Protegidas)

#### **Criar pedido (a partir do carrinho)**
- **POST** `/orders`

```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Authorization: Bearer $TOKEN"
```

*Regras:*
- Cria um pedido com todos os itens do carrinho
- Calcula o total no backend
- Decrementa o estoque de cada produto
- Limpa o carrinho do usuário
- Usa transação para garantir consistência

#### **Listar pedidos do usuário**
- **GET** `/orders`

```bash
curl http://localhost:3000/api/orders \
  -H "Authorization: Bearer $TOKEN"
```

#### **Ver detalhes de um pedido**
- **GET** `/orders/:id`

```bash
curl http://localhost:3000/api/orders/order-id \
  -H "Authorization: Bearer $TOKEN"
```

---

### ⭐ Avaliações

#### **Listar avaliações de um produto**
- **GET** `/products/:id/reviews`

```bash
curl http://localhost:3000/api/products/product-id/reviews
```

#### **Criar avaliação (Requer autenticação)**
- **POST** `/products/:id/reviews`

```bash
curl -X POST http://localhost:3000/api/products/product-id/reviews \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "rating": 5,
    "comment": "Produto excelente, muito satisfeito com a compra!"
  }'
```

---

## 🛡️ Tratamento de Erros

A API retorna erros padronizados:

| Status | Significado |
|--------|-----------|
| **400** | Bad Request - Dados inválidos |
| **401** | Unauthorized - Token inválido ou não fornecido |
| **403** | Forbidden - Sem permissão (ex: não é ADMIN) |
| **404** | Not Found - Recurso não encontrado |
| **409** | Conflict - Recurso duplicado (ex: email já em uso) |
| **500** | Internal Server Error - Erro do servidor |

**Exemplo de resposta de erro:**
```json
{
  "status": "error",
  "message": "Este e-mail já está em uso."
}
```

---

## 📊 Banco de Dados

### Entidades (Schema Prisma)

- **User**: Usuários da plataforma (ADMIN ou CUSTOMER)
- **Category**: Categorias de produtos
- **Product**: Produtos disponíveis
- **CartItem**: Itens do carrinho
- **Review**: Avaliações de produtos
- **Order**: Pedidos realizados
- **OrderItem**: Itens de um pedido

---

## 🧪 Testando a API

### Usando cURLs (Command Line)

```bash
# 1. Verificar se a API está rodando
curl http://localhost:3000/api

# 2. Registrar novo usuário
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@ex.com","password":"pass"}'

# 3. Fazer login para obter token
TOKEN=$(curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@ex.com","password":"pass"}' | grep -o '"token":"[^"]*' | cut -d'"' -f4)

# 4. Usar o token em requisições protegidas
curl http://localhost:3000/api/cart \
  -H "Authorization: Bearer $TOKEN"
```

### Usando Postman ou Insomnia

1. Abra a ferramenta de teste de API
2. Crie uma nova requisição
3. Use os exemplos de endpoints acima
4. Para rotas protegidas, adicione o header: `Authorization: Bearer <seu-token>`

---

## ⚙️ Scripts NPM

```bash
npm run dev      # Inicia o servidor em modo desenvolvimento (com nodemon)
npm start        # Inicia o servidor em modo produção
npm run seed     # Popula o banco com dados iniciais
```

---

## 📝 Notas Importantes

- ✅ **Validação**: Todos os dados de entrada são validados
- ✅ **Autenticação**: JWT válido por 1 dia (configurável em `.env`)
- ✅ **Autorização**: Rotas ADMIN são protegidas por role check
- ✅ **Transações**: Criação de pedidos usa transações do Prisma
- ✅ **Estoque**: Produtos com estoque = 0 não podem ser comprados
- ✅ **Erros**: Erros Prisma são capturados e formatados

---

## 🐛 Troubleshooting

**Erro: Cannot connect to database**
- Verifique se PostgreSQL está rodando
- Confirме as credenciais em `.env`
- Verifique se o banco existe ou crie manualmente

**Erro: JWT token invalid**
- Certifique-se de que o token foi extraído corretamente
- Verifique se o token não expirou
- Confirme que a chave `JWT_SECRET` é a mesma em `.env`

**Problema: Seed não popula dados**
- Execute as migrações primeiro: `npx prisma migrate dev`
- Verifique se o banco está acessível
- Confira os logs do comando `npm run seed`

---

## 📄 Licença

ISC
