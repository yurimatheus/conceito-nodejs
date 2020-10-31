const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

// List the projects
app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

// Create a repository
app.post("/repositories", (request, response) => {

  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(repository);

  return response.json(repository);

});

// Update repository 
app.put("/repositories/:id", (request, response) => {
  
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0){
    return response.status(400).json({ error: "Repository not found"});
  }

  const repository = {
    id,
    title,
    url,
    techs,
    likes: repositories[repositoryIndex].likes
  }

  repositories[repositoryIndex] = repository;

  return response.json(repository);

});

// Delete repository
app.delete("/repositories/:id", (request, response) => {

  const { id } = request.params;
  
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "Repository not found "});
  }

  repositories.splice(repositoryIndex, 1);
  
  return response.status(204).send();
});

// Add like a repository manu
app.post("/repositories/:id/like", (request, response) => {
  
  const { id } = request.params;
  const repositoryId = repositories.find(repository => repository.id === id);

  if (!repositoryId) {
    return response.status(400).json({ error: "Repository not found "});
  }

  repositoryId.likes += 1;

  return response.json(repositoryId);

});

module.exports = app;
