// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Heart, ArrowLeft } from "lucide-react";
// import { useShoppingCart } from "@/context/ShoppingCartContext";
// import { useWishlist } from "@/context/WishlistContext";
// import { cn } from "@/lib/utils";
// import { useDispatch } from "react-redux";
// import { AppDispatch, useAppSelector } from "@/store";
// import { fetchAllProducts } from "@/store/action/products";
// import { RootState } from "@/store/reducer";
// import { Product } from "@/store/types/products";
// import { fetchAllFeatures } from "@/store/action/feature";
// import { Feature } from "@/store/types/feature";
// import { moveWishlistlist } from "@/store/action/wishlist";
// import { HttpStatusCode } from "@/constants";
// import { UserDialog } from "@/components/userlogin";
// import { toast } from "react-toastify";
// import { fetchCartsListbyUserId } from "@/store/action/cart";

// const ProductDetailPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [selectedImageIndex, setSelectedImageIndex] = useState(0);
//   const [product, setProduct] = useState<Product>();
//   const dispatch = useDispatch<AppDispatch>();
//   const { products } = useAppSelector((state: RootState) => state.productSelector);
//   const { features } = useAppSelector((state: RootState) => state.featureSelector);
//   const { user } = useAppSelector((state:RootState)=> state.auth);
//   const [isFormOpen, setIsFormOpen] = useState(false);


//   useEffect(() => {
//     dispatch(fetchAllProducts());
//     dispatch(fetchAllFeatures());
//   }, [dispatch]);

//   useEffect(() => {
//     const filterprod = products.find((prod: Product) => prod.id === Number(id));
//     setProduct(filterprod);
//   }, [products, id]);

 

//   // If product doesn't exist, show error
//   if (!product) {
//     return (
//       <div className="bg-white min-h-screen font-sans">
//         <div className="container mx-auto px-4 py-12 text-center">
//           <h1 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h1>
//           <p className="text-gray-600 mb-6">The product you are looking for does not exist.</p>
//           <Button
//             onClick={() => navigate("/products")}
//             className="bg-black hover:bg-gray-600 text-white rounded-none px-6 py-2"
//           >
//             <ArrowLeft className="mr-2 h-4 w-4" /> Return to Products
//           </Button>
//         </div>
//       </div>
//     );
//   }


//   const handleAddToCart = async () => {
//     if (product.inStock && user?.id) {
//         try{
//           const result = await dispatch(
//                   moveWishlistlist({
//                     id: user?.id ?? 0,
//                     payload: {
//                       productId: product?.id,
//                       updatedBy: user?.id ?? 0,
//                     },
//                   })
//                 ).unwrap();
//                 if (result.statusCode === HttpStatusCode.OK) {
//                   toast.success(result?.message ?? "Product moved to cart successfully");
//                 } else {
//                   toast.error(result?.message ?? "Product has not moved to cart");
//                 }
//         }catch(error){
//           console.log(error)
//         }
//     }
//     else{
//       setIsFormOpen(true)
//     }
//   };

//   const handleWishlist = async () => {
//    if(user?.id){
//         try {
//                 console.log(id)
                
//                 const result = await dispatch(
//                   moveWishlistlist({
//                     id: user?.id ?? 0,
//                     payload: {
//                       productId: product.id,
//                       updatedBy: user?.id ?? 0,
//                     },
//                   })
//                 ).unwrap();
//                 if (result.statusCode === HttpStatusCode.OK) {
//                   toast.success(result?.message ?? "Product moved to cart successfully");
//                   dispatch(fetchCartsListbyUserId(user?.id ?? 0))
//                   dispatch(fetchAllProducts())
//                 } else {
//                   toast.error(result?.message ?? "Product has not moved to cart");
//                 }
//               } catch (error) {
//                 console.log(error);
//               }
//    }else{
//    setIsFormOpen(true)
//    }
//   };



//   return (
//     <div className="bg-white min-h-screen font-sans">
//       <div className="container mx-auto px-4 py-8">
//         {/* Back Button */}
//         <Button
//           variant="ghost"
//           className="mb-6 flex items-center text-gray-900 hover:text-gray-700"
//           onClick={() => navigate(-1)}
//         >
//           <ArrowLeft className="mr-2 h-4 w-4" /> Back
//         </Button>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Product Images */}
//           <div className="flex gap-4">
//             {/* Thumbnail Gallery */}
//             <div className="flex flex-col gap-2">
//               {["loco.png", "loco.png", "loco.png"].map((image, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setSelectedImageIndex(index)}
//                   className={cn(
//                     "h-24 w-24 rounded-sm border cursor-pointer" ,
//                     selectedImageIndex === index ? "border-gray-900" : "border-gray-200"
//                   )}
//                 >
//                   <img
//                     src={image}
//                     alt={`${product.name} - view ${index + 1}`}
//                     className="h-full w-full object-cover rounded-sm"
//                   />
//                 </button>
//               ))}
//             </div>
//             {/* Main Image */}
//             <div className="flex-1">
//               <img
//                 src={"loco.png"}
//                 alt={product.name}
//                 className="w-full h-auto object-contain"
//               />
//             </div>
//           </div>

