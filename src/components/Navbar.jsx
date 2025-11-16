import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()
  const { getCartItemsCount } = useCart()
  const cartCount = getCartItemsCount()

  const categories = ['Men', 'Women', 'Kids', 'Accessories']

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`)
      setSearchQuery('')
    }
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-gradient-to-br from-primary to-secondary rounded-lg p-2 group-hover:scale-110 transition-transform">
              <span className="text-2xl">👗</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              FashionHub
            </span>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-xl mx-4 hidden md:block">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for fashion items..."
                className="w-full px-6 py-3 pl-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-gray-50"
              />
              <button
                type="submit"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
              >
                🔍
              </button>
            </div>
          </form>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <Link
              to="/cart"
              className="relative flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-full hover:shadow-lg transition-all"
            >
              <span className="text-lg">🛒</span>
              <span className="text-sm font-medium hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-white text-primary rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-lg"
                >
                  {cartCount}
                </motion.span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Search */}
        <form onSubmit={handleSearch} className="md:hidden pb-3">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full px-4 py-2 pl-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary bg-gray-50"
            />
            <button
              type="submit"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            >
              🔍
            </button>
          </div>
        </form>

        {/* Categories Bar */}
        <div className="flex items-center justify-center gap-6 py-3 border-t border-gray-200">
          {categories.map((category) => (
            <Link
              key={category}
              to={`/products?category=${encodeURIComponent(category)}`}
              className="text-gray-700 hover:text-primary transition-colors font-medium text-sm px-4 py-2 rounded-lg hover:bg-pastel-pink/30"
            >
              {category}
            </Link>
          ))}
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar
