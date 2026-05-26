import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import Header from '../components/layout/Header'
import BottomNavigation from '../components/layout/BottomNavigation'
import Loader from '../components/ui/Loader'
import { useAuth } from '../context/AuthContext'
import HomePage from '../pages/HomePage'
import CatalogPage from '../pages/CatalogPage'
import ProductPage from '../pages/ProductPage'
import CartPage from '../pages/CartPage'
import OrderPage from '../pages/OrderPage'
import OrderSuccessPage from '../pages/OrderSuccessPage'
import ProfilePage from '../pages/ProfilePage'
import FavoritesPage from '../pages/FavoritesPage'
import OrderHistoryPage from '../pages/OrderHistoryPage'
import DeliveryPage from '../pages/DeliveryPage'
import SupportPage from '../pages/SupportPage'
import AboutPage from '../pages/AboutPage'
import AdminPage from '../pages/admin/AdminPage'
import AdminProductsPage from '../pages/admin/AdminProductsPage'
import AdminOrdersPage from '../pages/admin/AdminOrdersPage'

function MainLayout() {
  const location = useLocation()
  const hideNav = location.pathname.startsWith('/product')

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {!hideNav && <Header />}
      <main className={`flex-1 overflow-y-auto ${hideNav ? '' : 'pt-[57px] pb-16'}`}>
        <Outlet />
      </main>
      {!hideNav && <BottomNavigation />}
    </div>
  )
}

function AdminLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="pt-[57px] pb-8">
        <Outlet />
      </main>
    </div>
  )
}

function AdminGuard() {
  const { isAdmin, loading } = useAuth()

  if (loading) return <Loader className="min-h-screen" />
  if (!isAdmin) return <Navigate to="/" replace />

  return <Outlet />
}

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="catalog" element={<CatalogPage />} />
        <Route path="product/:id" element={<ProductPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="order" element={<OrderPage />} />
        <Route path="order/success" element={<OrderSuccessPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="orders" element={<OrderHistoryPage />} />
        <Route path="delivery" element={<DeliveryPage />} />
        <Route path="support" element={<SupportPage />} />
        <Route path="about" element={<AboutPage />} />
      </Route>

      <Route element={<AdminGuard />}>
        <Route element={<AdminLayout />}>
          <Route path="admin" element={<AdminPage />} />
          <Route path="admin/products" element={<AdminProductsPage />} />
          <Route path="admin/orders" element={<AdminOrdersPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
