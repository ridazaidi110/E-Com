import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      id: 1,
      title: 'New Collection 2025',
      subtitle: 'Discover the latest fashion trends',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop',
      link: '/products',
      overlay: 'from-pink-500/60 to-purple-500/60',
    },
    {
      id: 2,
      title: 'Women\'s Fashion',
      subtitle: 'Elegant styles for every occasion',
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=1200&h=600&fit=crop',
      link: '/products?category=Women',
      overlay: 'from-blue-500/60 to-cyan-500/60',
    },
    {
      id: 3,
      title: 'Men\'s Collection',
      subtitle: 'Modern and stylish',
      image: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=1200&h=600&fit=crop',
      link: '/products?category=Men',
      overlay: 'from-purple-500/60 to-pink-500/60',
    },
    {
      id: 4,
      title: 'Kids\' Fashion',
      subtitle: 'Fun and colorful styles',
      image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=1200&h=600&fit=crop',
      link: '/products?category=Kids',
      overlay: 'from-yellow-500/60 to-orange-500/60',
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  return (
    <div className="relative h-96 md:h-[600px] overflow-hidden rounded-b-3xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <div className="relative h-full w-full">
            {/* Background Image */}
            <motion.img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ scale: 1 }}
              animate={{ scale: 1.05 }}
              transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
            />
            
            {/* Overlay Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-r ${slides[currentSlide].overlay}`}></div>
            
            {/* Content */}
            <div className="relative h-full flex items-center justify-center px-8 md:px-16 z-10">
              <div className="text-center text-white max-w-3xl">
                <motion.h2
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-2xl"
                >
                  {slides[currentSlide].title}
                </motion.h2>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-xl md:text-2xl mb-8 text-white drop-shadow-lg"
                >
                  {slides[currentSlide].subtitle}
                </motion.p>
                <Link to={slides[currentSlide].link}>
                  <motion.button
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-primary-dark px-10 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition-all shadow-lg backdrop-blur-sm bg-white/95"
                  >
                    Shop Now →
                  </motion.button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? 'bg-white w-10 shadow-lg'
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() =>
          setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
        }
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-3 rounded-full transition-all z-20 shadow-lg hover:scale-110"
      >
        ‹
      </button>
      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-3 rounded-full transition-all z-20 shadow-lg hover:scale-110"
      >
        ›
      </button>
    </div>
  )
}

export default HeroSlider
