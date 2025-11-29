# 🚀 Quick Start Guide

## शुरुआत करने के लिए

### 1️⃣ Dependencies Install करें
```bash
npm install
```

### 2️⃣ MongoDB चलाएं
सुनिश्चित करें कि MongoDB running है:
```bash
# Windows के लिए
net start MongoDB
```

### 3️⃣ Database Seed करें (Optional)
`app.js` में uncomment करें:
```javascript
// seedDB();  // को हटाएं comment से
```

फिर server start करें एक बार, फिर फिर से comment कर दें।

### 4️⃣ Server Start करें
```bash
npm start
```
या development के लिए:
```bash
npx nodemon app.js
```

### 5️⃣ Browser में खोलें
```
http://localhost:8080
```

---

## 🔐 Login करें

### Admin Account
- **Username:** admin
- **Password:** admin123
- **Role:** Admin - Products add/edit/delete कर सकते हैं

### Regular User Account
- **Username:** user
- **Password:** user123
- **Role:** User - केवल products देख सकते हैं

---

## 📝 कुछ महत्वपूर्ण बातें

✅ **नए Features:**
- 🔐 Authentication with Bcrypt password hashing
- 👥 Role-based authorization (Admin/User)
- 🎨 Beautiful responsive UI
- 💾 MongoDB database
- ⚡ Express.js backend

✅ **Security:**
- Passwords encrypted
- Session management
- Role-based access control
- Flash messages for errors

---

## 🔧 Troubleshooting

### Issue: Cannot connect to MongoDB
**Solution:** MongoDB service started है check करें
```bash
# Windows
Get-Service MongoDB
```

### Issue: Port 8080 already in use
**Solution:** दूसरा port use करें app.js में:
```javascript
app.listen(8081, ...);  // port 8081 पर चलेगा
```

### Issue: npm install error
**Solution:** Cache clear करें
```bash
npm cache clean --force
npm install
```

---

## 📚 Routes Overview

| Method | Route | Auth | Access |
|--------|-------|------|--------|
| GET | /products | ❌ | All |
| GET | /signup | ❌ | All |
| POST | /signup | ❌ | All |
| GET | /login | ❌ | All |
| POST | /login | ❌ | All |
| GET | /logout | ✅ | Authenticated |
| GET | /products/new | ✅ | Admin Only |
| POST | /products | ✅ | Admin Only |
| GET | /products/:id/edit | ✅ | Admin Only |
| PATCH | /products/:id | ✅ | Admin Only |
| DELETE | /products/:id | ✅ | Admin Only |

---

**अब आप ready हैं! Happy coding! 🎉**
