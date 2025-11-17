import { useState } from 'react'
import { motion } from 'framer-motion'

const SidebarFilters = ({
  categories,
  selectedCategory,
  onCategoryChange,
  selectedRating,
  onRatingChange,
  priceRange,
  onPriceRangeChange,
  onClearFilters,
}) => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <motion.div
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="bg-white p-6 rounded-2xl shadow-lg mb-4 md:mb-0 border border-gray-100"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800">Filters</h3>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-600"
        >
          {isOpen ? '−' : '+'}
        </button>
      </div>

      {isOpen && (
        <div className="space-y-6">
          {/* Category Filter */}
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Category</h4>
            <div className="space-y-2">
              {categories.map((category) => (
                <label
                  key={category}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="category"
                    value={category}
                    checked={selectedCategory === category}
                    onChange={(e) => onCategoryChange(e.target.value)}
                    className="w-4 h-4 text-primary"
                  />
                  <span className="text-sm text-gray-600">{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Rating Filter */}
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Rating</h4>
            <div className="space-y-2">
              {[4, 3, 2, 1].map((rating) => (
                <label
                  key={rating}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="rating"
                    value={rating}
                    checked={selectedRating === rating}
                    onChange={(e) => onRatingChange(parseFloat(e.target.value))}
                    className="w-4 h-4 text-primary"
                  />
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={
                          i < rating
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }
                      >
                        ★
                      </span>
                    ))}
                    <span className="text-sm text-gray-600 ml-1">& Up</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Price Range</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">₹</span>
                <input
                  type="number"
                  placeholder="Min"
                  value={priceRange.min || ''}
                  onChange={(e) =>
                    onPriceRangeChange({
                      ...priceRange,
                      min: e.target.value ? parseFloat(e.target.value) : 0,
                    })
                  }
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">₹</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange.max || ''}
                  onChange={(e) =>
                    onPriceRangeChange({
                      ...priceRange,
                      max: e.target.value ? parseFloat(e.target.value) : 0,
                    })
                  }
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>
            </div>
          </div>

          {/* Clear Filters */}
          <button
            onClick={onClearFilters}
            className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white py-3 rounded-full transition-all font-semibold shadow-md hover:shadow-lg"
          >
            Clear Filters
          </button>
        </div>
      )}
    </motion.div>
  )
}

export default SidebarFilters

