import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()
  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    // Use first available size and color as default
    const defaultSize = product.sizes?.[0] || null
    const defaultColor = product.colors?.[0] || null
    addToCart(product, 1, defaultSize, defaultColor)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group border border-gray-100"
    >
      <Link to={`/product/${product.id}`}>
        <div className="relative overflow-hidden">
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
          />
          {discount > 0 && (
            <span className="absolute top-3 left-3 bg-gradient-to-r from-primary to-secondary text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              -{discount}% OFF
            </span>
          )}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleAddToCart}
            className="absolute top-3 right-3 bg-gradient-to-r from-primary to-secondary text-white p-3 rounded-full hover:shadow-lg transition-all opacity-0 group-hover:opacity-100"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </motion.button>
        </div>
        <div className="p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-500 uppercase">{product.category}</span>
            <div className="flex items-center gap-1">
              <span className="text-yellow-400 text-sm">★</span>
              <span className="text-xs text-gray-600">{product.rating}</span>
            </div>
          </div>
          <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 text-lg group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-primary">
                ₹{product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  ₹{product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default ProductCard
