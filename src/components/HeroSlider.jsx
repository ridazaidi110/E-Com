import { Link } from 'react-router-dom'

const HeroSlider = () => {
  return (
    <div className="bg-gradient-to-r from-primary to-secondary text-white py-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to FashionHub
        </h1>
        <p className="text-xl mb-8 text-white/90">
          Discover the latest fashion trends
        </p>
        <Link
          to="/products"
          className="inline-block bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
        >
          Shop Now
        </Link>
      </div>
    </div>
  )
}

export default HeroSlider
