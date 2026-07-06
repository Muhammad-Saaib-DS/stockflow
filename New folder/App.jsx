import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Navbar from './components/Navbar';
import Login from './features/auth/Login';
import About from './pages/About';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import ProductList from './features/products/ProductList';
import ProductDetail from './features/products/ProductDetail';
import Shop from './features/shop/Shop';
import ShopProductDetail from './features/shop/ShopProductDetail';
import CategoryPage from './features/shop/CategoryPage';
import Cart from './features/cart/Cart';
import Checkout from './features/orders/Checkout';
import Orders from './features/orders/Orders';
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

  function withShell(Component) {
    return (
      <div className="app-shell">
        <Navbar />
        <main className="main-content">
          <ProtectedRoute>
            <Component />
          </ProtectedRoute>
        </main>
      </div>
    );
  }

  return (
    <div data-theme={theme}>
      <BrowserRouter>
        <Routes>
         <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />

         <Route path="/home" element={withShell(Home)} />
          <Route path="/shop" element={withShell(Shop)} />
          <Route path="/shop/:id" element={withShell(ShopProductDetail)} />
          <Route path="/category/:categoryName" element={withShell(CategoryPage)} />
          <Route path="/cart" element={withShell(Cart)} />
          <Route path="/checkout" element={withShell(Checkout)} />
          <Route path="/orders" element={withShell(Orders)} />

          <Route path="/dashboard" element={withShell(Dashboard)} />
          <Route path="/products" element={withShell(ProductList)} />
          <Route path="/products/:id" element={withShell(ProductDetail)} />
          <Route path="/profile" element={withShell(Profile)} />

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

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;