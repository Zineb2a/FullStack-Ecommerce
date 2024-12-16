# Aura: Artisanal Handcrafted Products

Aura is a full-stack e-commerce platform that showcases and manages artisanal handcrafted products such as soaps, candles and more. The application is divided into three components:
- **User Storefront**: A customer-facing platform to browse and purchase products and track orders.
- **Admin Panel**: A management dashboard for product and order administration.
- **Backend API**: A server-side API to handle data operations.
<img width="1483" alt="Screenshot 2024-12-16 at 15 16 25" src="https://github.com/user-attachments/assets/739d04ee-5ef7-4629-8c51-74263f85db94" />

---

## **Live Deployment**

The application is fully deployed and ready to use:

- **Frontend Store**: [Visit Storefront](https://aura-roan.vercel.app)  

To test the platform:
1. Create a user account on the storefront.
---

## **Technologies Used**

### **Frontend (User Storefront and Admin Panel)**

- **React**
- **Vite**
- **TailwindCSS**
- **React Router**
- **Axios**: For API communication.
- **React Toastify**: For notifications.

### **Backend**

- **Node.js**
- **Express**
- **MongoDB**
- **Mongoose**
- **Cloudinary**: Image storage and management.
- **JWT (JSON Web Tokens)**: Secure authentication.
- **Bcrypt**: For password hashing.

---

## **Project Overview**

### **User Storefront**
- **Homepage**: Browse bestsellers and subscribe to newsletters.
- **Catalog**: Filter and sort products by category, type, or price.
- **Product Details**: View detailed descriptions and add items to the cart.
- **Checkout**: Seamless cart and checkout experience.
- **Profile Management**: Update user details and track orders.

### **Admin Panel**
- **Product Management**: Add, update, and remove products with image uploads.
- **Order Management**: View and update order statuses.


### **Backend API**
- **Authentication**: Secure login and registration using JWT.
- **Product Management**: Endpoints for CRUD operations on products.
- **Order Handling**: Manage customer orders and statuses.
- **Cart Management**: Add, update, or remove items in the cart.

---

## **Setting Up Locally**

### **Step 1: Clone the Repository**
```bash
git clone <repository-url>
cd <repository-folder>
```

### **Step 2: Install Dependencies**

Install dependencies for all three components:
```bash
cd backend
npm install
cd ../frontend
npm install
cd ../admin
npm install
```

### **Step 3: Set Environment Variables**

Create `.env` files for each folder with the following:

#### Backend (`backend/.env`):
```env
PORT=4000
MONGO_URI=<Your MongoDB Connection String>
JWT_SECRET=<Your Secret Key>
CLOUDINARY_NAME=<Your Cloudinary Name>
CLOUDINARY_API_KEY=<Your Cloudinary API Key>
CLOUDINARY_API_SECRET=<Your Cloudinary API Secret>
```

#### Frontend (`frontend/.env`) and Admin (`admin/.env`):
```env
VITE_BACKEND_URL=http://localhost:4000/api
```

### **Step 4: Run the Applications**

- **Backend**:
  ```bash
  cd backend
  npm run dev
  ```

- **Frontend**:
  ```bash
  cd frontend
  npm run dev
  ```

- **Admin Panel**:
  ```bash
  cd admin
  npm run dev
  ```

### **Step 5: Access the Applications**
- Frontend: `http://localhost:5173`
- Admin Panel: `http://localhost:5174`
- Backend API: `http://localhost:4000/api`

