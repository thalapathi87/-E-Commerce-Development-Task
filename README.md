# 🛒 Abiz Timecraft

<p align="center">
  <img src="screenshots/01_home_page_1.png" alt="Abiz Timecraft Home Page" width="100%">
</p>

<h2 align="center">Full-Stack E-Commerce Web Application</h2>

<p align="center">
  A modern e-commerce platform with customer shopping, checkout, order tracking, and a complete admin management experience.
</p>

<p align="center">
  <b>Novoz Infinity — Full Stack Developer Intern Technical Evaluation Task</b>
</p>

---

## 📌 Project Overview

**Abiz Timecraft** is an e-commerce web application developed as a full-stack technical evaluation project.

The application covers the complete customer shopping journey:

**Home → Products → Product Selection → Cart → Checkout → Payment → Order Confirmation → My Orders**

It also provides an **Admin Panel** for product, category, inventory, and order management.

The project is designed around the functional areas requested in the Novoz Infinity technical task: customer-facing e-commerce features, authentication, product management, shopping cart, checkout and orders, admin operations, REST API/backend integration, database persistence, responsive UI, and documentation.

---

# ✨ Key Features

## 👤 Customer Features

- Responsive homepage
- Product catalogue
- Product search
- Category filtering
- Minimum and maximum price filtering
- Product sorting
- Stock filtering
- Product cards with pricing and stock information
- Add to cart
- Increase/decrease cart quantity
- Remove cart items
- Clear cart
- Automatic subtotal calculation
- Automatic total calculation
- Delivery address form
- Payment selection
- Cash on Delivery
- Mock online payment option
- Order placement
- Order confirmation
- Order details
- My Orders / order history
- User registration
- User login/logout
- Protected user functionality

## 👨‍💼 Admin Features

- Admin dashboard
- Product management
- Add product
- Edit product
- Delete product
- Product stock management
- Category management
- Add category
- Search categories
- Edit category
- Delete category
- Customer order management
- Order details
- Delivery information
- Order status management
- Pending / Confirmed / Shipped / Delivered workflow
- Low-stock product visibility
- Revenue and order overview

---

# 🧰 Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React.js |
| Styling | Tailwind CSS |
| Build Tool | Vite |
| Backend | Node.js / Express.js |
| API Communication | REST API |
| HTTP Client | Axios |
| Database | SQLite |
| Database Layer | Knex.js |
| Authentication | JWT |
| Version Control | Git / GitHub |

> **Database note:** The supplied Novoz Infinity task lists MongoDB/PostgreSQL as database options and says the application should preferably use the MERN stack. This implementation uses SQLite with Knex.js.

---

# 🏗️ Application Architecture

```text
                    ┌──────────────────────┐
                    │     React Frontend   │
                    │ React + Tailwind CSS │
                    │        + Vite        │
                    └──────────┬───────────┘
                               │
                               │ REST API
                               │ Axios
                               ▼
                    ┌──────────────────────┐
                    │   Node.js / Express  │
                    │                      │
                    │ Authentication       │
                    │ Products             │
                    │ Categories           │
                    │ Cart                 │
                    │ Orders               │
                    │ Admin                │
                    └──────────┬───────────┘
                               │
                               │ Knex.js
                               ▼
                    ┌──────────────────────┐
                    │      SQLite DB       │
                    │                      │
                    │ Users                │
                    │ Products             │
                    │ Categories           │
                    │ Cart                 │
                    │ Orders               │
                    └──────────────────────┘
```

---

# 🔄 Customer Application Flow

```text
Homepage
   ↓
Product Catalogue
   ↓
Search / Filter / Sort
   ↓
Product Selection
   ↓
Shopping Cart
   ↓
Checkout - Delivery Address
   ↓
Checkout - Payment
   ↓
Order Confirmation
   ↓
My Orders
```

# 🔄 Admin Application Flow

```text
Admin Login
   ↓
Admin Dashboard
   ├── Products
   │    ├── View
   │    ├── Add
   │    ├── Edit
   │    └── Delete
   │
   ├── Categories
   │    ├── Add
   │    ├── Search
   │    ├── Edit
   │    └── Delete
   │
   └── Orders
        ├── View
        ├── Details
        └── Status Update
```

