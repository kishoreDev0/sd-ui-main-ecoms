import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, ArrowLeft } from "lucide-react";
import { useShoppingCart } from "@/context/ShoppingCartContext";
import { useWishlist } from "@/context/WishlistContext";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/store";
import { fetchAllProducts } from "@/store/action/products";
import { RootState } from "@/store/reducer";
import { Product } from "@/store/types/products";
import { fetchAllFeatures } from "@/store/action/feature";
import { Feature } from "@/store/types/feature";
import { moveWishlistlist } from "@/store/action/wishlist";
import { HttpStatusCode } from "@/constants";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [product, setProduct] = useState<Product>();
  const dispatch = useDispatch<AppDispatch>();
  const { products } = useAppSelector((state: RootState) => state.productSelector);
  const { features } = useAppSelector((state: RootState) => state.featureSelector);
  const { user } = useAppSelector((state:RootState)=> state.auth)

  useEffect(() => {
    dispatch(fetchAllProducts());
    dispatch(fetchAllFeatures());
  }, [dispatch]);

  useEffect(() => {
    const filterprod = products.find((prod: Product) => prod.id === Number(id));
    setProduct(filterprod);
  }, [products, id]);

  const { addToCart } = useShoppingCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  // If product doesn't exist, show error
  if (!product) {
    return (
      <div className="bg-white min-h-screen font-sans">
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-6">The product you are looking for does not exist.</p>
          <Button
            onClick={() => navigate("/products")}
            className="bg-black hover:bg-gray-800 text-white rounded-none px-6 py-2"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Return to Products
          </Button>
        </div>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = async () => {
    if (product.inStock) {
        try{
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
        }catch(error){
          console.log(error)
        }
    }
  };

  const handleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: "product.images[0]",
      });
    }
  };



  return (
    <div className="bg-white min-h-screen font-sans">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-6 flex items-center text-gray-900 hover:text-gray-700"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="flex gap-4">
            {/* Thumbnail Gallery */}
            <div className="flex flex-col gap-2">
              {["loco.png", "loco.png", "loco.png"].map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={cn(
                    "h-24 w-24 rounded-sm border",
                    selectedImageIndex === index ? "border-gray-900" : "border-gray-200"
                  )}
                >
                  <img
                    src={image}
                    alt={`${product.name} - view ${index + 1}`}
                    className="h-full w-full object-cover rounded-sm"
                  />
                </button>
              ))}
            </div>
            {/* Main Image */}
            <div className="flex-1">
              <img
                src={"loco.png"}
                alt={product.name}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-4">
            <div>
              {/* <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                {product.brand || "CITIZEN"}
              </p> */}
              <h1 className="text-2xl font-bold text-gray-900 mt-1">
                {product?.name}
              </h1>
              <p className="text-xl font-semibold text-gray-900 mt-2">
                ${product?.price.toLocaleString()}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleAddToCart}
                className="flex-1 bg-black hover:bg-gray-800 text-white rounded-none py-3 text-sm font-medium uppercase tracking-wide"
                disabled={!product.inStock}
              >
                {product.inStock ? "Add to Bag" : "Out of Stock"}
              </Button>
              <Button
                variant="outline"
                onClick={handleWishlist}
                className="border-gray-300 hover:bg-gray-100 rounded-none py-3"
              >
                <Heart
                  className={cn(
                    "h-5 w-5",
                    inWishlist && "fill-gray-900 text-gray-900"
                  )}
                />
              </Button>
            </div>

            {/* Feature Icons */}
            <div className="flex gap-4 mt-4">
              <div className="flex items-center gap-1">
                <img src="https://via.placeholder.com/24" alt="Warranty" className="h-6 w-6" />
                <span className="text-sm text-gray-600">2 Year Warranty</span>
              </div>
              <div className="flex items-center gap-1">
                <img src="https://via.placeholder.com/24" alt="Shipping" className="h-6 w-6" />
                <span className="text-sm text-gray-600">Free Shipping</span>
              </div>
              <div className="flex items-center gap-1">
                <img src="https://via.placeholder.com/24" alt="Returns" className="h-6 w-6" />
                <span className="text-sm text-gray-600">Easy Returns</span>
              </div>
              <div className="flex items-center gap-1">
                <img src="https://via.placeholder.com/24" alt="Secure" className="h-6 w-6" />
                <span className="text-sm text-gray-600">Secure Checkout</span>
              </div>
            </div>

            {/* Description */}
            <div className="mt-4">
              <p className="text-gray-600 text-sm leading-relaxed">
                {product.description || "Explore the deepest depths with the latest Promaster Dive in a stylish new color combination, the must-have diving watch vibrantly features a silver-tone stainless steel case and orange 3-hand dial with date function, and luminous hands and markers."}
              </p>
              <button className="mt-2 text-sm text-gray-900 underline hover:text-gray-700">
                Read More
              </button>
            </div>

            {/* Features List */}
            <div className="mt-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Features:</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                {product.features.map((featureId: number) => {
                  const fullFeature = features.find((f: Feature) => f.id === Number(featureId));
                  return (
                    <li key={featureId}>
                      - {fullFeature?.name || "Unknown feature"}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        {/* Recommended Products */}
        
      </div>
    </div>
  );
};

export default ProductDetailPage;