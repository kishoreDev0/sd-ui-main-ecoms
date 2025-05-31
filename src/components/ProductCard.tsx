
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, HeartIcon } from "lucide-react";
import { useShoppingCart } from "@/context/ShoppingCartContext";
import { useWishlist } from "@/context/WishlistContext";
import { cn } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/store";
import { moveWishlistlist } from "@/store/action/wishlist";
import { RootState } from "@/store/reducer";
import { HttpStatusCode } from "@/constants";
import { toast } from "react-toastify";
import { fetchCartsListbyUserId } from "@/store/action/cart";
import { useEffect } from "react";
import { fetchAllProducts } from "@/store/action/products";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  inStock?: boolean;
  isWishlisted: boolean;
  onToggleWishlist: (e: any,id: number) => void;
}

export function ProductCard({ id, name, price, image, inStock = true,isWishlisted,onToggleWishlist }: ProductCardProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useAppSelector((state:RootState)=> state.auth);
  const { cartList } =  useAppSelector((state:RootState)=> state.cartSelector)
  useEffect(()=>{
    dispatch(fetchCartsListbyUserId(user?.id ?? 0))
  },[])
  const isInCart = cartList.some((item) => Number(item) === id);


  const handleAddToCart = async (id:number) => {
        try {
          console.log(id)
          const result = await dispatch(
            moveWishlistlist({
              id: user?.id ?? 0,
              payload: {
                productId: id,
                updatedBy: user?.id ?? 0,
              },
            })
          ).unwrap();
          if (result.statusCode === HttpStatusCode.OK) {
            toast.success(result?.message ?? "Product moved to cart successfully");
            dispatch(fetchCartsListbyUserId(user?.id ?? 0))
            dispatch(fetchAllProducts())
          } else {
            toast.error(result?.message ?? "Product has not moved to cart");
          }
        } catch (error) {
          console.log(error);
        }
      };

  return (
    <div className="group relative overflow-hidden bg-white">
      {/* Wishlist Button */}
       <button
        onClick={(e) => onToggleWishlist(e,id)}
        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        className="absolute top-2 right-2 p-1 z-99 cursor-pointer"
      >
        {isWishlisted ? (
          <HeartIcon fill="currentColor" className="text-black-600 w-6 h-6" />
        ) : (
          <Heart className="text-gray-400 w-6 h-6 hover:text-red-600" />
        )}
        
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
           
            className={cn(
              "w-full font-medium",
              !inStock && "text-muted-foreground cursor-not-allowed"
            )}
            disabled={!inStock}
            onClick={(e) => handleAddToCart(id)}
          >
            {!inStock ? "Out of Stock" : isInCart ? "Added to Cart" : "Add to Cart"}
          </Button>
        </div>
      </div>
    </div>
  );
}



