
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useShoppingCart } from "@/context/ShoppingCartContext";
import { useWishlist } from "@/context/WishlistContext";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  inStock?: boolean;
}

export function ProductCard({ id, name, price, image, inStock = true }: ProductCardProps) {
  const { addToCart, isItemInCart } = useShoppingCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const isInCart = isItemInCart(id);
  const inWishlist = isInWishlist(id);

  const handleAddToCart = () => {
    if (inStock) {
      addToCart({ id, name, price, image });
    }
  };

  const handleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(id);
    } else {
      addToWishlist({ id, name, price, image });
    }
  };

  return (
    <div className="group relative overflow-hidden bg-white">
      {/* Wishlist Button */}
      <button
        onClick={handleWishlist}
        className="absolute top-3 right-3 z-10 rounded-full p-1.5 bg-white/70 hover:bg-white backdrop-blur-sm transition-colors"
      >
        <Heart
          className={cn(
            "h-4 w-4 transition-colors",
            inWishlist ? "fill-luxury-gold text-luxury-gold" : "text-luxury-navy"
          )}
        />
      </button>

      {/* Product Image with Link */}
      <Link to={`/products/${id}`} className="block overflow-hidden">
        <div className="aspect-square overflow-hidden">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        <Link to={`/products/${id}`} className="block">
          <h3 className="font-serif text-lg font-medium text-luxury-navy group-hover:text-luxury-gold transition-colors mb-1">{name}</h3>
        </Link>
        <p className="text-sm font-medium mb-3">${price.toLocaleString()}</p>
        
        <div className="flex justify-between items-center">
          <Button
            variant={inStock ? (isInCart ? "outline" : "default") : "outline"}
            className={cn(
              "w-full font-medium",
              !inStock && "text-muted-foreground cursor-not-allowed"
            )}
            disabled={!inStock}
            onClick={handleAddToCart}
          >
            {!inStock ? "Out of Stock" : isInCart ? "Added to Cart" : "Add to Cart"}
          </Button>
        </div>
      </div>
    </div>
  );
}
