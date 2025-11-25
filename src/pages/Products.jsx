import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useProducts } from '../context/ProductsContext'
import SidebarFilters from '../components/SidebarFilters'
import ProductCard from '../components/ProductCard'

const Products = () => {
  const [searchParams] = useSearchParams()
  const { products } = useProducts()
  const [selectedCategory, setSelectedCategory] = useState('All')
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

    return filtered
  }, [products, selectedCategory, searchQuery])

  const clearFilters = () => {
    setSelectedCategory('All')
    setSearchQuery('')
  }

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="md:w-64 flex-shrink-0">
            <SidebarFilters
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
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
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products