//           {/* Product Info */}
//           <div className="space-y-4">
//             <div>
//               {/* <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
//                 {product.brand || "CITIZEN"}
//               </p> */}
//               <h1 className="text-2xl font-bold text-gray-900 mt-1">
//                 {product?.name}
//               </h1>
//               <p className="text-xl font-semibold text-gray-900 mt-2">
//                 ${product?.price.toLocaleString()}
//               </p>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex flex-col sm:flex-row gap-3">
//               <Button
//                 onClick={handleAddToCart}
//                 className="flex-1 cursor-pointer bg-black hover:bg-gray-600 text-white rounded-none py-3 text-sm font-medium uppercase tracking-wide"
//                 disabled={!product.inStock}
//               >
//                 {product.inStock ? "Add to Bag" : "Out of Stock"}
//               </Button>
//               <Button
//                 variant="outline"
//                 onClick={handleWishlist}
//                 className="border-gray-300 cursor-pointer hover:bg-gray-100 rounded-none py-3"
//               >
//                 <Heart
//                   // className={cn(
//                   //   "h-5 w-5",
//                   //   inWishlist && "fill-gray-900 text-gray-900"
//                   // )}
//                 />
//               </Button>
//             </div>

//             {/* Feature Icons */}
//             <div className="flex gap-4 mt-4">
//               <div className="flex items-center gap-1">
//                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-award-icon lucide-award"><path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"/><circle cx="12" cy="8" r="6"/></svg>
//                 <span className="text-sm text-gray-600">2 Year Warranty</span>
//               </div>
//               <div className="flex items-center gap-1">
//                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-container-icon lucide-container"><path d="M22 7.7c0-.6-.4-1.2-.8-1.5l-6.3-3.9a1.72 1.72 0 0 0-1.7 0l-10.3 6c-.5.2-.9.8-.9 1.4v6.6c0 .5.4 1.2.8 1.5l6.3 3.9a1.72 1.72 0 0 0 1.7 0l10.3-6c.5-.3.9-1 .9-1.5Z"/><path d="M10 21.9V14L2.1 9.1"/><path d="m10 14 11.9-6.9"/><path d="M14 19.8v-8.1"/><path d="M18 17.5V9.4"/></svg>
//                 <span className="text-sm text-gray-600">Free Shipping</span>
//               </div>
//               <div className="flex items-center gap-1">
//                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-archive-restore-icon lucide-archive-restore"><rect width="20" height="5" x="2" y="3" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h2"/><path d="M20 8v11a2 2 0 0 1-2 2h-2"/><path d="m9 15 3-3 3 3"/><path d="M12 12v9"/></svg>
//                 <span className="text-sm text-gray-600">Easy Returns</span>
//               </div>
//               <div className="flex items-center gap-1">
//                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-lock-icon lucide-lock"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
//                 <span className="text-sm text-gray-600">Secure Checkout</span>
//               </div>
//             </div>

//             {/* Description */}
//             <div className="mt-4">
//               <p className="text-gray-600 text-sm leading-relaxed">
//                 {product.description || "Explore the deepest depths with the latest Promaster Dive in a stylish new color combination, the must-have diving watch vibrantly features a silver-tone stainless steel case and orange 3-hand dial with date function, and luminous hands and markers."}
//               </p>
//               <button className="mt-2 cursor-pointer text-sm text-gray-900 underline hover:text-gray-700">
//                 Read More
//               </button>
//             </div>

//             {/* Features List */}
//             <div className="mt-4">
//               <h3 className="text-sm font-semibold text-gray-900 mb-2">Features:</h3>
//               <ul className="space-y-1 text-sm text-gray-600">
//                 {product.features.map((featureId: number) => {
//                   const fullFeature = features.find((f: Feature) => f.id === Number(featureId));
//                   return (
//                     <li key={featureId}>
//                       - {fullFeature?.name || "Unknown feature"}
//                     </li>
//                   );
//                 })}
//               </ul>
//             </div>
//           </div>
//         </div>

//         {/* Recommended Products */}
        
//       </div>
//       <UserDialog open={isFormOpen} onOpenChange={setIsFormOpen} />
//     </div>
//   );
// };

