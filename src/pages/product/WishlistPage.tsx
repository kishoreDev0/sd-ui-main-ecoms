
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Trash, ShoppingCart, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { AppDispatch, useAppSelector } from "@/store";
import { RootState } from "@/store/reducer";
import { useDispatch } from "react-redux";
import {  fetchWishlistByUserId, moveWishlistlist, updateWishlistlist } from "@/store/action/wishlist";
import { fetchAllProducts } from "@/store/action/products";
import { HttpStatusCode } from "@/constants";
import { toast } from "react-toastify";

const WishlistPage = () => {
  const { userList } = useAppSelector((state:RootState)=> state.wishlistSelector);
  const { user } = useAppSelector((state:RootState)=> state.auth);
  const { products } = useAppSelector((state:RootState)=> state.productSelector);
  const [filterProd, setFilterProd] = useState<any[]>();
  const dispatch = useDispatch<AppDispatch>();

    const handleAddToCart = async (item: { id: number; name: string; price: number; image: string }) => {
    try{
       const result = await dispatch(moveWishlistlist({
         id: user?.id ?? 0,
         payload: {
           productId: item.id,
           updatedBy: user?.id ?? 0
         }
       })).unwrap();
       if(result.statusCode === HttpStatusCode.OK ){
          toast.success(result?.message ?? "Product moved to cart sucessfully")
       }else{
           toast.error(result?.message ?? "Product has not moved to cart")
       }
    }catch(error){
      console.log(error)
    }
  };

  useEffect(()=>{
      dispatch(fetchWishlistByUserId(user?.id ?? 0))
      dispatch(fetchAllProducts())
      
  },[dispatch])

  useEffect(() => {
    if (!userList || userList.length === 0) return;
    const productIds = userList.map((id: string | number) => Number(id)); 
    const filteredWish = products.filter((product) => 
      productIds.includes(product.id)
    );   
    setFilterProd(filteredWish)
  }, [userList, products]);

   const handleToggleWishlist = async (e: { preventDefault: () => void; }, productId: number) => {
        e.preventDefault();  
        try {
          const response = await dispatch(
            updateWishlistlist({
              id: user?.id ?? 0,
              payload: {
                productId,
                updatedBy: user?.id ?? 0
              } 
            })
          ).unwrap();
          if(response.statusCode === HttpStatusCode.OK){
            dispatch(fetchAllProducts())
            dispatch(fetchWishlistByUserId(user?.id ?? 0))
            toast.success(response.message ?? 'Wishlist successfully updated')
          }
          else{
            toast.error(response.message ?? 'Wishlist has not updated')
          }
        } catch (error) {
          console.log(error);
        }
      };



 
  
  return (
    <>
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">My Wishlist</h1>
        <p className="text-muted-foreground mb-8">Items you've saved for future consideration.</p>
        
        {filterProd && filterProd.length === 0 ? (
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
              
              {filterProd  && filterProd.map(item => (
                <div key={item.id} className="border-t grid grid-cols-1 md:grid-cols-5 p-4 gap-4 items-center">
                  {/* Product Info */}
                  <div className="md:col-span-2 flex items-center gap-4">
                    <Link to={`/products/${item.id}`} className="h-16 w-16 flex-shrink-0">
                      <img
                        src={"item.image"}
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
                      onClick={(e) => handleToggleWishlist(e,item.id)}
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
              
              {/* <Button 
                variant="outline" 
                onClick={() => {
                  clearWishlist();
                  toast.info("Wishlist cleared");
                }}
                className="border-red-300 text-red-600 hover:bg-red-50"
              >
                <Trash className="h-4 w-4 mr-2" /> Clear Wishlist
              </Button> */}
            </div>
          </>
        )}
      </div>
      

    </>
  );
};

export default WishlistPage;
