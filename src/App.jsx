import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Navbar from './components/Navbar';
import Login from './features/auth/Login';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import ProductList from './features/products/ProductList';
import ProductDetail from './features/products/ProductDetail';
import ProtectedRoute from './components/ProtectedRoute';
import RoleRoute from './components/RoleRoute';
import { useTheme } from './context/ThemeContext';
import { fetchCategories } from './features/categories/categoriesSlice';

const CategoryList = lazy(() => import('./features/categories/CategoryList'));

function App() {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(fetchCategories());
    }
  }, [token, dispatch]);

  return (
    <div data-theme={theme}>
      <BrowserRouter>
        <Routes>
          {/* Public routes - no sidebar */}
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />

          {/* Protected routes - with sidebar layout */}
          <Route
            path="/dashboard"
            element={
              <div className="app-shell">
                <Navbar />
                <main className="main-content">
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                </main>
              </div>
            }
          />
          <Route
            path="/products"
            element={
              <div className="app-shell">
                <Navbar />
                <main className="main-content">
                  <ProtectedRoute>
                    <ProductList />
                  </ProtectedRoute>
                </main>
              </div>
            }
          />
          <Route
            path="/products/:id"
            element={
              <div className="app-shell">
                <Navbar />
                <main className="main-content">
                  <ProtectedRoute>
                    <ProductDetail />
                  </ProtectedRoute>
                </main>
              </div>
            }
          />
          <Route
            path="/profile"
            element={
              <div className="app-shell">
                <Navbar />
                <main className="main-content">
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                </main>
              </div>
            }
          />

          {/* Role-restricted route - manager and admin only */}
          <Route
            path="/categories"
            element={
              <div className="app-shell">
                <Navbar />
                <main className="main-content">
                  <RoleRoute allowedRoles={['manager', 'admin']}>
                    <Suspense fallback={<p className="state-message">Loading Categories...</p>}>
                      <CategoryList />
                    </Suspense>
                  </RoleRoute>
                </main>
              </div>
            }
          />

          {/* 404 fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;