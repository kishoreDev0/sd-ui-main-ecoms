
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-luxury-navy text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & About */}
          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-medium">Deflux</h2>
            <p className="text-sm text-gray-300">
              Luxury redefined. Exceptional quality and unparalleled craftsmanship since 1998.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-medium">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-300 hover:text-luxury-gold transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-sm text-gray-300 hover:text-luxury-gold transition-colors">
                  Shop All
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="text-sm text-gray-300 hover:text-luxury-gold transition-colors">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-sm text-gray-300 hover:text-luxury-gold transition-colors">
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-medium">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="text-sm text-gray-300 hover:text-luxury-gold transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-gray-300 hover:text-luxury-gold transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-gray-300 hover:text-luxury-gold transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-gray-300 hover:text-luxury-gold transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-medium">Stay Connected</h3>
            <p className="text-sm text-gray-300">Subscribe to receive updates, exclusive offers, and more.</p>
            <form className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Your email address"
                className="p-2 text-sm rounded bg-white/10 border border-white/20 focus:outline-none focus:border-luxury-gold"
              />
              <button
                type="submit"
                className="p-2 text-sm font-medium rounded bg-luxury-gold hover:bg-luxury-gold/90 transition-colors text-white"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} Deflux. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-luxury-gold transition-colors">
              Terms & Conditions
            </a>
            <a href="#" className="text-gray-400 hover:text-luxury-gold transition-colors">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
