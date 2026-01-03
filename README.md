# 🌸 Flower Online Shop

A full-featured **Flower Online Shop Web Application** built using **TypeScript, Node.js, Express.js, MongoDB, EJS, HTML, and CSS**.
This project demonstrates a complete server‑rendered e‑commerce system with **visitor, user, and admin roles**, image uploads, authentication, cart, and order management.

---

## 🚀 Project Overview

The Flower Online Shop allows users to browse products across multiple categories such as **Clothes, Bags, and Books**. Visitors can explore products without an account, while registered users can manage their cart and place orders. Admin users have full control over products and orders.

The application follows clean architecture principles with clear separation between **controllers, routes, models, middleware, and views**.

---

## 👤 User Roles

### 🔓 Visitor (No Account)

* View home page
* Browse products by category
* View product details

### 👤 User

* Sign up and log in
* Add products to cart
* Place orders
* View orders

### 🛠️ Admin

* Add and delete products
* Upload product images using **Cloudinary**
* Manage and update orders

---

## 🛒 Pages & Views (EJS)

* Home Page
* Products by Category
* Product Details Page
* Cart Page
* Order Page
* Login Page
* Signup Page
* Admin Dashboard

  * Add Product Page
  * Manage Orders Page

All pages are rendered on the server using **EJS templates** with **HTML & CSS**.

---

## 🧰 Tech Stack

### Backend

* Node.js
* Express.js
* TypeScript
* MongoDB (Mongoose)

### Frontend

* EJS (Embedded JavaScript Templates)
* HTML5
* CSS3

### Other Tools & Libraries

* Cloudinary (Image Upload & Storage)
* Session-based Authentication
* express-validator (Input validation)

---

## 📂 Project Structure

```
online-shop/
├── assets/
├── dist/
├── images/
├── node_modules/
│
├── src/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── types/
│   ├── utils/
│   └── app.ts
│
├── views/
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── tsconfig.json
```

---

## 🔐 Authentication & Authorization

* Secure authentication using **sessions**
* Protected routes using middleware
* Role-based authorization for admin and user routes

---

## 🖼️ Image Uploads

* Product images are uploaded and stored using **Cloudinary**
* Image URLs are saved in the database and rendered in views

---

## ⚙️ Environment Variables

Create a `.env` file in the project root:

```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

---

## ▶️ Getting Started

### 1️⃣ Install Dependencies

```bash
npm install
```

### 2️⃣ Run in Development Mode

```bash
npm run dev
```

### 3️⃣ Build for Production

```bash
npm run build
npm start
```

---

## 🧪 Testing

* Manual testing through browser
* Authentication, cart, orders, and admin flows tested

---

## 🎥 Demo Video

A demo video showcasing:

* Product browsing as a visitor
* User signup and login
* Cart and order workflow
* Admin product and order management

📌 https://drive.google.com/drive/folders/1xDLYqe7yu1TF90zaKFN5sYWp0XvTzaiY?usp=drive_link

---

## 📌 Future Enhancements

* Online payment gateway integration
* Product reviews and ratings
* Wishlist functionality
* Improved UI/UX design

---

## 👨‍💻 Author

**Nehal Nabel**
Backend / Full‑Stack Developer
Node.js • TypeScript • Express • MongoDB

---

## 📄 License

This project is developed for educational and portfolio purposes.

