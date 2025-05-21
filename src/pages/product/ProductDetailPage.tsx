
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Minus, Plus, Check, ArrowLeft } from "lucide-react";
import { getProductById } from "@/data/product";
import { useShoppingCart } from "@/context/ShoppingCartContext";
import { useWishlist } from "@/context/WishlistContext";
import { ProductCard } from "@/components/ProductCard";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProductById(parseInt(id || "0"));
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useShoppingCart();
  
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  // If product doesn't exist, show error
  if (!product) {
    return (
      <>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="font-serif text-3xl font-bold mb-4">Product Not Found</h1>
          <p className="mb-8">The product you are looking for does not exist.</p>
          <Button onClick={() => navigate("/products")}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Return to Products
          </Button>
        </div>
      </>
    );
  }

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (product.inStock) {
      for (let i = 0; i < quantity; i++) {
        addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.images[0],
        });
      }
      toast.success(`${product.name} added to cart`);
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
        image: product.images[0],
      });
    }
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  // Recommended Products - normally would be based on product category or AI recommendations
  const recommendedProducts = [1, 2, 3].filter(pid => pid !== product.id).map(pid => getProductById(pid)).filter(Boolean);

  return (
    <>
      
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          className="mb-6 flex items-center" 
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="aspect-square overflow-hidden mb-4">
              <img
                src={product.images[selectedImageIndex]}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={cn(
                    "h-24 w-24 flex-shrink-0 border-2",
                    selectedImageIndex === index ? "border-luxury-gold" : "border-transparent"
                  )}
                >
                  <img
                    src={image}
                    alt={`${product.name} - view ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="font-serif text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-2xl font-medium">${product.price.toLocaleString()}</p>
            </div>
            
            <p className="text-muted-foreground">{product.description}</p>
            
            <div>
              <h3 className="font-medium mb-2">Features:</h3>
              <ul className="space-y-1">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="h-4 w-4 mt-1 text-luxury-gold" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="pt-4 border-t">
              <p className="mb-3 text-sm font-medium">
                Availability: 
                <span className={product.inStock ? "text-green-600 ml-1" : "text-red-500 ml-1"}>
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </p>
              
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm font-medium">Quantity:</span>
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1 || !product.inStock}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-10 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= 10 || !product.inStock}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1"
                  disabled={!product.inStock}
                >
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleWishlist}
                >
                  <Heart 
                    className={cn(
                      "h-5 w-5 mr-2",
                      inWishlist && "fill-luxury-gold text-luxury-gold"
                    )} 
                  />
                  {inWishlist ? "In Wishlist" : "Add to Wishlist"}
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Recommended Products */}
        {recommendedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="font-serif text-2xl font-bold mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {recommendedProducts.map(recProduct => recProduct && (
                <ProductCard
                  key={recProduct.id}
                  id={recProduct.id}
                  name={recProduct.name}
                  price={recProduct.price}
                  image={recProduct.images[0]}
                  inStock={recProduct.inStock}
                />
              ))}
            </div>
          </div>
        )}
      </div>
 
    </>
  );
};

export default ProductDetailPage;