---

# 📸 Complete Application Screenshots

> All screenshots are stored inside the repository `screenshots/` folder.  
> Every image below uses a relative GitHub path, so the README will render the screenshots directly on GitHub.

---

## 1. 🏠 Home Page

The homepage introduces the store, highlights the shopping experience, displays trust/quality information, and presents featured products.

<p align="center">
  <img src="screenshots/01_home_page_1.png" alt="Home Page - Main" width="100%">
</p>

<p align="center">
  <img src="screenshots/01_home_page_2.png" alt="Home Page - Featured Products and Footer" width="100%">
</p>

---

## 2. 🛍️ Product Catalogue

The product catalogue provides search, category filtering, price filtering, sorting, stock filtering, pagination, product cards, pricing, stock status, and add-to-cart actions.

<p align="center">
  <img src="screenshots/02_products_page_1.png" alt="Product Catalogue - Page 1" width="100%">
</p>

<p align="center">
  <img src="screenshots/02_products_page_2.png" alt="Product Catalogue - Page 2" width="100%">
</p>

<p align="center">
  <img src="screenshots/02_products_page_3.png" alt="Product Catalogue - Page 3" width="100%">
</p>

---

## 3. 🛒 Shopping Cart

The shopping cart displays selected products, quantities, prices, stock status, subtotal, shipping, total amount, remove actions, and checkout navigation.

<p align="center">
  <img src="screenshots/03_cart.png" alt="Shopping Cart" width="100%">
</p>

---

## 4. 📍 Checkout - Delivery Address

The first checkout step collects customer and delivery information.

Fields include:

- Full name
- Email
- Phone number
- Delivery address
- City
- State
- Pincode

<p align="center">
  <img src="screenshots/04_checkout_address.png" alt="Checkout Delivery Address" width="100%">
</p>

---

## 5. 💳 Checkout - Payment

The second checkout step provides payment method selection and displays the order summary.

Available flow shown in the application:

- Cash on Delivery
- Mock Online Payment
- Place Order
- Back to Address

<p align="center">
  <img src="screenshots/05_checkout_payment.png" alt="Checkout Payment" width="100%">
</p>

---

## 6. ✅ Order Confirmation

The confirmation screen shows:

- Order ID
- Total amount
- Payment method
- Payment status
- Order status
- Order date
- View Order Details
- View My Orders
- Continue Shopping

<p align="center">
  <img src="screenshots/06_checkout_confirmation.png" alt="Order Confirmation" width="100%">
</p>

---

## 7. 📋 My Orders

The My Orders page provides a customer-facing order history with order ID, date, item count, order total, payment method, status, and order details navigation.

<p align="center">
  <img src="screenshots/07_my_orders.png" alt="My Orders" width="100%">
</p>

---

# 👨‍💼 ADMIN PANEL

## 8. 📊 Admin Dashboard

The dashboard provides store-management statistics including:

- Total products
- Total categories
- Total orders
- Total users
- Total revenue
- Pending orders
- Confirmed orders
- Shipped orders
- Delivered orders
- Recent orders
- Low-stock products

<p align="center">
  <img src="screenshots/08_admin_dashboard.png" alt="Admin Dashboard" width="100%">
</p>

---

## 9. 📦 Admin Product Management

The admin product page provides:

- Product search
- Category filtering
- Product listing
- Category information
- Price
- Stock status
- Edit action
- Delete action

<p align="center">
  <img src="screenshots/09_admin_products_page_1.png" alt="Admin Products - Page 1" width="100%">
</p>

<p align="center">
  <img src="screenshots/09_admin_products_page_2.png" alt="Admin Products - Page 2" width="100%">
</p>

<p align="center">
  <img src="screenshots/09_admin_products_page_3.png" alt="Admin Products - Page 3" width="100%">
</p>

---

## 10. ➕ Add Product

The Add Product screen allows an administrator to create a product using:

- Product name
- Description
- Price
- Stock
- Category
- Image URL

<p align="center">
  <img src="screenshots/10_admin_add_product.png" alt="Admin Add Product" width="100%">
