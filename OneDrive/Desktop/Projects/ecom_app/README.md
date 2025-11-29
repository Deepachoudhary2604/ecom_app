# 🛍️ EcoMart - E-Commerce Application

एक सुंदर और feature-rich e-commerce application जिसमें authentication, authorization, और product management है।

## ✨ Features

### 🔐 Authentication & Authorization
- **User Registration (Sign Up)** - नया अकाउंट बनाएं
- **User Login** - अपने अकाउंट में लॉगिन करें
- **Password Hashing** - Bcryptjs के साथ सुरक्षित passwords
- **Role-Based Access Control** - Admin और User roles
- **Secure Sessions** - Express-session के साथ

### 📦 Product Management (Admin Only)
- ➕ नए products add करें
- ✏️ Products edit करें
- 🗑️ Products delete करें
- 📊 Products की detailed जानकारी देखें

### 🎨 Beautiful UI/UX
- Responsive design Bootstrap 5 के साथ
- Smooth animations और transitions
- Mobile-friendly interface
- Professional color scheme

## 🚀 Installation

### Prerequisites
- Node.js (v14 या उससे नया)
- MongoDB (local या cloud)
- npm या yarn

### Setup Steps

1. **Clone या Download करें**
   ```bash
   cd ecom_app
   ```

2. **Dependencies Install करें**
   ```bash
   npm install
   ```

3. **MongoDB Connect करें**
   - सुनिश्चित करें कि MongoDB `mongodb://127.0.0.1:27017/ecom` पर चल रहा है
   - या अपना connection string `app.js` में update करें

4. **Server Start करें**
   ```bash
   npm start
   ```
   या nodemon के साथ:
   ```bash
   npx nodemon app.js
   ```

5. **Browser में खोलें**
   ```
   http://localhost:8080
   ```

## 📚 Project Structure

```
ecom_app/
├── models/
│   ├── Product.js          # Product model
│   ├── Review.js           # Review model
│   └── User.js             # User model (auth के साथ)
├── route/
│   ├── auth.js             # Auth routes (signup, login, logout)
│   ├── product.js          # Product routes (CRUD)
│   └── review.js           # Review routes
├── views/
│   ├── auth/
│   │   ├── login.ejs       # Login page
│   │   └── signup.ejs      # Sign up page
│   ├── products/
│   │   ├── index.ejs       # Products listing
│   │   ├── new.ejs         # Add new product
│   │   ├── edit.ejs        # Edit product
│   │   └── show.ejs        # Product details
│   ├── partials/
│   │   ├── navbar.ejs      # Navigation bar
│   │   └── flash.ejs       # Flash messages
│   └── layouts/
│       └── boilerplate.ejs # Main layout
├── public/                 # Static files (CSS, JS, images)
├── app.js                  # Main server file
├── middleware.js           # Custom middleware
├── package.json            # Dependencies
└── README.md              # This file
```

## 👤 Demo Account

Login करने के लिए demo credentials का उपयोग करें:

- **Username:** `admin`
- **Password:** `admin123`
- **Role:** Admin (Products add, edit, delete कर सकते हैं)

## 🔑 Key Features Explained

### Authentication Flow
1. User signup करता है → Password hash होता है → User save होता है
2. User login करता है → Passport.js से authenticate होता है → Session create होता है
3. Logout → Session destroy होता है

### Authorization
- **Public Routes**: `/products` (सभी देख सकते हैं)
- **Auth Required**: `/products/new`, `/products/:id/edit`, `/products/:id/delete`
- **Admin Only**: Product add, edit, delete operations

## 🔧 Technologies Used

- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Authentication:** Passport.js, Bcryptjs
- **Frontend:** EJS, Bootstrap 5
- **Session Management:** Express-session
- **Validation:** Joi
- **Other:** Method-override, Connect-flash

## 🎯 Future Improvements

- [ ] Product search और filter functionality
- [ ] Shopping cart और checkout
- [ ] Payment integration (Stripe/Razorpay)
- [ ] User profile page
- [ ] Product reviews और ratings
- [ ] Email verification
- [ ] Two-factor authentication
- [ ] Admin dashboard

## 📝 API Routes

### Auth Routes
- `GET /signup` - Sign up page
- `POST /signup` - Create new user
- `GET /login` - Login page
- `POST /login` - Authenticate user
- `GET /logout` - Logout user

### Product Routes
- `GET /products` - सभी products देखें
- `GET /products/new` - नया product add करने का form (Admin only)
- `POST /products` - नया product create करें (Admin only)
- `GET /products/:id` - एक product की details देखें
- `GET /products/:id/edit` - Product edit करने का form (Admin only)
- `PATCH /products/:id` - Product update करें (Admin only)
- `DELETE /products/:id` - Product delete करें (Admin only)

## 🐛 Troubleshooting

### MongoDB Connection Error
- MongoDB service चल रहा है check करें
- Connection string सही है check करें
- Port 27017 available है check करें

### Packages Install Error
```bash
npm install --force
npm cache clean --force
```

### Session Issues
- Browser cookies enable हैं check करें
- Secret key को `.env` file में move करें production के लिए

## 📄 License

ISC License

## 🤝 Support

किसी भी समस्या के लिए issues open करें या repository को star दें!

---

**Happy Coding! 🚀**
