import { Link } from 'react-router-dom'
import HeroSlider from '../components/HeroSlider'
import ProductSlider from '../components/ProductSlider'
import { useProducts } from '../context/ProductsContext'

const Home = () => {
  const { products } = useProducts()

  const menProducts = products.filter((p) => p.category === 'Men').slice(0, 4)
  const womenProducts = products.filter((p) => p.category === 'Women').slice(0, 4)
  const kidsProducts = products.filter((p) => p.category === 'Kids').slice(0, 4)
  const accessoriesProducts = products.filter((p) => p.category === 'Accessories').slice(0, 4)

  const categories = ['Men', 'Women', 'Kids', 'Accessories']

  return (
    <div className="min-h-screen">
      <HeroSlider />

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Category Links */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Shop by Category</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Link
                key={category}
                to={`/products?category=${category}`}
                className="bg-white border-2 border-gray-200 px-6 py-3 rounded-lg hover:border-primary hover:text-primary transition-colors font-medium"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>

        {/* Featured Products */}
        {menProducts.length > 0 && (
          <ProductSlider title="Men's Collection" products={menProducts} />
        )}
        {womenProducts.length > 0 && (
          <ProductSlider title="Women's Fashion" products={womenProducts} />
        )}
        {accessoriesProducts.length > 0 && (
          <ProductSlider title="Accessories" products={accessoriesProducts} />
        )}
        {kidsProducts.length > 0 && (
          <ProductSlider title="Kids' Collection" products={kidsProducts} />
        )}
      </div>
    </div>
  )
}

export default Home
