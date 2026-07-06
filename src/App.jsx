import { useEffect, lazy, Suspense } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useTheme } from "./context/ThemeContext";
import { fetchCategories } from "./features/categories/categoriesSlice";

import CustomerLayout from "./layouts/CustomerLayout";
import AdminLayout from "./layouts/AdminLayout";

import ProtectedRoute from "./components/ProtectedRoute";
import RoleRoute from "./components/RoleRoute";

import Login from "./features/auth/Login";

import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

import Shop from "./features/shop/Shop";
import ShopProductDetail from "./features/shop/ShopProductDetail";
import CategoryPage from "./features/shop/CategoryPage";

import Cart from "./features/cart/Cart";

import Checkout from "./features/orders/Checkout";
import Orders from "./features/orders/Orders";

import ProductList from "./features/products/ProductList";
import ProductDetail from "./features/products/ProductDetail";

const CategoryList = lazy(() =>
  import("./features/categories/CategoryList")
);

function App() {
  const { theme } = useTheme();

  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(fetchCategories());
    }
  }, [dispatch, token]);

  return (
    <div data-theme={theme}>
      <BrowserRouter>

        <Routes>

          {/* PUBLIC */}

          <Route path="/" element={<CustomerLayout />}>

            <Route index element={<Home />} />

            <Route path="about" element={<About />} />

          </Route>

          <Route path="/login" element={<Login />} />

          {/* CUSTOMER */}

          <Route
            element={
              <ProtectedRoute>
                <CustomerLayout />
              </ProtectedRoute>
            }
          >

            <Route path="/shop" element={<Shop />} />

            <Route path="/shop/:id" element={<ShopProductDetail />} />

            <Route
              path="/category/:categoryName"
              element={<CategoryPage />}
            />

            <Route path="/cart" element={<Cart />} />

            <Route path="/checkout" element={<Checkout />} />

            <Route path="/orders" element={<Orders />} />

          </Route>

          {/* ADMIN */}

          <Route
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >

            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/products" element={<ProductList />} />

            <Route path="/products/:id" element={<ProductDetail />} />

            <Route path="/profile" element={<Profile />} />

            <Route
              path="/categories"
              element={
                <RoleRoute
                  allowedRoles={["admin", "manager"]}
                >
                  <Suspense
                    fallback={
                      <p className="state-message">
                        Loading Categories...
                      </p>
                    }
                  >
                    <CategoryList />
                  </Suspense>
                </RoleRoute>
              }
            />

          </Route>

          {/* 404 */}

          <Route
            path="*"
            element={<NotFound />}
          />

        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;