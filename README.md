# chatApp

## Project Structure

**Frontend:** 

React, Tailwind CSS, daisyUI

**Backend:** 

node.js (express)

**Database:** 

MongoDB

**LLM:** 

OpenAI

## How to run

### 1. Install in local

**Frontend:** 

```bash
cd chat-app
npm install
npm run start
```

**Backend:** 

```bash
cd chat-app-backend
npm install
npm run start
```

Visit http://localhost:3000/

### 2. Pull from Docker Hub

#### 1) Pull both frontend and backend Docker images from Docker Hub

**Frontend:** 

https://hub.docker.com/r/shiboxu09/shibo-xu-answersai-frontend/tags

```bash
docker pull shiboxu09/shibo-xu-answersai-frontend:1.0
```

**Backend:** 

https://hub.docker.com/r/shiboxu09/shibo-xu-answersai-backend/tags

```bash
docker pull shiboxu09/shibo-xu-answersai-backend:1.0
```

#### 2) Run images

```bash
docker run -d -p 3000:3000 shiboxu09/shibo-xu-answersai-frontend:1.0
docker run -d -p 5000:5000 shiboxu09/shibo-xu-answersai-backend:1.0
```

#### 3) Access the application

Visit http://localhost:3000/
