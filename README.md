# QnA RAG Backend

This is a **NestJS-based backend** for a (RAG) QnA system.

---

## Tech Stack

- NestJS
- PostgreSQL (Docker)
- TypeORM
- JWT Auth
- Swagger (API Docs)
- Multer (File Uploads)

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Shivanshugupta007/qna-rag-backend.git
cd qna-rag-backend

docker-compose up -d  // Run Docker Compose For PSQL

npm install   // Install Packages

nest start   // Start Application

npm run test  // To Run Test Cases

