
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useWishlist } from "@/context/WishlistContext";
import { useShoppingCart } from "@/context/ShoppingCartContext";
import { Trash, ShoppingCart, Heart } from "lucide-react";
import { toast } from "sonner";

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useShoppingCart();
  
  const handleAddToCart = (item: { id: number; name: string; price: number; image: string }) => {
    addToCart(item);
    toast.success(`${item.name} added to cart`);
  };
  
  const handleRemoveFromWishlist = (id: number, name: string) => {
    removeFromWishlist(id);
    toast.info(`${name} removed from wishlist`);
  };
  
  return (
    <>
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">My Wishlist</h1>
        <p className="text-muted-foreground mb-8">Items you've saved for future consideration.</p>
        
        {wishlistItems.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-medium mb-2">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-6">
              Browse our collection and add your favorite items to your wishlist.
            </p>
            <Button asChild>
              <Link to="/products">Browse Products</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="border rounded-lg shadow-sm mb-6">
              <div className="hidden md:grid grid-cols-5 p-4 bg-muted font-medium">
                <div className="col-span-2">Product</div>
                <div>Price</div>
                <div className="col-span-2">Actions</div>
              </div>
              
              {wishlistItems.map(item => (
                <div key={item.id} className="border-t grid grid-cols-1 md:grid-cols-5 p-4 gap-4 items-center">
                  {/* Product Info */}
                  <div className="md:col-span-2 flex items-center gap-4">
                    <Link to={`/products/${item.id}`} className="h-16 w-16 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </Link>
                    <Link to={`/products/${item.id}`} className="font-medium hover:text-luxury-gold transition-colors">
                      {item.name}
                    </Link>
                  </div>
                  
                  {/* Price */}
                  <div className="font-medium">
                    ${item.price.toLocaleString()}
                  </div>
                  
                  {/* Actions */}
                  <div className="md:col-span-2 flex flex-wrap gap-2">
                    <Button 
                      onClick={() => handleAddToCart(item)}
                      size="sm"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleRemoveFromWishlist(item.id, item.name)}
                    >
                      <Trash className="h-4 w-4 mr-2" /> Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between items-center">
              <Button asChild variant="outline">
                <Link to="/products">Continue Shopping</Link>
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => {
                  clearWishlist();
                  toast.info("Wishlist cleared");
                }}
                className="border-red-300 text-red-600 hover:bg-red-50"
              >
                <Trash className="h-4 w-4 mr-2" /> Clear Wishlist
              </Button>
            </div>
          </>
        )}
      </div>
      

    </>
  );
};

export default WishlistPage;
