import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'
import ProductCard from '../components/ProductCard'

const ProductDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getProductById, products, addToCart } = useCart()
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState(null)
  const [selectedColor, setSelectedColor] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [isZoomed, setIsZoomed] = useState(false)

  const product = getProductById(id)

  // Set default size and color when product loads
  useEffect(() => {
    if (product) {
      if (!selectedSize && product.sizes && product.sizes.length > 0) {
        setSelectedSize(product.sizes[0])
      }
      if (!selectedColor && product.colors && product.colors.length > 0) {
        setSelectedColor(product.colors[0])
      }
    }
  }, [product])

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-800 mb-4">
            Product not found
          </p>
          <button
            onClick={() => navigate('/products')}
            className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-2 rounded-full hover:shadow-lg transition-all"
          >
            Back to Products
          </button>
        </div>
      </div>
    )
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0

  const handleAddToCart = () => {
    // For clothing items, require size and color selection
    // For accessories, only require color if available
    if (product.category !== 'Accessories') {
      if (!selectedSize || !selectedColor) {
        alert('Please select size and color')
        return
      }
    } else if (product.colors && product.colors.length > 0 && !selectedColor) {
      alert('Please select color')
      return
    }
    addToCart(product, quantity, selectedSize || null, selectedColor || null)
    navigate('/cart')
  }

  const colorMap = {
    White: '#FFFFFF',
    Black: '#000000',
    Navy: '#001f3f',
    Gray: '#808080',
    Blue: '#0074D9',
    Pink: '#FF69B4',
    Yellow: '#FFD700',
    Green: '#2ECC40',
    Red: '#FF4136',
    Beige: '#F5F5DC',
    Khaki: '#C3B091',
    Light: '#E6E6FA',
    Brown: '#8B4513',
    Purple: '#9B59B6',
    Floral: 'linear-gradient(45deg, #FF69B4, #FFD700)',
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen py-8 bg-gradient-to-br from-pastel-pink/10 via-white to-pastel-blue/10"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-4 text-sm text-gray-600">
          <Link to="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          {' / '}
          <Link to="/products" className="hover:text-primary transition-colors">
            Products
          </Link>
          {' / '}
          <span className="text-gray-800">{product.name}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div
              className="relative bg-white rounded-2xl overflow-hidden cursor-zoom-in shadow-lg"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
            >
              <motion.img
                src={
                  product.images && product.images.length > 0
                    ? product.images[selectedImage] || product.image
                    : product.image
                }
                alt={product.name}
                className="w-full h-96 object-cover"
                animate={{
                  scale: isZoomed ? 1.5 : 1,
                }}
                transition={{ duration: 0.3 }}
              />
              {discount > 0 && (
                <span className="absolute top-4 left-4 bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  -{discount}% OFF
                </span>
              )}
            </div>
            {(product.images && product.images.length > 0) && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-xl border-2 overflow-hidden transition-all ${
                      selectedImage === index
                        ? 'border-primary ring-2 ring-primary ring-offset-2'
                        : 'border-gray-300 hover:border-primary'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-500 uppercase">{product.category}</span>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}
                  >
                    ★
                  </span>
                ))}
                <span className="text-gray-600 ml-2">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            </div>

            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {product.name}
            </h1>

            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl font-bold text-primary">
                  ₹{product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-2xl text-gray-500 line-through">
                      ₹{product.originalPrice.toFixed(2)}
                    </span>
                    <span className="text-green-600 font-semibold">
                      Save ₹{(product.originalPrice - product.price).toFixed(2)}
                    </span>
                  </>
                )}
              </div>
            </div>

            <div className="mb-6">
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Size Selection - Only show for clothing items */}
            {product.category !== 'Accessories' && product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Size: <span className="text-primary">{selectedSize}</span>
                </label>
                <div className="flex gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                        selectedSize === size
                          ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg scale-105'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection - Show for clothing and accessories */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Color: <span className="text-primary">{selectedColor}</span>
                </label>
                <div className="flex gap-3 flex-wrap">
                  {product.colors.map((color) => {
                    const colorValue = colorMap[color] || '#CCCCCC'
                    const isGradient = typeof colorValue === 'string' && colorValue.includes('gradient')
                    return (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-12 h-12 rounded-full border-2 transition-all ${
                          selectedColor === color
                            ? 'border-primary ring-2 ring-primary ring-offset-2 scale-110'
                            : 'border-gray-300 hover:border-primary'
                        }`}
                        style={
                          isGradient
                            ? { background: colorValue }
                            : { backgroundColor: colorValue }
                        }
                        title={color}
                      />
                    )
                  })}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Quantity:
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg font-bold"
                >
                  −
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  className="w-20 text-center border-2 border-gray-300 rounded-lg py-2 font-semibold focus:outline-none focus:border-primary"
                  min="1"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                disabled={!product.inStock || (product.category !== 'Accessories' && (!selectedSize || !selectedColor)) || (product.category === 'Accessories' && product.colors && product.colors.length > 0 && !selectedColor)}
                className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white font-semibold py-4 px-6 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                Add to Cart
              </motion.button>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-2">
                <span className="font-semibold">Brand:</span> {product.brand}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Availability:</span>{' '}
                {product.inStock ? (
                  <span className="text-green-600">In Stock</span>
                ) : (
                  <span className="text-red-600">Out of Stock</span>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default ProductDetails
