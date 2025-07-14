
# 📘 Fin Edu – Learn Finance the Smart Way

**Fin Edu** is a full-stack finance education web app built using the MERN stack. It offers an interactive way to learn personal finance through tools, blog articles, videos, and real-time community support.

---

## 🔑 Key Features

- 🌍 Multi-language Support  
- 📝 Educational Blog System with text to speech
- 💸 Expense Tracker & EMI Calculator  
- 🎥 Course Video Library (Upload & Watch)  
- 👥 Community Video Calling using Firebase + WebRTC  
- 🗺️ Map Integration for Nearby Bank Tracking  
- 🤖 Chatbot Helper for Finance Queries  

---

## ⚙️ Tech Stack

| Layer      | Technology             |
|------------|------------------------|
| Frontend   | React.js               |
| Backend    | Node.js, Express.js    |
| Database   | MongoDB                |
| Auth       | JWT                    |
| Video Call | Firebase + WebRTC      |
| Maps       | Leaflet Maps API        |

---

## 🛠️ Getting Started

### 📦 Prerequisites

- Node.js v18+
- MongoDB
- Firebase Project (for WebRTC) 

---

### 🚀 Run Locally

#### 1. Clone the repository
```bash
git clone https://github.com/yourusername/fin-edu.git
cd fin-edu

2. Set up Backend

cd server
npm install
npm start

3. Set up Frontend

cd client
npm install
npm start


---

🔐 Environment Variables

Create a .env file in both client/ and server/ folders.

Example .env for Backend (server/.env)

PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

Example .env for Frontend (client/.env)

REACT_APP_FIREBASE_API_KEY=your_firebase_key
REACT_APP_FIREBASE_AUTH_DOMAIN=...
REACT_APP_FIREBASE_PROJECT_ID=...
REACT_APP_GOOGLE_MAPS_API_KEY=


---
