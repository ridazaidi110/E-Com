import { createContext, useContext } from 'react'
import productsData from '../products.json'

const ProductsContext = createContext()

export const useProducts = () => {
  const context = useContext(ProductsContext)
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider')
  }
  return context
}

export const ProductsProvider = ({ children }) => {
  const products = productsData

  const getProductById = (id) => {
    return products.find((p) => p.id === parseInt(id))
  }

  const value = {
    products,
    getProductById,
  }

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  )
}

