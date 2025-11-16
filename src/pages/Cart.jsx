import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'

const Cart = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    clearCart,
  } = useCart()

  const subtotal = getCartTotal()
  const tax = subtotal * 0.1
  const shipping = subtotal > 50 ? 0 : 5.99
  const total = subtotal + tax + shipping

  if (cart.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center py-12 bg-gradient-to-br from-pastel-pink/10 via-white to-pastel-blue/10"
      >
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-6">
            Add some fashion items to get started!
          </p>
          <Link
            to="/products"
            className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 rounded-full hover:shadow-lg transition-all inline-block font-semibold"
          >
            Continue Shopping
          </Link>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen py-8 bg-gradient-to-br from-pastel-pink/10 via-white to-pastel-blue/10"
    >
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-4">
            {cart.map((item, index) => (
              <motion.div
                key={`${item.id}-${item.selectedSize || 'no-size'}-${item.selectedColor || 'no-color'}-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-md p-6 flex flex-col sm:flex-row gap-4 hover:shadow-lg transition-shadow border border-gray-100"
              >
                <Link to={`/product/${item.id}`} className="flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-32 h-32 object-cover rounded-xl"
                  />
                </Link>
                <div className="flex-1">
                  <Link
                    to={`/product/${item.id}`}
                    className="text-xl font-semibold text-gray-800 hover:text-primary mb-2 block transition-colors"
                  >
                    {item.name}
                  </Link>
                  <p className="text-gray-600 text-sm mb-2">
                    {item.category} • {item.brand}
                  </p>
                  {item.selectedSize && item.category !== 'Accessories' && (
                    <p className="text-sm text-gray-600 mb-1">
                      Size: <span className="font-semibold">{item.selectedSize}</span>
                    </p>
                  )}
                  {item.selectedColor && (
                    <p className="text-sm text-gray-600 mb-3">
                      Color: <span className="font-semibold">{item.selectedColor}</span>
                    </p>
                  )}
                  {item.category === 'Accessories' && (
                    <p className="text-sm text-gray-600 mb-3">
                      <span className="font-semibold">{item.subcategory || 'Accessory'}</span>
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-lg text-sm font-bold"
                      >
                        −
                      </button>
                      <span className="w-12 text-center font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-lg text-sm font-bold"
                      >
                        +
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-primary">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      {item.quantity > 1 && (
                        <p className="text-sm text-gray-500">
                          ${item.price.toFixed(2)} each
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 text-sm self-start sm:self-center"
                >
                  Remove
                </button>
              </motion.div>
            ))}

            <div className="flex justify-end">
              <button
                onClick={clearCart}
                className="text-red-500 hover:text-red-700 text-sm font-semibold"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="md:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-white to-pastel-pink/20 rounded-2xl shadow-lg p-6 sticky top-24 border border-gray-200"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Order Summary
              </h2>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} items):</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax:</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping:</span>
                  <span className="font-semibold">
                    {shipping === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                {subtotal < 50 && (
                  <p className="text-sm text-green-600 font-semibold">
                    Add ${(50 - subtotal).toFixed(2)} more for free shipping!
                  </p>
                )}
              </div>
              <div className="border-t border-gray-300 pt-4 mb-4">
                <div className="flex justify-between text-2xl font-bold text-gray-800">
                  <span>Total:</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
              </div>
              <Link to="/checkout">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white font-semibold py-4 rounded-full transition-all mb-3 shadow-lg hover:shadow-xl"
                >
                  Proceed to Checkout
                </motion.button>
              </Link>
              <Link to="/products">
                <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-full transition-colors">
                  Continue Shopping
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Cart
