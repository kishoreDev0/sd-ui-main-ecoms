
import { OrderConfirmPopup } from "@/components/OrderConfirmPopup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useShoppingCart } from "@/context/ShoppingCartContext";
import { Trash, Plus, Minus, ShoppingCart, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/store";
import { RootState } from "@/store/reducer";
import { fetchCartsListbyUserId } from "@/store/action/cart";
import { fetchAllProducts } from "@/store/action/products";

const CartPage = () => {
  const { 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getCartTotal,
    setShowOrderConfirm
  } = useShoppingCart();
  const { user } = useAppSelector((state:RootState)=> state.auth)
  const dispatch = useDispatch<AppDispatch>();
  const { cartList } = useAppSelector((state:RootState)=> state.cartSelector);
  const { products } = useAppSelector((state:RootState)=> state.productSelector);
  const [filterProd, setFilterProd] = useState<any[]>();
   

  useEffect(()=>{
      dispatch(fetchAllProducts())
      dispatch(fetchCartsListbyUserId(user?.id ?? 0))
    },[dispatch])
  
  const handleCheckout = () => {
    setShowOrderConfirm(true);
  };
   useEffect(() => {
    if (!cartList || cartList.length === 0) return;
    const productIds = cartList.map((id: string | number) => Number(id)); 
    const filteredCart = products.filter((product) => 
      productIds.includes((product.id))
    );   

    console.log(filteredCart)

    setFilterProd(filteredCart)
  }, [cartList, products]);
  
  return (
    <>
      <OrderConfirmPopup />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">Shopping Cart</h1>
        <p className="text-muted-foreground mb-8">Review your items before proceeding to checkout.</p>
        
        {filterProd && filterProd.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingCart className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-medium mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Button asChild>
              <Link to="/products">Start Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="border rounded-lg shadow-sm">
                <div className="hidden md:grid grid-cols-12 p-4 bg-muted font-medium">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2">Price</div>
                  <div className="col-span-2">Quantity</div>
                  <div className="col-span-2">Total</div>
                </div>
                
                {filterProd && filterProd.map(item => (
                  <div key={item.id} className="border-t grid grid-cols-1 md:grid-cols-12 p-4 gap-4 items-center">
                    {/* Product Info */}
                    <div className="md:col-span-6 flex items-center gap-4">
                      <Link to={`/products/${item.id}`} className="h-20 w-20 flex-shrink-0">
                        <img
                          src={"item.image"}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </Link>
                      <div>
                        <Link to={`/products/${item.id}`} className="font-medium hover:text-luxury-gold transition-colors">
                          {item.name}
                        </Link>
                        <button 
                          onClick={() => removeFromCart(item.id)} 
                          className="text-sm text-red-600 hover:text-red-800 mt-1 flex items-center"
                        >
                          <Trash className="h-3 w-3 mr-1" /> Remove
                        </button>
                      </div>
                    </div>
                    
                    {/* Price */}
                    <div className="md:col-span-2 font-medium">
                      ${item.price.toLocaleString() }
                    </div>
                    
                    {/* Quantity */}
                    <div className="md:col-span-2">
                      <div className="flex items-center">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-10 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    
                    {/* Total */}
                    <div className="md:col-span-2 font-medium">
                      {item.quantity ? '$'+(item.price * item.quantity).toLocaleString() : '-'}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between items-center mt-6">
                <Button asChild variant="outline">
                  <Link to="/products">
                    <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
                    Continue Shopping
                  </Link>
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={clearCart}
                  className="border-red-300 text-red-600 hover:bg-red-50"
                >
                  <Trash className="h-4 w-4 mr-2" /> Clear Cart
                </Button>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="border rounded-lg shadow-sm p-6">
                <h2 className="font-serif text-xl font-bold mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">${getCartTotal().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium">Free</span>
                  </div>
                </div>
                
                <div className="border-t pt-3 mb-6">
                  <div className="flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <span>${getCartTotal().toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Promo Code</label>
                    <div className="flex gap-2">
                      <Input placeholder="Enter code" className="flex-1" />
                      <Button variant="outline">Apply</Button>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full"
                    onClick={handleCheckout}
                  >
                    Proceed to Checkout
                  </Button>
                  
                  <div className="text-center text-sm text-muted-foreground">
                    By proceeding, you agree to our
                    <a href="#" className="text-luxury-gold hover:underline ml-1">
                      Terms of Service
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
    </>
  );
};

export default CartPage;
