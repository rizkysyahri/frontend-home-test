# Home Test Frontend Web Developer

## Overview

This project is a web application for article management with role-based access control for **User** and **Admin**. The application supports authentication, authorization, and various features tailored for each role, such as article listing, category management, and CRUD operations. The UI is responsive across mobile, tablet, and desktop devices, and the application is integrated with the provided API.

The project is built using modern web technologies, follows best practices for code structure and readability, and includes error handling, loading states, and success messages to enhance user experience.

---

## Features

### 1. User Role
#### Authentication
- **Login**: Form with validation using Zod and React Hook Form.
- **Register**: Form with validation using Zod and React Hook Form.
- **Redirect**: After successful login/register, redirect to the article list page.
- **Logout**: Redirect to the login page upon logout.

#### Article List
- **Filter**: Filter articles by category using a dropdown.
- **Search**: Search articles with a debounce of 400ms.
- **Pagination**: Display pagination if there are more than 9 items.

#### Article Detail
- **Detail View**: Display the full content of the selected article.
- **Other Articles**: Show up to 3 articles from the same category as the viewed article.

### 2. Admin Role
#### Authentication
- Same as User role (login, register, redirect, logout).

#### Category List
- **Search**: Search categories with a debounce of 400ms.
- **Pagination**: Display pagination if there are more than 10 items.

#### Create Category
- Form with validation using Zod and React Hook Form.

#### Edit Category
- Form with validation using Zod and React Hook Form.

#### Article List
- **Filter**: Filter articles by category.
- **Search**: Search articles with a debounce of 400ms.
- **Pagination**: Display pagination if there are more than 10 items.

#### Create Article
- Form with validation using Zod and React Hook Form.
- Preview feature before submission (fetches API to render preview).

#### Edit Article
- Form with validation using Zod and React Hook Form.
- Preview feature before submission (fetches API to render preview).

---

## Technologies Used
- **Framework**: Next.js (App Router, SSR, and CSR)
- **Styling**: Tailwind CSS with Shadcn/ui components
- **API Fetching**: Axios
- **Icons**: Lucide
- **Form Validation**: Zod + React Hook Form
- **State Management**: Zustand (with persistence for auth and article/category state)
- **Data Fetching**: React Query (TanStack Query) for caching and API management
- **Toast Notifications**: React Toastify for success/error messages
- **Version Control**: Git and GitHub (Git flow implemented)

---

## Project Setup and Installation

### Prerequisites
- Node.js (v18 or later)
- Git
- A package manager (npm, yarn, or pnpm)

### Steps to Run Locally
1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

4. **Run the Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```
   Open `http://localhost:3000` in your browser to view the application.

5. **Build for Production**
   ```bash
   npm run build
   npm run start
   ```

---

- **Authentication**:
  - `POST /auth/login` - User/Admin login
  - `POST /auth/register` - User/Admin registration
- **Articles**:
  - `GET /articles` - Fetch articles (supports `page`, `limit`, `categoryId`, `search`)
  - `GET /articles/:id` - Fetch article detail
  - `POST /articles` - Create article (Admin)
  - `PUT /articles/:id` - Update article (Admin)
- **Categories**:
  - `GET /categories` - Fetch categories (supports `page`, `limit`, `search`)
  - `POST /categories` - Create category (Admin)
  - `PUT /categories/:id` - Update category (Admin)
