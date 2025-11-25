import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="bg-white rounded-lg p-2">
                <span className="text-2xl">👗</span>
              </div>
              <span className="text-2xl font-bold">FashionHub</span>
            </Link>
            <p className="text-gray-700 text-sm">
              Your one-stop destination for trendy fashion. Shop the latest styles for Men, Women, and Kids.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-700 hover:text-primary-dark transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-700 hover:text-primary-dark transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/products?category=Men" className="text-gray-700 hover:text-primary-dark transition-colors">
                  Men's Collection
                </Link>
              </li>
              <li>
                <Link to="/products?category=Women" className="text-gray-700 hover:text-primary-dark transition-colors">
                  Women's Collection
                </Link>
              </li>
              <li>
                <Link to="/products?category=Kids" className="text-gray-700 hover:text-primary-dark transition-colors">
                  Kids Collection
                </Link>
              </li>
              <li>
                <Link to="/products?category=Accessories" className="text-gray-700 hover:text-primary-dark transition-colors">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-bold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-700 hover:text-primary-dark transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-primary-dark transition-colors">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-primary-dark transition-colors">
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-primary-dark transition-colors">
                  Size Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-primary-dark transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-300 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-700 text-sm">
            © 2025 FashionHub. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-700 hover:text-primary-dark transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-700 hover:text-primary-dark transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