// export default ProductDetailPage;


import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, ArrowLeft } from "lucide-react";
import { useShoppingCart } from "@/context/ShoppingCartContext";
import { useWishlist } from "@/context/WishlistContext";
import { cn } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/store";
import { fetchAllProducts } from "@/store/action/products";
import { RootState } from "@/store/reducer";
import { Product } from "@/store/types/products";
import { fetchAllFeatures } from "@/store/action/feature";
import { Feature } from "@/store/types/feature";
import { moveWishlistlist } from "@/store/action/wishlist";
import { HttpStatusCode } from "@/constants";
import { UserDialog } from "@/components/userlogin";
import { toast } from "react-toastify";
import { fetchCartsListbyUserId } from "@/store/action/cart";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [product, setProduct] = useState<Product>();
  const dispatch = useDispatch<AppDispatch>();
  const { products } = useAppSelector((state: RootState) => state.productSelector);
  const { features } = useAppSelector((state: RootState) => state.featureSelector);
  const { user } = useAppSelector((state: RootState) => state.auth);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchAllProducts());
    dispatch(fetchAllFeatures());
  }, [dispatch]);

  useEffect(() => {
    const filterprod = products.find((prod: Product) => prod.id === Number(id));
    setProduct(filterprod);
  }, [products, id]);

  // If product doesn't exist, show error
  if (!product) {
    return (
      <div className="bg-white min-h-screen font-sans">
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-lg text-gray-600 mb-6">The product you are looking for does not exist.</p>
          <Button
            onClick={() => navigate("/products")}
            className="bg-blue-600 hover:bg-red-700 text-white rounded-full px-6 py-3 font-semibold"
            aria-label="Return to Products"
          >
            <ArrowLeft className="mr-2 h-5 w-5" /> Return to Products
          </Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = async () => {
    if (product.inStock && user?.id) {
      try {
        const result = await dispatch(
          moveWishlistlist({
            id: user?.id ?? 0,
            payload: {
              productId: product?.id,
              updatedBy: user?.id ?? 0,
            },
          })
        ).unwrap();
        if (result.statusCode === HttpStatusCode.OK) {
          toast.success(result?.message ?? "Product moved to cart successfully");
        } else {
          toast.error(result?.message ?? "Product has not moved to cart");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setIsFormOpen(true);
    }
  };

  const handleWishlist = async () => {
    if (user?.id) {
      try {
        const result = await dispatch(
          moveWishlistlist({
            id: user?.id ?? 0,
            payload: {
              productId: product.id,
              updatedBy: user?.id ?? 0,
            },
          })
        ).unwrap();
        if (result.statusCode === HttpStatusCode.OK) {
          toast.success(result?.message ?? "Product moved to cart successfully");
          dispatch(fetchCartsListbyUserId(user?.id ?? 0));
          dispatch(fetchAllProducts());
        } else {
          toast.error(result?.message ?? "Product has not moved to cart");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setIsFormOpen(true);
    }
  };

  return (
    <main className="bg-gray-50 min-h-screen font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <div className="mb-6 text-sm text-gray-600">
          <Link to="/" className="hover:text-blue-600">Home</Link> / <Link to="/products" className="hover:text-blue-600">Products</Link> / <span className="text-gray-900">{product.name}</span>
        </div>

        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-6 flex items-center text-gray-900 hover:text-blue-600 font-semibold"
          onClick={() => navigate(-1)}
          aria-label="Go back to previous page"
        >
          <ArrowLeft className="mr-2 h-5 w-5" /> Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Thumbnail Gallery */}
            <div className="flex sm:flex-col gap-3 order-2 sm:order-1">
              {["loco.png", "loco.png", "loco.png"].map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={cn(
                    "h-20 w-20 rounded-lg border-2 shadow-sm transition-all duration-300",
                    selectedImageIndex === index ? "border-blue-600 shadow-md" : "border-gray-200 hover:border-red-400"
                  )}
                  aria-label={`View image ${index + 1}`}
                >
                  <img
                    src={image}
                    alt={`${product.name} - view ${index + 1}`}
                    className="h-full w-full object-cover rounded-lg"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
            {/* Main Image */}
            <div className="flex-1 order-1 sm:order-2">
              <div className="relative rounded-xl overflow-hidden shadow-lg group">
                <img
                  src={"loco.png"}
                  alt={product.name}
                  className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{product?.name}</h1>
              <p className="text-2xl font-semibold text-gray-600 mt-2">${product?.price.toLocaleString()}</p>
              <p className="text-sm text-gray-500 mt-1">Inclusive of all taxes</p>
            </div>

            {/* Size Selector (Mocked) */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Select Size</h3>
              <div className="flex gap-2">
                {["S", "M", "L", "XL"].map((size) => (
                  <button
                    key={size}
                    className="px-4 py-2 border border-gray-300 rounded-full text-sm font-medium hover:border-blue-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    aria-label={`Select size ${size}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleAddToCart}
                className="flex-1 bg-blue-600 hover:bg-red-700 text-white rounded-full py-6 text-base font-semibold uppercase tracking-wide transform  transition-transform duration-300"
                disabled={!product.inStock}
                aria-label={product.inStock ? "Add to Bag" : "Out of Stock"}
              >
                {product.inStock ? "Add to Bag" : "Out of Stock"}
              </Button>
              <Button
                variant="outline"
                onClick={handleWishlist}
                className="border-blue-600 text-blue-600 hover:bg-red-50 hover:border-black-700 rounded-full py-6 px-6"
                aria-label="Add to Wishlist"
              >
                <Heart className="h-5 w-5" />
              </Button>
            </div>

            {/* Feature Icons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
              <div className="flex items-center gap-2 group">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-black-600 group-hover:scale-110 transition-transform duration-300"
                >
                  <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526" />
                  <circle cx="12" cy="8" r="6" />
                </svg>
                <span className="text-sm text-gray-600">2 Year Warranty</span>
              </div>
              <div className="flex items-center gap-2 group">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-black-600 group-hover:scale-110 transition-transform duration-300"
                >
                  <path d="M22 7.7c0-.6-.4-1.2-.8-1.5l-6.3-3.9a1.72 1.72 0 0 0-1.7 0l-10.3 6c-.5.2-.9.8-.9 1.4v6.6c0 .5.4 1.2.8 1.5l6.3 3.9a1.72 1.72 0 0 0 1.7 0l10.3-6c.5-.3.9-1 .9-1.5Z" />
                  <path d="M10 21.9V14L2.1 9.1" />
                  <path d="m10 14 11.9-6.9" />
                  <path d="M14 19.8v-8.1" />
                  <path d="M18 17.5V9.4" />
                </svg>
                <span className="text-sm text-gray-600">Free Shipping</span>
              </div>
              <div className="flex items-center gap-2 group">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-black-600 group-hover:scale-110 transition-transform duration-300"
                >
                  <rect width="20" height="5" x="2" y="3" rx="1" />
                  <path d="M4 8v11a2 2 0 0 0 2 2h2" />
                  <path d="M20 8v11a2 2 0 0 1-2 2h-2" />
                  <path d="m9 15 3-3 3 3" />
                  <path d="M12 12v9" />
                </svg>
                <span className="text-sm text-gray-600">Easy Returns</span>
              </div>
              <div className="flex items-center gap-2 group">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-black-600 group-hover:scale-110 transition-transform duration-300"
                >
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span className="text-sm text-gray-600">Secure Checkout</span>
              </div>
            </div>

            {/* Description */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Product Details</h3>
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                {product.description ||
                  "Explore the deepest depths with the latest Promaster Dive in a stylish new color combination, the must-have diving watch vibrantly features a silver-tone stainless steel case and orange 3-hand dial with date function, and luminous hands and markers."}
              </p>
              <button className="mt-2 text-sm text-blue-600 font-semibold hover:text-red-700 underline" aria-label="Read more about the product">
                Read More
              </button>
            </div>

            {/* Features List */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Features</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                {product.features.map((featureId: number) => {
                  const fullFeature = features.find((f: Feature) => f.id === Number(featureId));
                  return (
                    <li key={featureId} className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-blue-600"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      {fullFeature?.name || "Unknown feature"}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        {/* Recommended Products (Mocked) */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">You May Also Like</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {products.slice(0, 4).map((prod) => (
              <div key={prod.id} className="group rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                <img
                  src="loco.png"
                  alt={prod.name}
                  className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-gray-900 line-clamp-1">{prod.name}</h3>
                  <p className="text-sm text-gray-600">${prod.price.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <UserDialog open={isFormOpen} onOpenChange={setIsFormOpen} />

      {/* Sticky Add to Bag Button (Mobile Only) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 sm:hidden">
        <Button
          onClick={handleAddToCart}
          className="w-full bg-blue-600 hover:bg-red-700 text-white rounded-full py-4 text-base font-semibold uppercase tracking-wide"
          disabled={!product.inStock}
          aria-label={product.inStock ? "Add to Bag" : "Out of Stock"}
        >
          {product.inStock ? "Add to Bag" : "Out of Stock"}
        </Button>
      </div>
    </main>
  );
};

export default ProductDetailPage;