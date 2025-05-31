
import { MouseEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ShoppingCart,
  Heart,
  Search,
  Menu,
  X,
  User,
  Home,
  ChevronDown
} from "lucide-react";
import { useShoppingCart } from "@/context/ShoppingCartContext";
import { useWishlist } from "@/context/WishlistContext";
import { Badge } from "@/components/ui/badge";
import { useChatbot } from "@/context/ChatbotContext";
import { useAppSelector } from "@/store";
import { UserDialog } from "@/components/userlogin";

export function Navigation() {
  const { cartItems } = useShoppingCart();
  const { wishlistItems } = useWishlist();
  const { toggleChat } = useChatbot();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
    const [isInviteModalOpen, setInviteModalOpen] = useState<boolean>(false);
      const [isResetModalOpen, setResetModalOpen] = useState<boolean>(false);
    const [isConfirmModalOpen, setConfirmModalOpen] = useState<boolean>(false);


  const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
    // Here you would typically redirect to search results page
  };




  const handleSignOut = (e: React.MouseEvent) => {
    e.preventDefault();
    setDropdownOpen(false);
    setConfirmModalOpen(true);
  };

   const getUserData = () => {
    const userDataString = localStorage.getItem('user');
    if (userDataString) {
      try {
        return JSON.parse(userDataString);
      } catch (error) {
        console.error('Error parsing user data in Navbar:', error);
      }
    }

    return {
      username: 'User',
      role: 'user',
      // profileUrl: userlogo,
    };
  };
  const user = useAppSelector((state) => state.auth?.user);
  const navigate = useNavigate();

      useEffect(() => {
        const handleScroll = () => {
          if (window.scrollY > 10) {
            setIsScrolled(true);
          } else {
            setIsScrolled(false);
          }
        };
    
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }, []);


      const userData = getUserData();
        const displayName =
          userData.username || userData.userName || userData.name || 'User';
          const profileImage = userData.profileUrl || userData.picture;
          const userRole = userData.roleId ? `Role ID: ${userData.roleId}` : 'User';

  const checkLogin = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
      if(user === null){
        setIsFormOpen(true);
      }
      else{
        navigate('/wishlist')
      }
  }

  return (
    <>
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
          

          {/* Wishlist button */}
          <Link to="/wishlist" onClick={(e)=> checkLogin(e)}>
            <Button variant="ghost" size="icon" className="relative">
              <Heart className="h-5 w-5" />
              {wishlistItems.length > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-black text-white">
                  {wishlistItems.length}
                </Badge>
              )}
            </Button>
          </Link>

          {/* Cart button */}
          <Link to="/cart" >
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-black text-white">
                  {cartItemCount}
                </Badge>
              )}
            </Button>
          </Link>
            {/* Chat button */}
          {/* <Button 
            variant="ghost" 
            size="icon" 
            className="relative hidden md:flex"
          >
            <User className="h-5 w-5" />
          </Button> */}
           
            {
              user === null ? (
                <Button
                  variant="outline"
                  className="hidden md:flex"
                  onClick={() => {
                    setIsFormOpen(true);
                  }}
                >
                  Login
                </Button>
              ) : (
                 <div className="mainusernav">
                <div className="relative user-dropdown">
                  <div
                    className="flex items-center cursor-pointer"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    <div className="hidden sm:flex sm:flex-col sm:items-end sm:mr-3">
                      <span className="text-sm font-medium">{displayName}</span>
                      <span
                        className={`text-xs ${isScrolled ? 'text-gray-500' : 'text-gray-400'}`}
                      >
                        
                        {/* {userRole} */}
                      </span>
                    </div>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center overflow-hidden ${
                        isScrolled ? 'bg-gray-200' : 'bg-gray-700'
                      }`}
                    >
                      {/* <img
                        src={profileImage}
                        alt={displayName}
                        className="w-8 h-8 rounded-full object-cover"
                        // onError={(e) => (e.currentTarget.src = userlogo)}
                      /> */}
                    </div>
                    <ChevronDown
                      size={16}
                      className={`ml-1 hidden sm:block transition-transform duration-200 ${
                        dropdownOpen ? 'transform rotate-180' : ''
                      }`}
                    />
                  </div>
                  <div
                    className={`absolute right-0 mt-4 w-48 rounded-md shadow-lg py-1 transition-all duration-200 transform origin-top-right ${
                      dropdownOpen
                        ? 'scale-100 opacity-100'
                        : 'scale-95 opacity-0 pointer-events-none'
                    } ${
                      isScrolled
                        ? 'bg-white ring-1 ring-black ring-opacity-5'
                        : 'bg-gray-800'
                    }`}
                  >
                    <p
                      className={`block px-4 py-2 text-sm transition-colors duration-200 ${
                        isScrolled
                          ? 'text-gray-700 hover:bg-gray-100'
                          : 'text-gray-200 hover:bg-gray-700'
                      }`}
                    >
                      Profile
                    </p>
                    <p
                      onClick={(e) => {
                        e.preventDefault();
                        setDropdownOpen(false);
                        setInviteModalOpen(true);
                      }}
                      className={`block px-4 py-2 text-sm transition-colors duration-200 ${
                        isScrolled
                          ? 'text-gray-700 hover:bg-gray-100'
                          : 'text-gray-200 hover:bg-gray-700'
                      }`}
                    >
                      Invite User
                    </p>
                    {user && (
                      <p
                        onClick={() => {
                          setDropdownOpen(false);
                          setResetModalOpen(true);
                        }}
                        className={`block px-4 py-2 text-sm transition-colors duration-200 ${
                          isScrolled
                            ? 'text-gray-700 hover:bg-gray-100'
                            : 'text-gray-200 hover:bg-gray-700'
                        }`}
                      >
                        Reset Password
                      </p>
                    )}
                    <p
                      onClick={handleSignOut}
                      className={`block px-4 py-2 text-sm transition-colors duration-200 ${
                        isScrolled
                          ? 'text-gray-700 hover:bg-gray-100'
                          : 'text-gray-200 hover:bg-gray-700'
                      }`}
                    >
                      Logout
                    </p>
                  </div>
                  </div>
            </div>
              )
            }

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

      {/* dialog box */}
        <UserDialog open={isFormOpen} onOpenChange={setIsFormOpen} 
        />

    </>
    

  );
}
