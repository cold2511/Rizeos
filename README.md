# 💼 RizeOS - Job & Networking Portal

A full-stack web application that functions like a decentralized LinkedIn — built with React, Node.js, MongoDB, and Web3 (Polygon + MetaMask). It supports user authentication, job posting, smart job filtering, resume skill extraction using NLP, and blockchain payments for job listings.

---

## 🚀 Features

### 👤 Authentication
- JWT-based user login & registration
- Protected routes and session handling

### 💼 Job Portal
- Post a job with title, location, skills & tags
- View all listed jobs
- Filter jobs by skill, location or tag

### 📤 Resume Upload + Skill Extraction
- Upload `.txt` resume
- Extract top skills using basic NLP matching
- Show matching jobs

### 🤖 Smart Match Scoring
- Bio vs Job Description match using Hugging Face's MiniLM Transformer

### 💰 Blockchain Payment (Web3)
- Job posting requires MATIC payment via MetaMask
- Integrated with Polygon Mumbai Testnet
- Admin wallet address configured

---

## 🧱 Tech Stack

| Layer     | Tech Used                               |
|-----------|-----------------------------------------|
| Frontend  | React + Vite + Tailwind CSS             |
| Backend   | Node.js + Express                       |
| Database  | MongoDB + Mongoose                      |
| Auth      | JWT (JSON Web Tokens)                   |
| File Upload | Multer                                |
| NLP Match | Hugging Face Transformers API           |
| Web3      | ethers.js + MetaMask + Polygon Mumbai   |

---

## 🧩 Project Structure

rizeos/
├── index.js # Backend entry point
├── .env # Secret config (JWT, DB URI, HF Key)
├── /routes # API endpoints (auth, jobs, match, payment)
├── /models # Mongoose schemas
├── /client # React frontend (Vite)
│ ├── /src/pages # Login, Register, JobList, PostJob, Payment, etc.
│ ├── /src/components # ProtectedRoute
│ └── App.jsx # Route config

yaml
Copy
Edit

---

## ⚙️ Installation

### 1. Clone the Repo

```bash
git clone https://github.com/cold2511/rizeos-job-portal.git
cd rizeos-job-portal
2. Setup Backend
bash
Copy
Edit
npm install
# create .env file in root with:
# PORT=3000
# JWT_SECRET=your_secret
# MONGO_URI=your_mongodb_uri
# HUGGINGFACE_API_KEY=your_hf_key
node index.js
3. Setup Frontend
bash
Copy
Edit
cd client
npm install
npm run dev
Visit: http://localhost:5173

🧪 Testing
Register or login

Upload a .txt resume → Extract skills

Post a job (after Web3 payment)

Filter/search for jobs

Click a job to view details or apply

🔐 Environment Variables
Create .env file in root:

env
Copy
Edit
PORT=3000
JWT_SECRET=your_jwt_secret
MONGO_URI=your_mongodb_uri
HUGGINGFACE_API_KEY=your_huggingface_api_key
📦 Dependencies
express, mongoose, jsonwebtoken, bcryptjs, cors, multer

axios, dotenv

Frontend: react-router-dom, axios, ethers, tailwindcss

🌐 Deployment Suggestions
Service	Role
Vercel	Frontend
Render / Railway	Backend + MongoDB
MetaMask + PolygonScan	Web3 Payment & Wallet

📸 Screenshots
Include screenshots of login, job list, resume extraction, payment popup, etc.

🙌 Acknowledgements
Hugging Face Transformers

Polygon Mumbai

MetaMask
