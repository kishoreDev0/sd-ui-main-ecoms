import {
  Routes,
  Route,
  BrowserRouter,
  // Navigate,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Login from './components/login';
import RegistrationForm from './components/register-form';
import ForgotPassword from './components/forgot-password';
import './App.css';
import ChangePassword from './components/change-password';
import Dashboard from './pages/dashboard';
import { AuthProvider } from './components/login/authState';
import PrivateRoute from './axios-setup/private-route';
import GoogleAuthSuccess from './components/login/googleSignIn';
import GitHubAuthSuccess from './components/login/githubSignIn';
import Loader from './components/loader/loader';
import CartPage from './pages/cart/CartPage';
import NotFound from './pages/notfound/NotFound';
import WishlistPage from './pages/product/WishlistPage';
import ProductDetailPage from './pages/product/ProductDetailPage';
import ProductsPage from './pages/product/ProductsPage';
import HomePage from './pages/home/HomePage';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChatbotProvider } from './context/ChatbotContext';
import { WishlistProvider } from './context/WishlistContext';
import { ShoppingCartProvider } from './context/ShoppingCartContext';
import { TooltipProvider } from './components/ui/tooltip';
import { Navigation } from './components/Navigation';
import { Chatbot } from './components/chatbot/Chatbot';
import { Footer } from './components/Footer';
import Navbar from './components/navbar';


const queryClient = new QueryClient();


const App = () => {
  return (
    <Provider store={store}>
       <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <ShoppingCartProvider>
              <WishlistProvider>
                <ChatbotProvider>
                  <BrowserRouter>
                   <AuthProvider>
                        <Navigation />
                        <Navbar/>
                        <Routes>
                          <Route path="/login" element={<Login />} />
                          <Route path="/registerform" element={<RegistrationForm />} />
                          <Route path="/loader" element={<Loader />} />
                          <Route path="/forgotpassword" element={<ForgotPassword />} />
                          <Route path="/change" element={<ChangePassword />} />
                          <Route
                            path="/dashboard"
                            element={<PrivateRoute element={<Dashboard />} />}
                          />
                          <Route
                            path="/google-auth-success"
                            element={<GoogleAuthSuccess />}
                          />
                          <Route
                            path="/github-auth-success"
                            element={<GitHubAuthSuccess />}
                          />
                        {/* <Route path="*" element={<Navigate to="/login" />} />  */}
                          <Route path="/" element={<HomePage />} />
                          <Route path="/products" element={<ProductsPage />} />
                          <Route path="/products/:id" element={<ProductDetailPage />} />
                          <Route path="/wishlist" element={<WishlistPage />} />
                          <Route path="/cart" element={<CartPage />} />
                          <Route path="*" element={<NotFound />} />
                        </Routes>
                        <Footer />
                        <Chatbot />
                    </AuthProvider>
                  </BrowserRouter>
                </ChatbotProvider>
              </WishlistProvider>
            </ShoppingCartProvider>
          </TooltipProvider>
        </QueryClientProvider>
    </Provider>
  );
};

export default App;
