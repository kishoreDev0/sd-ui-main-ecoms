// import { MouseEvent, useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   ShoppingCart,
//   Heart,
//   Search,
//   Menu,
//   X,
//   User,
//   Home,
//   ChevronDown,
// } from "lucide-react";
// import { useShoppingCart } from "@/context/ShoppingCartContext";
// import { useWishlist } from "@/context/WishlistContext";
// import { useChatbot } from "@/context/ChatbotContext";
// import { useAppSelector } from "@/store";
// import { Badge } from "@/components/ui/badge";
// import { UserDialog } from "@/components/userlogin";

// export function Navigation() {
//   const { cartItems } = useShoppingCart();
//   const { wishlistItems } = useWishlist();
//   const { toggleChat } = useChatbot();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isScrolled, setIsScrolled] = useState<boolean>(false);
//   const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
//   const [categoryOpen, setCategoryOpen] = useState<boolean>(false); // New state for category dropdown
//   const [isFormOpen, setIsFormOpen] = useState(false);
//   const [isInviteModalOpen, setInviteModalOpen] = useState<boolean>(false);
//   const [isResetModalOpen, setResetModalOpen] = useState<boolean>(false);
//   const [isConfirmModalOpen, setConfirmModalOpen] = useState<boolean>(false);

//   const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0);
//   const navigate = useNavigate();

//   // Scroll effect for header shadow
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 10);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("Searching for:", searchTerm);
//   };

