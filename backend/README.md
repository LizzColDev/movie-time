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
├── backend/
│   ├── config/                 # Application configuration and environment variables
│   ├── src/
│   │   ├── controllers/        # Request handlers for API endpoints
│   │   ├── routes/             # Express route definitions
│   │   ├── services/           # Business logic and TMDB API integration
│   │   ├── app.js              # Express application configuration
│   │   └── index.js            # Application entry point
│   ├── tests/                  # Unit and integration tests
│   ├── Dockerfile              # Backend container definition
│   ├── package.json            # Backend dependencies and scripts
│   └── README.md               # Backend documentation
├── frontend/                   # React frontend application
├── package.json                # Monorepo configuration
└── docker-compose.yml          # Multi-container development setup
```

---

## ⚙️ Getting Started

1. **Install dependencies (from the root directory):**

   ```bash
   npm install
   ```

2. **Create a `.env` file in `backend/`:**

   ```env
   PORT=4000
   TMDB_ACCESS_TOKEN=your_tmdb_read_access_token
   TMDB_API_URL=https://api.themoviedb.org/3
   ```

3. **Run the backend in development mode:**

   ```bash
   cd backend
   npm run dev
   ```

   The server will be available at [http://localhost:4000](http://localhost:4000)

---

## 🔧 Functionality

- Express server with a modular architecture.
- Environment-based configuration using `dotenv`.
- TMDB service layer built with Axios.
- Health check endpoint (`GET /api/health`).
- Environment variable support.
- Modular architecture following the Route → Controller → Service pattern.

---

## 🧪 Testing

Run all tests with:

```bash
npm test
```

Current test coverage includes:

- Health check endpoint.
- TMDB service.

> **Note:** The TMDB service test currently performs real requests against the TMDB API using a valid access token. In a future iteration, this test will be replaced with mocked HTTP requests to make the test suite independent of external services.

---

## 🐳 Docker Usage

1. Make sure Docker and Docker Compose are installed.
2. Copy the example environment file:

```bash
 cp .env.example .env
```

3. Open `.env` and set your TMDB Read Access Token.
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
