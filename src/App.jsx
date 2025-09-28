import { Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext.jsx'
import Layout from './components/layout/Layout.jsx'
import ProtectedRoute from './components/auth/ProtectedRoute.jsx'
import HomePage from './pages/HomePage.jsx'
import CollectionPage from './pages/CollectionPage.jsx'
import ProductPage from './pages/ProductPage.jsx'
import CartPage from './pages/CartPage.jsx'
import CheckoutPage from './pages/CheckoutPage.jsx'
import SearchPage from './pages/SearchPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import DesignersPage from './pages/DesignersPage.jsx'
import EditorialsPage from './pages/EditorialsPage.jsx'
import EditorialPostPage from './pages/EditorialPostPage.jsx'
import StoresPage from './pages/StoresPage.jsx'
import CustomerCarePage from './pages/CustomerCarePage.jsx'
import ShippingPage from './pages/ShippingPage.jsx'
import ReturnsPage from './pages/ReturnsPage.jsx'
import FAQPage from './pages/FAQPage.jsx'
import PrivacyPage from './pages/PrivacyPage.jsx'
import CookiesPage from './pages/CookiesPage.jsx'
import ResetPasswordPage from './pages/ResetPasswordPage.jsx'
import SneakerPage from './pages/SneakerPage.jsx'
import AccountPage from './pages/account/AccountPage.jsx'

export default function App() {
  return (
    <AppProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/collections" element={<CollectionPage />} />
          <Route path="/collections/:handle" element={<CollectionPage />} />
          <Route path="/products/:slug" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/forgot-password" element={<ResetPasswordPage />} />

          <Route path="/designers" element={<DesignersPage />} />
          <Route path="/editorials" element={<EditorialsPage />} />
          <Route path="/editorials/:slug" element={<EditorialPostPage />} />
          <Route path="/sneakers" element={<SneakerPage />} />
          <Route path="/designers" element={<DesignersPage />} />

          <Route path="/stores" element={<StoresPage />} />
          <Route path="/customer-care" element={<CustomerCarePage />} />
          <Route path="/shipping" element={<ShippingPage />} />
          <Route path="/returns" element={<ReturnsPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/cookies" element={<CookiesPage />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignUpPage />} />
          
          {/* Protected Routes */}
          <Route path="/account" element={
            <ProtectedRoute>
              <AccountPage />
            </ProtectedRoute>
          } />
        </Route>
      </Routes>
    </AppProvider>
  )
}