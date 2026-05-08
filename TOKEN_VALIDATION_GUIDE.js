// TOKEN VALIDATION & JWT IMPLEMENTATION GUIDE

/**
 * JWT Token Flow in HealthGov Frontend
 * 
 * 1. AUTHENTICATION (Login)
 * ========================
 * - User enters credentials in Login.jsx
 * - POST request to /healthGov/login with {email, password}
 * - Backend returns: { token: "jwt-token-here" }
 * - AuthContext.login(token) stores in localStorage
 * - App automatically decodes JWT and extracts user data
 * 
 * 2. TOKEN STORAGE
 * ===============
 * Key: 'token'
 * Location: browser localStorage
 * Persistence: Survives page refresh
 * 
 * 3. TOKEN VALIDATION
 * ===================
 * On App Load:
 * - AuthContext checks localStorage for token
 * - jwtDecode(token) extracts user info
 * - If invalid → localStorage cleared → redirect to login
 * - If valid → user data set in context
 */

/**
 * EXPECTED JWT PAYLOAD STRUCTURE
 * ==============================
 * 
 * After decoding, should contain:
 * {
 *   "sub": "user_id or email",
 *   "email": "user@example.com",
 *   "role": "ADMIN" or "CITIZEN",
 *   "iat": 1234567890,
 *   "exp": 1234571490
 * }
 */

/**
 * API REQUEST FLOW WITH TOKEN
 * ===========================
 * 
 * 1. Request sent via axios (src/api/axios.js)
 * 2. Interceptor checks localStorage for token
 * 3. If token exists:
 *    - Authorization header set to "Bearer {token}"
 * 4. Request sent to backend with header
 * 5. Backend validates token using same secret
 */

/**
 * AXIOS INTERCEPTOR (already configured in src/api/axios.js)
 * ==========================================================
 */
/*
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});
*/

/**
 * AUTHENTICATION CONTEXT USAGE
 * =============================
 */

// In any component:
/*
import { useAuth } from '../context/AuthContext';

function MyComponent() {
  const { user, login, logout, loading, token, isAuthenticated } = useAuth();
  
  // user object structure:
  // {
  //   sub: "user_id",
  //   email: "user@example.com", 
  //   role: "ADMIN",
  //   iat: 1234567890
  // }
  
  // user.role === 'ADMIN' → shows admin menu
  // isAuthenticated → true if logged in
  // logout() → clears token and redirects
}
*/

/**
 * PROTECTED ROUTE USAGE
 * =====================
 */

/*
// Simple protection - any authenticated user
<ProtectedRoute>
  <Dashboard />
</ProtectedRoute>

// Role-specific protection - only admins
<ProtectedRoute requiredRole="ADMIN">
  <AdminPanel />
</ProtectedRoute>

// If user not authenticated:
// - Redirected to /login automatically
// 
// If user lacks role:
// - Redirected to /dashboard
*/

/**
 * LOGIN FLOW DETAIL
 * =================
 * 
 * src/pages/auth/Login.jsx →
 *   1. User submits form
 *   2. POST /healthGov/login with credentials
 *   3. Backend returns { token: "..." }
 *   4. login(token) called in AuthContext
 *   5. Token stored in localStorage
 *   6. JWT decoded → user role extracted
 *   7. User object set in context state
 *   8. navigate('/dashboard') redirects
 *   9. App checks user.role:
 *      - ADMIN → shows AdminDashboard
 *      - CITIZEN → shows CitizenDashboard
 */

/**
 * TOKEN EXPIRATION HANDLING
 * ==========================
 * 
 * If token expires:
 * 1. Backend returns 401 error
 * 2. User automatically redirected to login
 * 3. localStorage token cleared
 * 4. New login required
 * 
 * Optional: Add token refresh logic
 * - Check exp time before making requests
 * - Refresh token if expiring soon
 * - Require new login if already expired
 */

/**
 * LOGOUT FLOW
 * ===========
 * 
 * When user clicks Logout:
 * 1. logout() called from Sidebar.jsx
 * 2. logout() in AuthContext:
 *    - localStorage.removeItem('token')
 *    - user = null
 *    - token = null
 * 3. ProtectedRoute detects isAuthenticated = false
 * 4. User redirected to /login
 */

/**
 * ADMIN DETECTION
 * ===============
 * 
 * In JWT, role field determines:
 * 
 * user.role === 'ADMIN'
 * ├── Shows admin menu in Sidebar
 * ├── Enables /admin/* routes
 * ├── Shows Users page
 * ├── Shows Add User page
 * └── Shows Analytics page
 * 
 * user.role === 'CITIZEN'
 * ├── Hides admin menu
 * ├── /admin/* routes redirect
 * └── Shows citizen dashboard
 */

/**
 * TESTING TOKEN VALIDATION
 * ========================
 */

// Test 1: Login and check localStorage
/*
1. Go to /login
2. Enter valid credentials
3. Open DevTools → Application → localStorage
4. Check 'token' key exists
5. Copy token value and verify at jwt.io
*/

// Test 2: Verify persistence
/*
1. Login successfully
2. Refresh page (Ctrl+R)
3. Check if still logged in
4. Token should still be in localStorage
*/

// Test 3: Test invalid token
/*
1. Manual edit localStorage token
2. Make it invalid
3. Refresh page
4. Should redirect to /login
*/

// Test 4: Role-based access
/*
1. Login as ADMIN
2. Visit /admin/users
3. User list should load
4. Login as CITIZEN
5. Visit /admin/users
6. Should redirect to /dashboard
*/

/**
 * TROUBLESHOOTING
 * ===============
 * 
 * Token not persisting:
 * → Check localStorage permissions
 * → Verify token key is 'token' (not 'auth_token')
 * 
 * Always redirecting to login:
 * → Check JWT is valid at jwt.io
 * → Verify jwtDecode can parse it
 * → Check token in localStorage
 * 
 * Admin features not showing:
 * → Verify role field in JWT payload
 * → Check role value is exactly 'ADMIN'
 * → Verify JWT decoding works
 * 
 * Authorization header not sending:
 * → Verify axios interceptor configured
 * → Check token exists in localStorage
 * → Verify Bearer format: "Bearer {token}"
 */

export default {};
