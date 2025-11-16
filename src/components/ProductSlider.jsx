import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ProductCard from './ProductCard'

const ProductSlider = ({ title, products }) => {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [maxScroll, setMaxScroll] = useState(0)
  const scrollAmount = 300

  useEffect(() => {
    const calculateMaxScroll = () => {
      const containerWidth = window.innerWidth - 200 // Account for padding and buttons
      const contentWidth = products.length * 280 // 260px card + 20px gap
      setMaxScroll(Math.max(0, contentWidth - containerWidth))
    }

    calculateMaxScroll()
    window.addEventListener('resize', calculateMaxScroll)
    return () => window.removeEventListener('resize', calculateMaxScroll)
  }, [products.length])

  const scrollLeft = () => {
    setScrollPosition((prev) => Math.max(0, prev - scrollAmount))
  }

  const scrollRight = () => {
    setScrollPosition((prev) => Math.min(maxScroll, prev + scrollAmount))
  }

  return (
    <div className="my-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 px-4">{title}</h2>
      <div className="relative">
        <button
          onClick={scrollLeft}
          disabled={scrollPosition === 0}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          ‹
        </button>
        <div className="overflow-hidden px-12">
          <motion.div
            animate={{ x: -scrollPosition }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="flex gap-4"
          >
            {products.map((product) => (
              <div key={product.id} className="min-w-[260px]">
                <ProductCard product={product} />
              </div>
            ))}
          </motion.div>
        </div>
        <button
          onClick={scrollRight}
          disabled={scrollPosition >= maxScroll}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          ›
        </button>
      </div>
    </div>
  )
}

export default ProductSlider

