
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ShoppingCart,
  Heart,
  Search,
  Menu,
  X,
  User,
  Home
} from "lucide-react";
import { useShoppingCart } from "@/context/ShoppingCartContext";
import { useWishlist } from "@/context/WishlistContext";
import { Badge } from "@/components/ui/badge";
import { useChatbot } from "@/context/ChatbotContext";

export function Navigation() {
  const { cartItems } = useShoppingCart();
  const { wishlistItems } = useWishlist();
  const { toggleChat } = useChatbot();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
    // Here you would typically redirect to search results page
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-serif font-bold text-luxury-navy">Deflux</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6 items-center">
            <Link to="/" className="text-sm font-medium transition-colors hover:text-luxury-gold">
              Home
            </Link>
            <Link to="/products" className="text-sm font-medium transition-colors hover:text-luxury-gold">
              Products
            </Link>
            <div className="relative w-[200px]">
              <form onSubmit={handleSearch}>
                <Input
                  type="search"
                  placeholder="Search..."
                  className="pr-8 rounded-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="absolute right-0 top-0 h-full" 
                  type="submit"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center gap-3">
            {/* Chat button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative hidden md:flex"
              onClick={toggleChat}
            >
              <User className="h-5 w-5" />
            </Button>

            {/* Wishlist button */}
            <Link to="/wishlist">
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="h-5 w-5" />
                {wishlistItems.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-luxury-gold text-white">
                    {wishlistItems.length}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Cart button */}
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-luxury-gold text-white">
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Mobile menu button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-2 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-muted"
                onClick={() => setIsMenuOpen(false)}
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
              <Link 
                to="/products" 
                className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-muted"
                onClick={() => setIsMenuOpen(false)}
              >
                <Search className="h-4 w-4" />
                <span>Products</span>
              </Link>
              <Link 
                to="/wishlist" 
                className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-muted"
                onClick={() => setIsMenuOpen(false)}
              >
                <Heart className="h-4 w-4" />
                <span>Wishlist</span>
              </Link>
              <Link 
                to="/cart" 
                className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-muted"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingCart className="h-4 w-4" />
                <span>Cart</span>
              </Link>
              <button 
                className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-muted"
                onClick={() => {
                  toggleChat();
                  setIsMenuOpen(false);
                }}
              >
                <User className="h-4 w-4" />
                <span>Chatbot</span>
              </button>
              <form onSubmit={handleSearch} className="px-4">
                <div className="relative">
                  <Input
                    type="search"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pr-8"
                  />
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="absolute right-0 top-0 h-full" 
                    type="submit"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
