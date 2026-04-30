# Feedback App (Next.js + Docker)

## 📌 Description

This is a simple Feedback Application built using Next.js.

Users can submit feedback (name and message), and all feedback entries are displayed in a list.

The application includes validation, duplicate prevention, API endpoints, and Docker support.

---

## 🚀 Features

- Submit feedback (Name + Message)
- Validation:
  - Name is required
  - Message must be between 10–200 characters
  - Duplicate feedback is prevented
- Fetch all feedback
- Loading, success, and error states
- Sorting feedback (latest first)

---

## 🔌 API Endpoints

### POST /api/feedback

Submit feedback

Request:

```json
{
  "name": "John",
  "message": "This is feedback"
}


# 🧪 curl

POST request:
curl -X POST http://localhost:3000/api/feedback \
-H "Content-Type: application/json" \
-d '{"name":"test","message":"This is valid feedback"}'

GET request:
curl http://localhost:3000/api/feedback


# 🧠 Assumptions

- Feedback data is stored in memory (no database used)
- Duplicate feedback is checked using same name + message
- Data resets when the server restarts
- Feedback is sorted with latest entries first


# 🧠 Assumptions

- Feedback data is stored in memory (no database used)
- Duplicate feedback is checked using same name + message
- Data resets when the server restarts
- Feedback is sorted with latest entries first


# 🐳 Docker

Build Docker image:
docker build -t nextjs-feedback .

Run container:
docker run -p 3000:3000 nextjs-feedback

---

# ☁️ Docker (CI/CD)

The Docker image was built using GitHub Actions (CI/CD pipeline) and pushed to Docker Hub.

Pull image:
docker pull imamanwar11/nextjs-feedback

Run:
docker run -p 3000:3000 imamanwar11/nextjs-feedback