# User Management Dashboard

![React](https://img.shields.io/badge/React-17.0.2-blue)  
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)  
![License](https://img.shields.io/badge/license-MIT-green)  
![Status](https://img.shields.io/badge/status-completed-brightgreen)  

A modern, responsive, and fully functional **User Management Dashboard** built with **React.js**. The dashboard allows admins to manage users efficiently with features like adding, editing, deleting, searching, and filtering users.

---

## 📋 Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Project Structure](#project-structure)  
- [Usage](#usage)  
- [Screenshots](#screenshots)  
- [Contributing](#contributing)
- [Getting Started](#getting-started)    
- [License](#license)  
- [Contact](#contact)  

---

## ✨ Features

- Fully responsive dashboard for desktop and mobile  
- Add, edit, delete users  
- Search and filter users  
- Clean, modern, and user-friendly UI  
- Integration with backend for persistent data  
- Optional authentication (can be added)  

---

## 🛠 Tech Stack

**Frontend:**  
- React.js  
- CSS3 / SCSS / Tailwind CSS (optional)  
- React Router  

**Backend:**  
- Java (Spring Boot optional) or Node.js (if applicable)  
- SQL Database (MySQL/PostgreSQL/SQLite)  

**Tools & Utilities:**  
- VS Code  
- Git & GitHub  
- npm / yarn  

---

## 🗂 Project Structure
user-management-dashboard/
├── public/
│ └── index.html
├── src/
│ ├── components/
│ │ ├── FilterPopup.jsx
│ │ ├── Loader.jsx
│ │ ├── UserForm.jsx
| | └── UserList.jsx
│ ├── api/
│ │ ├── userApi.js
│ ├── App.js
│ ├── App.css
│ └── index.js
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js
└── README.md

---
## Demo Screenshots
![User Management DashBoard](<Screenshot 2025-09-21 130316.png>)
![Add User Screenshot](<Screenshot 2025-09-21 130424.png>)
![Delete Screenshot](<Screenshot 2025-09-21 130443.png>)
![Search Screenshot](<Screenshot 2025-09-21 130509.png>)
![Filter Screenshot](<Screenshot 2025-09-21 130335.png>)
---
## ⚠️ Challenges Faced

Setting up Tailwind CSS with React

Configuring tailwind.config.js and PostCSS properly.

Ensuring Tailwind classes worked in .jsx files.

Component Structure & State Management

Managing state across multiple components (UserForm, UserList, FilterPopup).

Avoiding prop drilling and unnecessary re-renders.

API Integration

Handling CRUD operations in userApi.js.

Displaying loaders during async requests.

Handling API errors gracefully.

Form Handling & Validation

Validating inputs in UserForm.

Updating the user list dynamically after changes.

Filter & Search Functionality

Implementing dynamic filtering and search.

Updating the list efficiently without reloading.

Responsive Design

Ensuring proper layout for mobile and desktop using Tailwind.

Debugging & Linting

Resolving React warnings and layout issues.

Project Structure & Organization

Keeping components and API code organized for maintainability.
## 🚀 Getting Started

### Prerequisites

Make sure you have **Node.js** and **npm** installed. Check your versions:

```bash

node -v
npm -v
---

## 🚀 Installation

1. **Clone the repository**

```bash
git clone https://github.com/Vijaykishore59/UserManagementDashBoard
cd user-management-dashboard
npm install
npm start
