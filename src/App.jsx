import PageContent from "./layout/PageContent";
import { Routes, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AppLoader from "./components/AppLoader";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import TeamPage from "./pages/TeamPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ShopingCartPage from "./pages/ShopingCartPage";
import OrderPage from "./pages/OrderPage";
import ProtectedRoute from "./components/ProtectedRoute";
import OrderHistoryPage from "./pages/OrderHistoryPage";

function App() {
  return (
    <>
      <AppLoader />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route element={<PageContent />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/shop/:gender" element={<ShopPage />} />
          <Route path="/shop/:gender/:categoryName/:categoryId" element={<ShopPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route
            path="/shop/:gender/:categoryName/:categoryId/:productSlug/:productId"
            element={<ProductDetailPage />}
          />
          <Route path="/cart" element={<ShopingCartPage />} />
          <Route
            path="/order"
            element={
              <ProtectedRoute>
                <OrderPage />
              </ProtectedRoute>
            }
          />
          <Route path="/history" element={<OrderHistoryPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
