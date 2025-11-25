import { useState } from 'react'

const SidebarFilters = ({
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-4 md:mb-0 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800">Filter by Category</h3>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-600"
        >
          {isOpen ? '−' : '+'}
        </button>
      </div>

      {isOpen && (
        <div className="space-y-2">
          {categories.map((category) => (
            <label
              key={category}
              className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <input
                type="radio"
                name="category"
                value={category}
                checked={selectedCategory === category}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="w-4 h-4 text-primary"
              />
              <span className="text-sm text-gray-700 font-medium">{category}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  )
}

export default SidebarFilters

