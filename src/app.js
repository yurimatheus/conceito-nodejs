const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];
const likes = 0;
const techs = [];

// Middlewares

// function idRepoExist(request, response, next) {
//   const { id } = request.params;

//   if (!repositoryIndex === id) {
//     return response.status(400);
//   } else {
//     next();
//   }
  
// }

// Rotas
app.get("/repositories", (request, response) => {
  const repositories = { id: uuid(), techs, title, url, likes };
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {

  const { title, url, techs, likes } = request.body;

  const repository = { id: uuid(), title, url, techs, likes };

  repositories.push(repository);

  return response.json(repository);

});

app.put("/repositories/:id", idRepoExist, (request, response) => {
  // Alterar apenas o title, url, techs com id igual ao id dos parâmetros da rota >> middleware
  // Verificar se o id do repositório existe >> middleware (400)

  const { id } = request.params;
  const { title, url, techs, likes } = request.body;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0){
    return response.status(400).json({ error: "Repository not found"});
  }

  const repository = {
    id,
    title,
    url,
    techs,
    likes
  }

  repositories[repositoryIndex] = repository;

  return response.json(repository);

});

app.delete("/repositories/:id", idRepoExist, (request, response) => {
  // Deletar o repositório com o id presente nos parametros da rota >> middleware
  // Verificar se o id do repositório existe >> middleware (400)

  const { id } = request.params;
  return response.status(204);
});

app.post("/repositories/:id/like", (request, response) => {
  // A cada nova requisição é para adicionar um like (+1)
  // Verificar se o id do repositório existe >> middleware (400)

  const { id } = request.params;

  return response.json(id);

});

module.exports = app;
