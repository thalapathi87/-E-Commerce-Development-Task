import { BrowserRouter, Route, Routes } from "react-router-dom";

// Common Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AnimationProvider } from "./components/AddToCartAnimation";

// Admin Layout
import AdminLayout from "./components/admin/AdminLayout";

// Public Pages
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

// Protected User Pages
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";

// Route Protection
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";

// Admin Pages
import Dashboard from "./pages/admin/Dashboard";
import ManageProducts from "./pages/admin/ManageProducts";
import AddProduct from "./pages/admin/AddProduct";
import EditProduct from "./pages/admin/EditProduct";
import ManageCategories from "./pages/admin/ManageCategories";
import ManageOrders from "./pages/admin/ManageOrders";

function App() {
  return (
    <AnimationProvider>
      <BrowserRouter>
        <div className="flex min-h-screen flex-col bg-slate-50">

        {/* =========================
            MAIN NAVBAR
        ========================== */}
        <Navbar />

        {/* =========================
            PAGE CONTENT
        ========================== */}
        <div className="flex-1">
          <Routes>

            {/* =====================================
                PUBLIC ROUTES
            ====================================== */}

            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="/products"
              element={<Products />}
            />

            <Route
              path="/products/:id"
              element={<ProductDetails />}
            />

            <Route
              path="/cart"
              element={<Cart />}
            />

            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/register"
              element={<Register />}
            />

            {/* =====================================
                USER PROTECTED ROUTES
            ====================================== */}

            <Route element={<ProtectedRoute />}>

              <Route
                path="/checkout"
                element={<Checkout />}
              />

              <Route
                path="/orders"
                element={<Orders />}
              />

              <Route
                path="/orders/:id"
                element={<OrderDetails />}
              />

            </Route>

            {/* =====================================
                ADMIN PROTECTED ROUTES
            ====================================== */}

            <Route element={<AdminRoute />}>

              <Route element={<AdminLayout />}>

                {/* Admin Dashboard */}
                <Route
                  path="/admin"
                  element={<Dashboard />}
                />

                {/* Products */}
                <Route
                  path="/admin/products"
                  element={<ManageProducts />}
                />

                <Route
                  path="/admin/products/add"
                  element={<AddProduct />}
                />

                <Route
                  path="/admin/products/edit/:id"
                  element={<EditProduct />}
                />

                {/* Categories */}
                <Route
                  path="/admin/categories"
                  element={<ManageCategories />}
                />

                {/* Orders */}
                <Route
                  path="/admin/orders"
                  element={<ManageOrders />}
                />

              </Route>

            </Route>

            {/* =====================================
                404 PAGE
            ====================================== */}

            <Route
              path="*"
              element={<NotFound />}
            />

          </Routes>
        </div>

        {/* =========================
            FOOTER
        ========================== */}
        <Footer />
      </div>

      </BrowserRouter>
    </AnimationProvider>
  );
}

export default App;