import { AppProvider } from './context/AppContext'
import { NavigationProvider, useNavigation } from './context/NavigationContext'
import Header from './components/layout/Header'
import BottomNavigation from './components/layout/BottomNavigation'

import HomePage      from './pages/HomePage'
import CatalogPage   from './pages/CatalogPage'
import AgePage       from './pages/AgePage'
import PopularPage   from './pages/PopularPage'
import PromoPage     from './pages/PromoPage'
import CartPage      from './pages/CartPage'
import FavoritesPage from './pages/FavoritesPage'
import DeliveryPage  from './pages/DeliveryPage'
import SupportPage   from './pages/SupportPage'
import AboutPage     from './pages/AboutPage'

const PAGE_MAP = {
  home:      HomePage,
  catalog:   CatalogPage,
  age:       AgePage,
  popular:   PopularPage,
  promo:     PromoPage,
  cart:      CartPage,
  favorites: FavoritesPage,
  delivery:  DeliveryPage,
  support:   SupportPage,
  about:     AboutPage,
}

function AppContent() {
  const { page } = useNavigation()
  const Page = PAGE_MAP[page] ?? HomePage

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main
        key={page}
        className="flex-1 pt-[57px] pb-16 overflow-y-auto"
      >
        <Page />
      </main>
      <BottomNavigation />
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <NavigationProvider>
        <AppContent />
      </NavigationProvider>
    </AppProvider>
  )
}