</p>

---

## 11. 🗂️ Admin Category Management

The category management screen provides:

- Add category
- Search categories
- Category listing
- Edit category
- Delete category

<p align="center">
  <img src="screenshots/11_admin_categories_page_1.png" alt="Admin Categories - Page 1" width="100%">
</p>

<p align="center">
  <img src="screenshots/11_admin_categories_page_2.png" alt="Admin Categories - Page 2" width="100%">
</p>

---

## 12. 🧾 Admin Order Management

The admin orders page provides customer order management with:

- Order ID
- Customer information
- Delivery address
- Ordered products
- Price
- Quantity
- Item total
- Order total
- Order status
- Status update control

<p align="center">
  <img src="screenshots/12_admin_orders_page_1.png" alt="Admin Orders - Page 1" width="100%">
</p>

<p align="center">
  <img src="screenshots/12_admin_orders_page_2.png" alt="Admin Orders - Page 2" width="100%">
</p>

<p align="center">
  <img src="screenshots/12_admin_orders_page_3.png" alt="Admin Orders - Page 3" width="100%">
</p>

<p align="center">
  <img src="screenshots/12_admin_orders_page_4.png" alt="Admin Orders - Page 4" width="100%">
</p>

<p align="center">
  <img src="screenshots/12_admin_orders_page_5.png" alt="Admin Orders - Page 5" width="100%">
</p>

---

## 13. 📝 User Registration

The registration page provides:

- Full name
- Email
- Password
- Confirm password
- Account creation
- Login navigation

<p align="center">
  <img src="screenshots/13_register.png" alt="User Registration" width="100%">
</p>

---

# 🔐 Authentication & Authorization

The application includes authentication and protected functionality.

### Authentication flow

```text
Register
   ↓
Login
   ↓
JWT Authentication
   ↓
Authenticated User
   ↓
Protected Features
```

### Admin authorization

```text
Login
  ↓
Role Check
  ↓
Admin
  ↓
Admin Dashboard
  ↓
Products / Categories / Orders
```

Security-related implementation areas include:

- JWT authentication
- Protected routes
- Authorization checks
- Password protection
- Environment-based configuration
- Input validation
- API error handling

---

# 🛒 Shopping Cart Logic

The cart supports:

```text
Add Product
     ↓
Cart Persistence
     ↓
Quantity + / -
     ↓
Item Subtotal
     ↓
Cart Subtotal
     ↓
Shipping
     ↓
Final Total
```

The interface also handles stock availability and product removal.

---

# 📦 Order Management

The order lifecycle follows the administrative status model:

```text
Pending
   ↓
Confirmed
   ↓
Shipped
   ↓
Delivered
```

The admin can view customer details, delivery details, products, quantities, prices, and totals while managing the order status.

---

# 🗄️ Database Entities

The application works with the core e-commerce entities:

```text
Users
 ├── Cart
 └── Orders

Products
 └── Categories

Orders
 └── Order Items
```

Core data areas:

- Users
- Products
- Categories
- Cart
- Orders

---

# 🔌 REST API Modules

The backend is organized around the major application domains:

| Module | Responsibility |
|---|---|
| Authentication | Registration, login, authentication |
| Users | User-related operations |
| Products | Product CRUD and inventory |
| Categories | Category operations |
| Cart | Cart and quantity operations |
| Orders | Order creation and order history |
| Admin | Protected admin operations |

---

# 📁 Recommended Repository Structure

```text
Abiz-Timecraft/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── context/
│   │   └── ...
│   ├── public/
│   └── package.json
│
├── server/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── services/
│   ├── database/
│   └── ...
│
├── screenshots/
│   ├── 01_home_page_1.png
│   ├── 01_home_page_2.png
│   ├── 02_products_page_1.png
│   ├── ...
│   └── 13_register.png
│
├── .gitignore
└── README.md
```

---

# 🚀 Installation & Setup

