// import {
//   Routes,
//   Route,
//   BrowserRouter,
//   // Navigate,
// } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import store from './store';
// import Login from './components/login';
// import RegistrationForm from './components/register-form';
// import ForgotPassword from './components/forgot-password';
// import './App.css';
// import ChangePassword from './components/change-password';
// import Dashboard from './pages/dashboard';
// import { AuthProvider } from './components/login/authState';
// import PrivateRoute from './axios-setup/private-route';
// import GoogleAuthSuccess from './components/login/googleSignIn';
// import GitHubAuthSuccess from './components/login/githubSignIn';
// import Loader from './components/loader/loader';
// import CartPage from './pages/cart/CartPage';
// import NotFound from './pages/notfound/NotFound';
// import WishlistPage from './pages/product/WishlistPage';
// import ProductDetailPage from './pages/product/ProductDetailPage';
// import ProductsPage from './pages/product/ProductsPage';
// import HomePage from './pages/home/HomePage';
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ChatbotProvider } from './context/ChatbotContext';
// import { WishlistProvider } from './context/WishlistContext';
// import { ShoppingCartProvider } from './context/ShoppingCartContext';
// import { TooltipProvider } from './components/ui/tooltip';
// import { Navigation } from './components/Navigation';
// import { Chatbot } from './components/chatbot/Chatbot';
// import { Footer } from './components/Footer';
// // import Navbar from './components/navbar';
// import { AdminLogin } from './components/admin/Auth/AdminLogin';


// const queryClient = new QueryClient();


// const App = () => {
//   const location = window.location.pathname;
//   const isLoginPage = location === '/admin';
//   return (
//     <Provider store={store}>
//        <QueryClientProvider client={queryClient}>
//           <TooltipProvider>
//             <ShoppingCartProvider>
//               <WishlistProvider>
//                 <ChatbotProvider>
//                   <BrowserRouter>
//                    <AuthProvider>
//                        { isLoginPage ? <Navigation /> : <></>}
//                         {/* <Navbar/> */}
//                         <Routes>
//                           <Route path="/login" element={<Login />} />
//                           <Route path="/registerform" element={<RegistrationForm />} />
//                           <Route path="/loader" element={<Loader />} />
//                           <Route path="/forgotpassword" element={<ForgotPassword />} />
//                           <Route path="/change" element={<ChangePassword />} />
//                           <Route
//                             path="/dashboard"
//                             element={<PrivateRoute element={<Dashboard />} />}
//                           />
//                           <Route
//                             path="/google-auth-success"
//                             element={<GoogleAuthSuccess />}
//                           />
//                           <Route
//                             path="/github-auth-success"
//                             element={<GitHubAuthSuccess />}
//                           />
//                         {/* <Route path="*" element={<Navigate to="/login" />} />  */}
//                           <Route path="/" element={<HomePage />} />
//                           <Route path="/products" element={<ProductsPage />} />
//                           <Route path="/products/:id" element={<ProductDetailPage />} />
//                           <Route path="/wishlist" element={<WishlistPage />} />
//                           <Route path="/cart" element={<CartPage />} />
//                           <Route path="*" element={<NotFound />} />
//                           <Route path="/admin/login" element={<AdminLogin />} />
//                         </Routes>
//                         <Footer />
//                         <Chatbot />
//                     </AuthProvider>
//                   </BrowserRouter>
//                 </ChatbotProvider>
//               </WishlistProvider>
//             </ShoppingCartProvider>
//           </TooltipProvider>
//         </QueryClientProvider>
//     </Provider>
//   );
// };

// export default App;


import {
  Routes,
  Route,
  BrowserRouter,
  useLocation,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store, { useAppSelector } from './store';
import './App.css';
import { AdminHeader } from './components/layouts/AdminHeader';
import Login from './components/login';
import RegistrationForm from './components/register-form';
import ForgotPassword from './components/forgot-password';
import ChangePassword from './components/change-password';
import Dashboard from './pages/dashboard';
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
import { AdminLogin } from './components/admin/Auth/AdminLogin';
import { FeatureList } from './components/admin/feature/FeatureList';
import { Navigation } from './components/navbar/Navigation';
import { Footer } from './components/Footer';
import { Chatbot } from './components/chatbot/Chatbot';
import  {DashboardOverview}  from './components/admin/Dashboard/DashboardOverview';  
import { AuthProvider } from './components/login/authState';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChatbotProvider } from './context/ChatbotContext';
import { WishlistProvider } from './context/WishlistContext';
import { ShoppingCartProvider } from './context/ShoppingCartContext';
import { TooltipProvider } from './components/ui/tooltip';
import  {ProductsList}  from './components/admin/Products/ProductsList';
import  {ToastContainer}  from 'react-toastify';

// Component to wrap routes and apply conditional layout
const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute ? <Navigation /> : <AdminHeader />}
      {children}
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <Chatbot />}
    </>
  );
};

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
                    <ToastContainer/>
                    <LayoutWrapper>
                      <Routes>
                        {/* Admin routes */}
                        <Route path="/admin/login" element={<AdminLogin />} />
                        <Route path="/admin/dashboard" element={<DashboardOverview />} />
                        <Route path="/admin/products" element={<ProductsList />} />
                        <Route path="/admin/features" element={<FeatureList />} />
                         {/*<Route path="/admin/dashboard" element={<DashboardOverview />} />
                        <Route path="/admin/dashboard" element={<DashboardOverview />} /> */}


                        {/* Public/User routes */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/registerform" element={<RegistrationForm />} />
                        <Route path="/loader" element={<Loader />} />
                        <Route path="/forgotpassword" element={<ForgotPassword />} />
                        <Route path="/change" element={<ChangePassword />} />
                        <Route
                          path="/dashboard"
                          element={<PrivateRoute element={<Dashboard />} />}
                        />
                        <Route path="/google-auth-success" element={<GoogleAuthSuccess />} />
                        <Route path="/github-auth-success" element={<GitHubAuthSuccess />} />
                        <Route path="/" element={<HomePage />} />
                        <Route path="/products" element={<ProductsPage />} />
                        <Route path="/products/:id" element={<ProductDetailPage />} />
                        <Route path="/wishlist" element={<WishlistPage />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </LayoutWrapper>
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
