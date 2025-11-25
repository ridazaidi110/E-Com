import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useProducts } from '../context/ProductsContext'
import SidebarFilters from '../components/SidebarFilters'
import ProductCard from '../components/ProductCard'

const Products = () => {
  const [searchParams] = useSearchParams()
  const { products } = useProducts()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedRating, setSelectedRating] = useState(null)
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 })
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const categoryParam = searchParams.get('category')
    const searchParam = searchParams.get('search')
    if (categoryParam) {
      setSelectedCategory(categoryParam)
    } else {
      setSelectedCategory('All')
    }
    if (searchParam) {
      setSearchQuery(searchParam)
    } else {
      setSearchQuery('')
    }
  }, [searchParams])

  const categories = ['All', 'Men', 'Women', 'Kids', 'Accessories']

  const filteredProducts = useMemo(() => {
    let filtered = products

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter((p) => p.category === selectedCategory)
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Rating filter
    if (selectedRating) {
      filtered = filtered.filter((p) => p.rating >= selectedRating)
    }

    // Price filter
    if (priceRange.min > 0) {
      filtered = filtered.filter((p) => p.price >= priceRange.min)
    }
    if (priceRange.max > 0) {
      filtered = filtered.filter((p) => p.price <= priceRange.max)
    }

    return filtered
  }, [products, selectedCategory, selectedRating, priceRange, searchQuery])

  const clearFilters = () => {
    setSelectedCategory('All')
    setSelectedRating(null)
    setPriceRange({ min: 0, max: 0 })
    setSearchQuery('')
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen py-8 bg-gradient-to-br from-pastel-pink/10 via-white to-pastel-blue/10"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="md:w-64 flex-shrink-0">
            <SidebarFilters
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedRating={selectedRating}
              onRatingChange={setSelectedRating}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              onClearFilters={clearFilters}
            />
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {searchQuery
                  ? `Search Results for "${searchQuery}"`
                  : selectedCategory === 'All'
                  ? 'All Products'
                  : `${selectedCategory}'s Collection`}
              </h1>
              <p className="text-gray-600">
                {filteredProducts.length} product(s) found
              </p>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found</p>
                <button
                  onClick={clearFilters}
                  className="mt-4 text-primary hover:underline font-semibold"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Products
