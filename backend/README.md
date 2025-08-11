# 🎬 MovieTime – Backend

## Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Functionality](#functionality)
- [Limitations](#limitations)
- [Planned Improvements](#planned-improvements)
- [Docker Usage](#docker-usage)
- [License](#license)

---

## 📌 Overview

This is the **backend service** of the **MovieTime** application. It is built with **Node.js** and **Express**, and is responsible for serving APIs related to movies and user interactions.

The backend lives inside a monorepo structure alongside the frontend. All code quality tools (ESLint, Prettier, Husky, etc.) are configured globally at the root level of the project and apply to the backend automatically.

---

## 📁 Project Structure

```
movie-time/
├── backend/                  # Backend service
│   ├── controllers/          # Route handlers
│   ├── middlewares/          # Express middlewares
│   ├── routes/               # API route definitions
│   ├── utils/                # Utility functions (optional)
│   ├── server.js             # Entry point of the server
│   └── ...                   # Other backend modules
├── frontend/                 # Frontend app
├── package.json              # Root configuration (tools, scripts)
└── docker-compose.yml        # For containerized development
```

---

## ⚙️ Getting Started

1. **Install dependencies (from the root directory):**

   ```bash
   npm install
   ```

2. **Create a `.env` file in `backend/` with your config:**

   ```
   PORT=4000
   ```

3. **Run the backend in development mode:**

   ```bash
   cd backend
   npm run dev
   ```

   The server will be available at [http://localhost:4000](http://localhost:4000)

---

## 🔧 Functionality

- Express server with a modular route/controller setup.
- JSON request handling and basic routing.
- Placeholder for future database and API integration.
- Environment variable support.

---

## 🐳 Docker Usage

1. Make sure Docker and Docker Compose are installed.
2. Copy the example environment file:

```bash
 cp .env.example .env
```

3. Open `.env` and set your The Movie DB API key
4. From the root of the project, run:

   ```bash
   docker-compose up -d
   ```

5. Once containers are running, you can access the backend at:

   ```
   http://localhost:4000
   ```

---

## 📄 License

This project is licensed under the **MIT License**.
