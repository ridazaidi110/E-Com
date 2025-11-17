# ShopHub - Modern E-Commerce Website

A beautiful, modern, and responsive e-commerce website built with React, Vite, and TailwindCSS. Features a sleek purple and teal color scheme with smooth animations.

## Features

- 🏠 **Home Page** - Hero slider, featured products, best sellers, and deals
- 🛍️ **Products Page** - Product grid with sidebar filters (category, rating, price)
- 📦 **Product Details** - Large zoomable images, product information, related products
- 🛒 **Shopping Cart** - Modern cart interface with quantity management
- 💳 **Checkout** - Complete checkout form with shipping and payment information
- 🎨 **Modern Design** - Beautiful purple and teal gradient theme with smooth animations
- ✨ **Smooth Animations** - Framer Motion animations throughout
- 💾 **LocalStorage** - Cart persistence using localStorage
- 📱 **Responsive Design** - Works on all device sizes

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **TailwindCSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Context API** - State management for cart

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Sticky navbar with search
│   │   ├── HeroSlider.jsx      # Hero banner slider
│   │   ├── ProductCard.jsx     # Product card component
│   │   ├── ProductSlider.jsx   # Product slider component
│   │   └── SidebarFilters.jsx  # Filter sidebar
│   ├── context/
│   │   └── CartContext.jsx     # Cart state management
│   ├── pages/
│   │   ├── Home.jsx            # Home page
│   │   ├── Products.jsx        # Products listing page
│   │   ├── ProductDetails.jsx  # Product details page
│   │   ├── Cart.jsx            # Shopping cart page
│   │   └── Checkout.jsx        # Checkout page
│   ├── products.json           # Product data
│   ├── App.jsx                 # Main app component
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## Features in Detail

### Navigation
- Sticky navbar that stays at the top while scrolling
- Search functionality
- Category dropdown
- Cart badge showing item count

### Product Browsing
- Filter by category, rating, and price range
- Search products by name or description
- Responsive product grid
- Product sliders on home page

### Product Details
- Large product images with zoom on hover
- Multiple image gallery
- Product information and reviews
- Related products section
- Add to cart with quantity selection

### Shopping Cart
- View all cart items
- Update quantities
- Remove items
- Order summary with subtotal, tax, and shipping
- Free shipping on orders over ₹4,150

### Checkout
- Shipping information form
- Payment information form
- Order summary
- Form validation

## Customization

### Colors
Edit `tailwind.config.js` to customize the theme colors:
- `primary`: Main indigo/purple color (#6366f1)
- `primary-dark`: Darker indigo (#4f46e5)
- `secondary`: Teal accent color (#14b8a6)
- `accent`: Amber/orange accent (#f59e0b)

### Products
Edit `src/products.json` to add, remove, or modify products.

## License

This project is open source and available for personal and commercial use.

