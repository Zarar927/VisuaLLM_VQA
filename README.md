# 👁️ VisuaLLM

> **An AI-powered Visual Question Answering (VQA) application built with Next.js, Django, and Hugging Face Transformers.**

VisuaLLM is a full-stack Artificial Intelligence application that enables users to upload an image and ask natural language questions about its contents. Using state-of-the-art Vision-Language Models (VLMs), the system analyzes the uploaded image and generates intelligent, context-aware responses. If no question is provided, the application automatically generates a descriptive caption for the image.

In addition to AI-powered image understanding, VisuaLLM generates a professional PDF report containing the image, user query, and AI-generated response, making it useful for documentation, research, and educational purposes.

---

# 📌 Table of Contents

* [Overview](#-overview)
* [Features](#-features)
* [Technology Stack](#-technology-stack)
* [System Architecture](#-system-architecture)
* [Project Structure](#-project-structure)
* [How It Works](#-how-it-works)
* [Prerequisites](#-prerequisites)
* [Installation](#-installation)

  * [Backend Setup](#backend-setup)
  * [Frontend Setup](#frontend-setup)
* [Running the Application](#-running-the-application)
* [API Endpoints](#-api-endpoints)
* [Important Notes](#-important-notes)
* [Future Improvements](#-future-improvements)
* [License](#-license)

---

# 📖 Overview

VisuaLLM combines modern web technologies with powerful AI models to provide an intuitive Visual Question Answering experience.

The application consists of:

* **Next.js** frontend for an interactive user interface
* **Django REST Framework** backend for API services
* **Hugging Face Transformers** for AI inference
* **PyTorch** for deep learning model execution
* **ReportLab** for PDF report generation

Users simply upload an image, ask a question, and receive an AI-generated response within seconds.

---

# ✨ Features

* 📷 Upload images from your device
* ❓ Ask natural language questions about images
* 🖼️ Automatic image caption generation
* 🤖 AI-powered Visual Question Answering (VQA)
* 📄 Generate downloadable PDF reports
* 🎨 Modern responsive user interface
* ⚡ Fast REST API using Django
* 📁 Organized full-stack architecture
* 🔄 Frontend and backend separation
* 🧠 Transformer-based Vision Language Models

---

# 🛠 Technology Stack

## Frontend

* Next.js
* React.js
* Tailwind CSS
* Framer Motion
* Lucide React Icons

## Backend

* Django
* Django REST Framework
* SQLite (Development)

## Artificial Intelligence

* PyTorch
* Hugging Face Transformers
* BLIP Image Captioning Model
* BLIP Visual Question Answering Model
* FLAN-T5 for response refinement

## Document Generation

* ReportLab

---

# 🏗 System Architecture

```text
                    User
                     │
                     ▼
             Next.js Frontend
                     │
          Upload Image + Question
                     │
                     ▼
        Django REST API Backend
                     │
        ┌────────────┴────────────┐
        │                         │
        ▼                         ▼
 Image Captioning           Visual Question Answering
      (BLIP)                     (BLIP VQA)
        │                         │
        └────────────┬────────────┘
                     ▼
           FLAN-T5 Response Refinement
                     │
                     ▼
          Generate Final AI Response
                     │
                     ▼
         Create PDF Report (ReportLab)
                     │
                     ▼
             Return JSON Response
```

---

# 📂 Project Structure

```text
VisuaLLM/
│
├── backend/
│   ├── backend/
│   ├── core/
│   ├── media/
│   ├── manage.py
│   └── db.sqlite3
│
└── visuallm_project/
    ├── src/
    ├── public/
    ├── package.json
    └── next.config.js
```

---

# ⚙ How It Works

1. The user uploads an image through the frontend.
2. The user optionally enters a question related to the image.
3. The frontend sends both the image and question to the Django REST API.
4. The backend processes the uploaded image.
5. If no question is provided, the BLIP Captioning model generates an image description.
6. If a question is provided, the BLIP VQA model analyzes the image and generates an answer.
7. FLAN-T5 refines the generated response for improved readability.
8. A PDF report containing the image, question, and AI response is generated.
9. The backend returns the AI response along with the PDF download link.

---

# 📋 Prerequisites

Before running the project, ensure you have installed:

* Python 3.10 or later
* Node.js 18 or later
* npm
* Git
* Internet connection (required for downloading Hugging Face models during the first run)

---

# 🚀 Installation

## Backend Setup

Navigate to the backend directory.

```bash
cd backend
```

Create a virtual environment.

```bash
python -m venv env
```

Activate the virtual environment.

### Windows (PowerShell)

```powershell
.\env\Scripts\Activate.ps1
```

### Linux / macOS

```bash
source env/bin/activate
```

Upgrade pip.

```bash
pip install --upgrade pip
```

Install dependencies.

```bash
pip install django djangorestframework django-cors-headers pillow torch transformers reportlab
```

Run database migrations.

```bash
python manage.py migrate
```

Start the backend server.

```bash
python manage.py runserver 8000
```

The backend will be available at:

```text
http://127.0.0.1:8000
```

---

## Frontend Setup

Open a new terminal.

Navigate to the frontend project.

```bash
cd visuallm_project
```

Install dependencies.

```bash
npm install
```

Start the development server.

```bash
npm run dev
```

The frontend will be available at:

```text
http://localhost:3000
```

---

# ▶ Running the Application

Run the frontend and backend simultaneously.

### Terminal 1

```bash
cd backend
.\env\Scripts\Activate.ps1
python manage.py runserver 8000
```

### Terminal 2

```bash
cd visuallm_project
npm run dev
```

Open your browser and visit:

```text
http://localhost:3000
```

---

# 🔌 API Endpoints

| Method   | Endpoint       | Description                                                                  |
| -------- | -------------- | ---------------------------------------------------------------------------- |
| **POST** | `/api/images/` | Upload image, generate AI response, save data, and create PDF report         |
| **POST** | `/api/vqa/`    | Perform Visual Question Answering without database storage or PDF generation |

---

# 📄 PDF Report

Each successful prediction generates a PDF report containing:

* Uploaded image
* User question
* AI-generated answer
* Timestamp (if implemented)

The generated PDF files are stored inside:

```text
backend/media/
```

---

# ⚠ Important Notes

* The frontend communicates with the backend at:

```text
http://127.0.0.1:8000
```

* During the first execution, Hugging Face models are automatically downloaded, so startup may take a few minutes.
* GPU acceleration is optional but recommended for faster inference.
* CPU inference works correctly but may be slower depending on hardware.
* For production deployment:

  * Use PostgreSQL or another production database.
  * Secure Django Secret Keys.
  * Restrict CORS origins.
  * Configure media and static file hosting properly.

---

# 🚀 Future Improvements

* User authentication and authorization
* Conversation history
* Multi-language support
* Image annotation capabilities
* Improved AI model accuracy
* Cloud storage integration
* Docker support
* CI/CD pipeline
* Production deployment on cloud platforms

---

# 🤝 Contributing

Contributions are welcome!

If you would like to improve this project:

1. Fork the repository.
2. Create a new feature branch.
3. Commit your changes.
4. Push to your branch.
5. Open a Pull Request.

---

# 📜 License

This project is intended for **educational, research, and development purposes**.

Feel free to use and modify it for learning and academic projects.

---

# 👨‍💻 Author

**Zarar Ahmad**

Bachelor of Science in Artificial Intelligence | AI & Machine Learning Enthusiast

**VisuaLLM** is an AI-powered Visual Question Answering (VQA) application developed by **Zarar Ahmad** using **Next.js**, **Django REST Framework**, **PyTorch**, and **Hugging Face Transformers**. The project demonstrates modern Vision-Language AI capabilities by enabling users to upload images, ask natural language questions, and receive intelligent AI-generated responses along with downloadable PDF reports.