## 1. Clone

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd <YOUR_PROJECT_FOLDER>
```

## 2. Install Backend Dependencies

```bash
cd server
npm install
```

## 3. Install Frontend Dependencies

```bash
cd ../client
npm install
```

## 4. Configure Environment Variables

Create the required `.env` files based on the project's backend/frontend configuration.

Example:

```env
PORT=3000
JWT_SECRET=your_secure_secret
```

Never commit real secrets to GitHub.

## 5. Database Setup

If migrations are configured through Knex:

```bash
npx knex migrate:latest
```

Seed sample data when available:

```bash
npm run seed
```

## 6. Start Backend

```bash
npm run dev
```

## 7. Start Frontend

```bash
cd client
npm run dev
```

Then open the local Vite URL displayed in the terminal.

---

# 🌐 Deployment

### Live Application

`<YOUR_DEPLOYED_FRONTEND_URL>`

### Backend API

`<YOUR_DEPLOYED_BACKEND_URL>`

### GitHub Repository

`<YOUR_GITHUB_REPOSITORY_URL>`

Before submission, verify that:

- Frontend is accessible
- Backend/API is accessible
- Database connection works
- Authentication works
- Products load dynamically
- Cart works
- Checkout works
- Orders are created
- Admin panel works

---

# 🧪 Test Credentials

Use dedicated evaluation accounts.

### Customer

```text
Email: <USER_TEST_EMAIL>
Password: <USER_TEST_PASSWORD>
```

### Admin

```text
Email: <ADMIN_TEST_EMAIL>
Password: <ADMIN_TEST_PASSWORD>
```

> Replace these placeholders with the actual test credentials before submitting the repository.

---

# ⚠️ Known Limitations

- Payment currently uses the application's mock checkout/payment flow rather than a live payment gateway.
- Product images are handled through image URLs in the product creation interface.
- Replace the deployment and credential placeholders before final submission.

The Novoz Infinity task explicitly allows a mock payment/checkout flow, so a real payment gateway is not mandatory for the core task.

---

# 🔮 Future Improvements

Possible production-level enhancements:

- Real payment gateway
- Wishlist
- Product reviews and ratings
- Coupons and discounts
- Order tracking
- Email notifications
- Image upload service
- Advanced search
- Product recommendations
- Analytics dashboard
- Automated testing
- Docker
- CI/CD

---

# 📋 Novoz Infinity Task Coverage

| Requirement | Status |
|---|:---:|
| Homepage | ✅ |
| Navigation | ✅ |
| Product listing | ✅ |
| Product categories | ✅ |
| Product search | ✅ |
| Filtering / sorting | ✅ |
| Product details flow | ✅ |
| Shopping cart | ✅ |
| Checkout | ✅ |
| User registration | ✅ |
| User login/logout | ✅ |
| Responsive UI | ✅ |
| Authentication | ✅ |
| Protected functionality | ✅ |
| Product management | ✅ |
| Stock management | ✅ |
| Category management | ✅ |
| Order management | ✅ |
| Order status updates | ✅ |
| REST API modules | ✅ |
| Database persistence | ✅ |
| Admin panel | ✅ |
| README documentation | ✅ |

---

# 📊 Evaluation Criteria

The provided Novoz Infinity task evaluates the application using:

| Category | Weight |
|---|---:|
| Frontend & UI/UX | 15% |
| Functionality | 25% |
| Backend & API Development | 20% |
| Database Design | 10% |
| Code Quality & Architecture | 15% |
| Deployment | 10% |
| Documentation | 5% |
| **Total** | **100%** |

---

# 👨‍💻 Developer

**Thalapathi**

**Focus:** Full-Stack Development • React Development • REST APIs • E-Commerce Applications

---

# 📄 Technical Task Reference

**Organization:** NOVOZ INFINITY  
**Task:** Full Stack Developer Intern — Technical Evaluation Task  
**Project Type:** E-Commerce Platform Development

The task requires a functional e-commerce application, authentication, dynamic product management, cart, checkout/order flow, admin panel, backend APIs, database integration, responsive frontend, deployment, GitHub repository, and README documentation.

---

<div align="center">

## ⭐ Abiz Timecraft

### From product discovery to order management.

**Built with React, Tailwind CSS, Node.js, Express.js and SQLite.**

</div>
