# 🚀 HealthGov Frontend - Quick Start Guide

## ✅ What's Ready

Your HealthGov frontend has been **fully configured** with:

1. ✅ **JWT Token Authentication** - Automatic token validation & persistence
2. ✅ **Role-Based Access Control** - Admin vs Citizen dashboards  
3. ✅ **Admin Panel** - Complete user management system
4. ✅ **Protected Routes** - Automatic redirects for unauthorized access
5. ✅ **Responsive Design** - Works on mobile, tablet, desktop

---

## 🎯 Start Development

### Step 1: Start the server
```bash
npm run dev
```

### Step 2: Open browser
```
http://localhost:5173
```

### Step 3: Go to login
```
http://localhost:5173/login
```

---

## 🔑 Login & Test

### For Admin Users
```
1. Enter admin credentials
2. Click Login
3. Should see Admin Dashboard with:
   - Users menu
   - Add User menu
   - Analytics menu
   - User management table
```

### For Citizen Users
```
1. Enter citizen credentials
2. Click Login
3. Should see Citizen Dashboard with:
   - Health records card
   - Appointments card
   - Notifications card
```

---

## 📱 Features You Can Test

### Authentication
- [ ] Login with email & password
- [ ] Session persists after page refresh
- [ ] Logout clears session
- [ ] Invalid credentials show error

### Admin Features
- [ ] View all users in table
- [ ] Search users by name/email
- [ ] Filter by role (Admin/Citizen)
- [ ] Add new user
- [ ] Delete user with confirmation
- [ ] View analytics dashboard

### Security
- [ ] Token stored in localStorage
- [ ] Token sent with every API request
- [ ] Invalid token auto-logs out
- [ ] Non-admin users can't access /admin
- [ ] Protected routes redirect properly

---

## 📂 Project Structure

```
NEW FILES ADDED:

Authentication:
  ✅ src/context/AuthContext.jsx
  ✅ src/components/ProtectedRoute.jsx
  ✅ src/pages/auth/ForgotPassword.jsx

Dashboard:
  ✅ src/components/Sidebar.jsx
  ✅ src/layouts/DashboardLayout.jsx
  ✅ src/pages/dashboard/CitizenDashboard.jsx
  ✅ src/pages/dashboard/AdminDashboard.jsx

Admin Panel:
  ✅ src/pages/admin/Users.jsx
  ✅ src/pages/admin/AddUser.jsx
  ✅ src/pages/admin/Analytics.jsx

UPDATED FILES:
  ✅ src/App.jsx
  ✅ src/main.jsx
  ✅ src/pages/auth/Login.jsx
  ✅ src/pages/auth/Register.jsx
  ✅ src/api/axios.js (has token interceptor)
```

---

## 🔐 How Token Validation Works

### 1️⃣ Login
```
User enters credentials → 
API returns token → 
Token saved to localStorage
```

### 2️⃣ Token Storage
```
Key: 'token'
Location: browser localStorage
Persists: Yes (survives page refresh)
```

### 3️⃣ Every API Call
```
Axios sees token in localStorage → 
Adds Authorization header → 
Backend validates token → 
Returns data
```

### 4️⃣ On Page Load
```
App loads → 
Check localStorage for token → 
If valid: parse JWT, extract role → 
If invalid: clear token, redirect to login
```

---

## 🎮 User Flows

### Login Flow
```
/login → Enter credentials → POST /healthGov/login → 
Get token → Save to localStorage → 
Decode JWT → Extract role → 
Redirect to /dashboard → 
App checks role → 
Show admin or citizen dashboard
```

### Logout Flow
```
Click Logout → 
Clear localStorage → 
Set user to null → 
Redirect to /login
```

### Protected Route Flow
```
Access /admin/users → 
ProtectedRoute checks role → 
If ADMIN: show page → 
If CITIZEN: redirect to /dashboard
```

---

## 🧪 Quick Tests

### Test 1: Token Persistence
```
1. Login
2. Press F12 → Application → Storage → localStorage
3. Look for 'token' key
4. Refresh page
5. Token should still be there
6. You should still be logged in
```

### Test 2: Role Detection
```
1. Login as ADMIN
2. Should see /admin/users in sidebar
3. Click on it - works ✓
4. Login as CITIZEN
5. Should NOT see admin items
6. Try accessing /admin/users directly
7. Should redirect to /dashboard
```

### Test 3: Token in Requests
```
1. F12 → Network tab
2. Login and do any action
3. Click any API request
4. Go to Headers
5. Look for Authorization: Bearer {token}
```

---

## 🌐 API Routes

### Authentication
- `POST /healthGov/login` - Login
- `POST /healthGov/citizenRegister` - Register as citizen
- `POST /healthGov/forgotPassword/otp` - Request password reset

### User Management (Admin Only)
- `GET /healthGov/getAllCitizens` - List all users
- `POST /healthGov/userRegisterByAdmin` - Create user
- `DELETE /healthGov/deleteUserByAdmin/{id}` - Delete user
- `GET /healthGov/getUserByRole/{role}` - Filter by role

---

## ⚙️ Configuration

### Change Backend URL
Edit `src/api/axios.js`:
```javascript
const API = axios.create({
  baseURL: 'http://localhost:8080', // Change this
});
```

### Add Custom Validation
Edit `src/context/AuthContext.jsx`:
```javascript
// Add custom token validation logic
```

---

## 📋 File Reference

| File | Purpose |
|------|---------|
| `AuthContext.jsx` | JWT management & user state |
| `ProtectedRoute.jsx` | Route protection with role checking |
| `Sidebar.jsx` | Navigation based on role |
| `DashboardLayout.jsx` | Main dashboard container |
| `Users.jsx` | User management page |
| `AddUser.jsx` | Create new user form |
| `Analytics.jsx` | System metrics dashboard |
| `axios.js` | API client with token interceptor |

---

## 🔍 Debugging Tips

### Check localStorage
```javascript
// In browser console
localStorage.getItem('token')
```

### Decode token
```javascript
// Copy token from localStorage
// Go to jwt.io
// Paste token
// See role, email, expiry
```

### Check context state
```javascript
// In React DevTools
// Go to Components
// Find AuthProvider
// Look at Hooks > AuthContext
```

---

## ✨ You're All Set!

Everything is configured and ready to use:

1. ✅ Build passes without errors
2. ✅ All files created successfully
3. ✅ Token validation implemented
4. ✅ Admin panel complete
5. ✅ Routes protected
6. ✅ API integrated

**Run `npm run dev` and start testing!**

---

## 📞 Need Help?

Check these files for details:
- `SETUP_SUMMARY.md` - Full implementation details
- `IMPLEMENTATION_GUIDE.md` - Feature guide
- `TOKEN_VALIDATION_GUIDE.js` - Technical reference

Good luck! 🚀