//   const handleSignOut = (e: React.MouseEvent) => {
//     e.preventDefault();
//     setDropdownOpen(false);
//     setConfirmModalOpen(true);
//   };

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const getUserData = () => {
//     const userDataString = localStorage.getItem("user");
//     if (userDataString) {
//       try {
//         return JSON.parse(userDataString);
//       } catch (error) {
//         console.error("Error parsing user data in Navbar:", error);
//       }
//     }
//     return {
//       username: "User",
//       role: "user",
//     };
//   };

//   const user = useAppSelector((state) => state.auth?.user);
//   const userData = getUserData();
//   const displayName = userData.username || userData.userName || userData.name || "User";
//   const profileImage = userData.profileUrl || userData.picture || "";
//   const userRole = userData.roleId ? `Role ID: ${userData.roleId}` : "User";

//   const checkLogin = (e: React.MouseEvent<HTMLAnchorElement>) => {
//     e.preventDefault();
//     if (user === null) {
//       setIsFormOpen(true);
//     } else {
//       navigate("/wishlist");
//     }
//   };

//   // Sample categories for the dropdown (mimicking Amazon’s category selector)
//   const categories = [
//     "Allocs",
//     "Books",
//     "Electronics",
//     "Clothing",
//     "Home & Kitchen",
//   ];

//   return (
//     <>
//       {/* Amazon-inspired header with dark background and shadow */}
//       <header
//         className={`sticky top-0 z-50 w-full transition-all duration-300 ${
//           isScrolled ? "bg-gray-900 shadow-md" : "bg-gray-900"
//         } border-b border-gray-700`}
//       >
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
//           <div className="flex items-center justify-between">
//             {/* Logo mimicking Amazon’s compact style */}
//             <Link to="/" className="flex items-center group">
//               <h1 className="text-2xl font-bold text-white tracking-tight group-hover:text-orange-500 transition-colors">
//                 Deflux
//               </h1>
//             </Link>

//             {/* Prominent search bar with category dropdown */}
//             <div className="flex-1 mx-4 max-w-3xl">
//               <form onSubmit={handleSearch} className="flex items-center">
//                 {/* Category dropdown */}
//                 <div className="relative">
//                   <Button
//                     variant="outline"
//                     className="rounded-l-full border-gray-600 bg-gray-800 text-white hover:bg-gray-700"
//                     onClick={() => setCategoryOpen(!categoryOpen)}
//                   >
//                     All
//                     <ChevronDown className="ml-1 h-4 w-4" />
//                   </Button>
//                   <div
//                     className={`absolute left-0 mt-1 w-48 rounded-md shadow-lg bg-gray-800 border border-gray-700 transition-all duration-200 transform origin-top-left ${
//                       categoryOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
//                     }`}
//                   >
//                     {categories.map((category) => (
//                       <button
//                         key={category}
//                         className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
//                         onClick={() => {
//                           console.log("Selected category:", category);
//                           setCategoryOpen(false);
//                         }}
//                       >
//                         {category}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//                 <Input
//                   type="search"
//                   placeholder="Search Deflux"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="rounded-none bg-white text-gray-900 focus:ring-2 focus:ring-orange-500"
//                 />
//                 <Button
//                   size="icon"
//                   className="rounded-r-full bg-orange-500 hover:bg-orange-600 text-white"
//                   type="submit"
//                 >
//                   <Search className="h-5 w-5" />
//                 </Button>
//               </form>
//             </div>

//             {/* Right Side Icons */}
//             <div className="flex items-center gap-2">
//               {/* Wishlist button */}
//               <Link to="/wishlist" onClick={checkLogin}>
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   className="relative text-white hover:bg-gray-800 rounded-full transition-transform hover:scale-105"
//                 >
//                   <Heart className="h-5 w-5" />
//                   {wishlistItems.length > 0 && (
//                     <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center bg-orange-500 text-white text-xs font-semibold">
//                       {wishlistItems.length}
//                     </Badge>
//                   )}
//                 </Button>
//               </Link>

//               {/* Cart button */}
//               <Link to="/cart">
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   className="relative text-white hover:bg-gray-800 rounded-full transition-transform hover:scale-105"
//                 >
//                   <ShoppingCart className="h-5 w-5" />
//                   {cartItemCount > 0 && (
//                     <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center bg-orange-500 text-white text-xs font-semibold">
//                       {cartItemCount}
//                     </Badge>
//                   )}
//                 </Button>
//               </Link>

//               {/* User section */}
//               {user === null ? (
//                 <Button
//                   variant="ghost"
//                   className="hidden md:flex text-white hover:bg-gray-800 rounded-full"
//                   onClick={() => setIsFormOpen(true)}
//                 >
//                   Sign In
//                 </Button>
//               ) : (
//                 <div className="relative">
//                   <div
//                     className="flex items-center cursor-pointer gap-2 p-2 rounded-full hover:bg-gray-800"
//                     onClick={() => setDropdownOpen(!dropdownOpen)}
//                   >
//                     <div className="hidden sm:flex flex-col items-end">
//                       <span className="text-sm font-medium text-white">Hello, {displayName}</span>
//                       <span className="text-xs text-gray-400">Account & Lists</span>
//                     </div>
//                     <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden border-2 border-gray-600">
//                       <img
//                         src={profileImage}
//                         alt={displayName}
//                         className="w-full h-full object-cover"
//                         // onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/32")}
//                       />
//                     </div>
//                     <ChevronDown
//                       size={16}
//                       className="hidden sm:block transition-transform duration-300 text-white"
//                     />
//                   </div>
//                   <div
//                     className={`absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-gray-800 border border-gray-700 transition-all duration-200 transform origin-top-right ${
//                       dropdownOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
//                     }`}
//                   >
//                     <Link
//                       to="/profile"
//                       className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
//                     >
//                       Your Profile
//                     </Link>
//                     <button
//                       onClick={(e) => {
//                         e.preventDefault();
//                         setDropdownOpen(false);
//                         setInviteModalOpen(true);
//                       }}
//                       className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
//                     >
//                       Invite User
//                     </button>
//                     {user && (
//                       <button
//                         onClick={() => {
//                           setDropdownOpen(false);
//                           setResetModalOpen(true);
//                         }}
//                         className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
//                       >
//                         Reset Password
//                       </button>
//                     )}
//                     <button
//                       onClick={handleSignOut}
//                       className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
//                     >
//                       Sign Out
//                     </button>
//                   </div>
//                 </div>
//               )}

//               {/* Mobile menu button */}
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="md:hidden text-white hover:bg-gray-800 rounded-full"
//                 onClick={toggleMenu}
//               >
//                 {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//               </Button>
//             </div>
//           </div>

//           {/* Mobile menu with full-screen slide-in */}
//           {isMenuOpen && (
//             <div className="md:hidden fixed inset-0 top-[60px] bg-gray-900 text-white animate-slide-in-right">
//               <div className="flex flex-col p-6 space-y-4">
//                 <div className="mb-4">
//                   {user ? (
//                     <div className="flex items-center gap-3">
//                       <div className="w-10 h-10 rounded-full border-2 border-gray-600 overflow-hidden">
//                         <img
//                           src={profileImage}
//                           alt={displayName}
//                           className="w-full h-full object-cover"
//                           // onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/32")}
//                         />
//                       </div>
//                       <div>
//                         <p className="text-lg font-medium">Hello, {displayName}</p>
//                         <p className="text-sm text-gray-400">{userRole}</p>
//                       </div>
//                     </div>
//                   ) : (
//                     <Button
//                       variant="outline"
//                       className="w-full border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
//                       onClick={() => setIsFormOpen(true)}
//                     >
//                       Sign In
//                     </Button>
//                   )}
//                 </div>
//                 <Link
//                   to="/"
//                   className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-gray-800 text-lg"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   <Home className="h-5 w-5" />
//                   <span>Home</span>
//                 </Link>
//                 <Link
//                   to="/products"
//                   className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-gray-800 text-lg"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   <Search className="h-5 w-5" />
//                   <span>All Products</span>
//                 </Link>
//                 <Link
//                   to="/wishlist"
//                   className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-gray-800 text-lg"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   <Heart className="h-5 w-5" />
//                   <span>Your Wishlist</span>
//                 </Link>
//                 <Link
//                   to="/cart"
//                   className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-gray-800 text-lg"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   <ShoppingCart className="h-5 w-5" />
//                   <span>Your Cart</span>
//                 </Link>
//                 <button
//                   className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-gray-800 text-lg"
//                   onClick={() => {
//                     toggleChat();
//                     setIsMenuOpen(false);
//                   }}
//                 >
//                   <User className="h-5 w-5" />
//                   <span>Chatbot</span>
//                 </button>
//                 {/* Category section */}
//                 <div className="pt-4 border-t border-gray-700">
//                   <p className="text-sm font-semibold text-gray-400 mb-2">Shop by Category</p>
//                   {categories.map((category) => (
//                     <button
//                       key={category}
//                       className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-800"
//                       onClick={() => {
//                         console.log("Selected category:", category);
//                         setIsMenuOpen(false);
//                       }}
//                     >
//                       {category}
//                     </button>
//                   ))}
//                 </div>
//                 <form onSubmit={handleSearch} className="relative mt-4">
//                   <Input
//                     type="search"
//                     placeholder="Search Deflux"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="w-full pr-12 bg-white text-gray-900 rounded-md focus:ring-2 focus:ring-orange-500"
//                   />
//                   <Button
//                     size="icon"
//                     className="absolute right-0 top-0 h-full bg-orange-500 hover:bg-orange-600 text-white rounded-r-md"
//                     type="submit"
//                   >
//                     <Search className="h-5 w-5" />
//                   </Button>
//                 </form>
//               </div>
//             </div>
//           )}
//         </div>
//       </header>

//       {/* User dialog */}
//       <UserDialog open={isFormOpen} onOpenChange={setIsFormOpen} />
//     </>
//   );
// }

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
  ChevronDown,
  UserPlus,
  Key,
  LogOut,
  Send,
} from "lucide-react";
import { useShoppingCart } from "@/context/ShoppingCartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useChatbot } from "@/context/ChatbotContext";
import { useAppSelector, AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { Badge } from "@/components/ui/badge";
import { UserDialog } from "@/components/userlogin";
import { toast } from "react-toastify";
import { HttpStatusCode } from "@/constants";
import { RootState } from "@/store/reducer";

// Placeholder API functions (to be replaced with actual API calls)
const inviteUserApi = async (email: string, invitedBy: number) => {
  return { statusCode: HttpStatusCode.OK, message: "Invitation sent successfully" };
};

const resetPasswordApi = async (email: string) => {
  return { statusCode: HttpStatusCode.OK, message: "Password reset link sent successfully" };
};

export function Navigation() {
  const { cartItems } = useShoppingCart();
  const { wishlistItems } = useWishlist();
  const { toggleChat } = useChatbot();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [categoryOpen, setCategoryOpen] = useState<boolean>(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isInviteModalOpen, setInviteModalOpen] = useState<boolean>(false);
  const [isResetModalOpen, setResetModalOpen] = useState<boolean>(false);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState<boolean>(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [resetEmail, setResetEmail] = useState("");

  const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
  };

  const handleSignOut = async (e: React.MouseEvent) => {
    e.preventDefault();
    setDropdownOpen(false);
    setConfirmModalOpen(true);
  };

  const confirmSignOut = async () => {
    try {
      // await dispatch(logout()).unwrap();
      toast.success("Signed out successfully");
      navigate("/login");
      setConfirmModalOpen(false);
    } catch (error) {
      toast.error("Error signing out");
      setConfirmModalOpen(false);
    }
  };

  const handleInviteUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail) {
      toast.error("Please enter an email address");
      return;
    }
    try {
      const result = await inviteUserApi(inviteEmail, user?.id || 0);
      if (result.statusCode === HttpStatusCode.OK) {
        toast.success(result.message);
        setInviteEmail("");
        setInviteModalOpen(false);
      } else {
        toast.error("Failed to send invitation");
      }
    } catch (error) {
      toast.error("Error sending invitation");
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail) {
      toast.error("Please enter your email address");
      return;
    }
    try {
      const result = await resetPasswordApi(resetEmail);
      if (result.statusCode === HttpStatusCode.OK) {
        toast.success(result.message);
        setResetEmail("");
        setResetModalOpen(false);
      } else {
        toast.error("Failed to send reset link");
      }
    } catch (error) {
      toast.error("Error sending reset link");
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

 

  const { user } = useAppSelector((state:RootState)=> state.auth)
  const displayName = user?.firstName ||  "User";
  // const profileImage = userData.firstName || userData.picture || "";
  // const userRole = userData.roleId ? `Role ID: ${userData.roleId}` : "User";

  const checkLogin = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (user === null) {
      setIsFormOpen(true);
    } else {
      navigate("/wishlist");
    }
  };

  const categories = [
    "Allocs",
    "Books",
    "Electronics",
    "Clothing",
    "Home & Kitchen",
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled ? "bg-gray-900 shadow-md" : "bg-gray-900"
        } border-b border-gray-700`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center group">
              <h1 className="text-2xl font-bold text-white tracking-tight group-hover:text-red-500 transition-colors">
                Deflux
              </h1>
            </Link>

            <div className="flex-1 mx-4 max-w-3xl">
              <form onSubmit={handleSearch} className="flex items-center">
                <div className="relative">
                  <Button
                    variant="outline"
                    className="rounded-l-full border-gray-600 bg-gray-800 text-white hover:bg-gray-700"
                    onClick={() => setCategoryOpen(!categoryOpen)}
                  >
                    All
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                  <div
                    className={`absolute left-0 mt-1 w-48 rounded-md shadow-lg bg-gray-800 border border-gray-700 transition-all duration-200 transform origin-top-left ${
                      categoryOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
                    }`}
                  >
                    {categories.map((category) => (
                      <button
                        key={category}
                        className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
                        onClick={() => {
                          console.log("Selected category:", category);
                          setCategoryOpen(false);
                        }}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
                <Input
                  type="search"
                  placeholder="Search Deflux"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="rounded-none bg-white text-gray-900 focus:ring-2 focus:ring-red-500"
                />
                <Button
                  size="icon"
                  className="rounded-r-full bg-red-600 hover:bg-red-700 text-white"
                  type="submit"
                >
                  <Search className="h-5 w-5" />
                </Button>
              </form>
            </div>

            <div className="flex items-center gap-2">
              <Link to="/wishlist" onClick={checkLogin}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative text-white hover:bg-gray-800 rounded-full transition-transform hover:scale-105"
                >
                  <Heart className="h-5 w-5" />
                  {wishlistItems.length > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center bg-red-600 text-white text-xs font-semibold">
                      {wishlistItems.length}
                    </Badge>
                  )}
                </Button>
              </Link>

              <Link to="/cart">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative text-white hover:bg-gray-800 rounded-full transition-transform hover:scale-105"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {cartItemCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center bg-red-600 text-white text-xs font-semibold">
                      {cartItemCount}
                    </Badge>
                  )}
                </Button>
              </Link>

              {user === null ? (
                <Button
                  variant="ghost"
                  className="hidden md:flex text-white hover:bg-gray-800 rounded-full"
                  onClick={() => setIsFormOpen(true)}
                >
                  Sign In
                </Button>
              ) : (
                <div className="relative">
                  <div
                    className="flex items-center cursor-pointer gap-2 p-2 rounded-full hover:bg-gray-800"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    <div className="hidden sm:flex flex-col items-end">
                      <span className="text-sm font-medium text-white">Hello, {displayName}</span>
                      <span className="text-xs text-gray-400">Account & Lists</span>
                    </div>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden border-2 border-gray-600">
                      <img
                        src={'profileImage'}
                        alt={displayName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <ChevronDown
                      size={16}
                      className="hidden sm:block transition-transform duration-300 text-white"
                    />
                  </div>
                  <div
                    className={`absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-gray-800 border border-gray-700 transition-all duration-200 transform origin-top-right ${
                      dropdownOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
                    }`}
                  >
                    <Link
                      to="/account"
                      className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Your Profile
                    </Link>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setDropdownOpen(false);
                        setInviteModalOpen(true);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
                    >
                      Invite User
                    </button>
                    {user && (
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          setResetModalOpen(true);
                          setResetEmail(user?.email || "");
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
                      >
                        Reset Password
                      </button>
                    )}
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}

              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-white hover:bg-gray-800 rounded-full"
                onClick={toggleMenu}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden fixed inset-0 top-[60px] bg-gray-900 text-white animate-slide-in-right">
              <div className="flex flex-col p-6 space-y-4">
                <div className="mb-4">
                  {user ? (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full border-2 border-gray-600 overflow-hidden">
                        <img
                          src={'profileImage'}
                          alt={displayName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-lg font-medium">Hello, {displayName}</p>
                        <p className="text-sm text-gray-400">{'userRole'}</p>
                      </div>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      className="w-full border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded-md"
                      onClick={() => setIsFormOpen(true)}
                    >
                      Sign In
                    </Button>
                  )}
                </div>
                <Link
                  to="/"
                  className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-gray-800 text-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Home className="h-5 w-5" />
                  <span>Home</span>
                </Link>
                <Link
                  to="/products"
                  className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-gray-800 text-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Search className="h-5 w-5" />
                  <span>All Products</span>
                </Link>
                <Link
                  to="/wishlist"
                  className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-gray-800 text-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Heart className="h-5 w-5" />
                  <span>Your Wishlist</span>
                </Link>
                <Link
                  to="/cart"
                  className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-gray-800 text-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Your Cart</span>
                </Link>
                <Link
                  to="/account"
                  className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-gray-800 text-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="h-5 w-5" />
                  <span>My Account</span>
                </Link>
                <button
                  className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-gray-800 text-lg"
                  onClick={() => {
                    toggleChat();
                    setIsMenuOpen(false);
                  }}
                >
                  <User className="h-5 w-5" />
                  <span>Chatbot</span>
                </button>
                <div className="pt-4 border-t border-gray-700">
                  <p className="text-sm font-semibold text-gray-400 mb-2">Shop by Category</p>
                  {categories.map((category) => (
                    <button
                      key={category}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-800"
                      onClick={() => {
                        console.log("Selected category:", category);
                        setIsMenuOpen(false);
                      }}
                    >
                      {category}
                    </button>
                  ))}
                </div>
                <form onSubmit={handleSearch} className="relative mt-4">
                  <Input
                    type="search"
                    placeholder="Search Deflux"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pr-12 bg-white text-gray-900 rounded-md focus:ring-2 focus:ring-red-500"
                  />
                  <Button
                    size="icon"
                    className="absolute right-0 top-0 h-full bg-red-600 hover:bg-red-700 text-white rounded-r-md"
                    type="submit"
                  >
                    <Search className="h-5 w-5" />
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Invite User Modal */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-md p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Invite a Friend</h2>
            <form onSubmit={handleInviteUser} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-900 mb-1 block">Email</label>
                <Input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="Enter friend's email"
                  className="border-gray-300 rounded-md text-sm"
                />
              </div>
              <div className="flex gap-3">
                <Button
                  type="submit"
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-md py-2 text-sm font-medium"
                >
                  <Send className="h-4 w-4 mr-2" /> Send Invite
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setInviteModalOpen(false)}
                  className="flex-1 border-gray-300 text-gray-900 hover:bg-gray-100 rounded-md py-2 text-sm font-medium"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reset Password Modal */}
      {isResetModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-md p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Reset Password</h2>
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-900 mb-1 block">Email</label>
                <Input
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="border-gray-300 rounded-md text-sm"
                />
              </div>
              <div className="flex gap-3">
                <Button
                  type="submit"
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-md py-2 text-sm font-medium"
                >
                  <Send className="h-4 w-4 mr-2" /> Send Reset Link
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setResetModalOpen(false)}
                  className="flex-1 border-gray-300 text-gray-900 hover:bg-gray-100 rounded-md py-2 text-sm font-medium"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Sign Out Confirmation Modal */}
      {isConfirmModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-md p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Confirm Sign Out</h2>
            <p className="text-sm text-gray-600 mb-6">Are you sure you want to sign out?</p>
            <div className="flex gap-3">
              <Button
                onClick={confirmSignOut}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-md py-2 text-sm font-medium"
              >
                <LogOut className="h-4 w-4 mr-2" /> Sign Out
              </Button>
              <Button
                variant="outline"
                onClick={() => setConfirmModalOpen(false)}
                className="flex-1 border-gray-300 text-gray-900 hover:bg-gray-100 rounded-md py-2 text-sm font-medium"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      <UserDialog open={isFormOpen} onOpenChange={setIsFormOpen} />
    </>
  );
}