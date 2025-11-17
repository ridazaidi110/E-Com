import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import HeroSlider from '../components/HeroSlider'
import ProductSlider from '../components/ProductSlider'
import { useCart } from '../context/CartContext'

const Home = () => {
  const { products } = useCart()

  const menProducts = products.filter((p) => p.category === 'Men').slice(0, 8)
  const womenProducts = products.filter((p) => p.category === 'Women').slice(0, 8)
  const kidsProducts = products.filter((p) => p.category === 'Kids').slice(0, 8)
  const accessoriesProducts = products.filter((p) => p.category === 'Accessories').slice(0, 8)

  const categories = [
    {
      name: 'Men',
      image: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=600',
      link: '/products?category=Men',
      gradient: 'from-blue-200 to-blue-300',
    },
    {
      name: 'Women',
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600',
      link: '/products?category=Women',
      gradient: 'from-pink-200 to-pink-300',
    },
    {
      name: 'Kids',
      image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600',
      link: '/products?category=Kids',
      gradient: 'from-yellow-200 to-yellow-300',
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen"
    >
      <HeroSlider />

      {/* Category Cards */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Shop by Category</h2>
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {categories.map((category, index) => (
            <Link key={category.name} to={category.link}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className={`relative h-64 rounded-2xl bg-gradient-to-br ${category.gradient} overflow-hidden shadow-lg hover:shadow-xl transition-all`}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-4xl font-bold text-white drop-shadow-lg">
                    {category.name}
                  </h3>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

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

      {/* Features Section */}
      <div className="bg-gradient-to-br from-pastel-pink/30 via-pastel-blue/30 to-pastel-purple/30 py-16 mt-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-5xl mb-4">🚚</div>
              <h3 className="font-bold text-xl mb-2 text-gray-800">Free Shipping</h3>
              <p className="text-gray-600">On orders over ₹4,150</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-5xl mb-4">↩️</div>
              <h3 className="font-bold text-xl mb-2 text-gray-800">Easy Returns</h3>
              <p className="text-gray-600">30-day return policy</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="font-bold text-xl mb-2 text-gray-800">Secure Payment</h3>
              <p className="text-gray-600">100% secure transactions</p>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Home
