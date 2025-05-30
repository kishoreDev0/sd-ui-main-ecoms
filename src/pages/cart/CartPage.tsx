// ==================== UPDATED CART PAGE WITH LOCAL QUANTITY MANAGEMENT ====================
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
import { fetchCartsListbyUserId, updateCartlist } from "@/store/action/cart";
import { fetchAllProducts } from "@/store/action/products";
import { HttpStatusCode } from "@/constants";
import { toast } from "react-toastify";

interface ProductQuantity {
  [productId: number]: number;
}

const CartPage = () => {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const { cartList } = useAppSelector((state: RootState) => state.cartSelector);
  const { products } = useAppSelector((state: RootState) => state.productSelector);
  const [filterProd, setFilterProd] = useState<any[]>();
  const [showOrderConfirm, setShowOrderConfirm] = useState(false);
  
  // Local state to manage quantities for each product
  const [productQuantities, setProductQuantities] = useState<ProductQuantity>({});

  useEffect(() => {
    dispatch(fetchAllProducts());
    dispatch(fetchCartsListbyUserId(user?.id ?? 0));
  }, [dispatch]);

  useEffect(() => {
    if (!cartList || cartList.length === 0) return;
    
    const productIds = cartList.map((id: string | number) => Number(id));
    const filteredCart = products.filter((product) =>
      productIds.includes(product.id)
    );

    setFilterProd(filteredCart);

    // Initialize quantities for each product (default to 1 if not set)
    const initialQuantities: ProductQuantity = {};
    filteredCart.forEach((product) => {
      if (!productQuantities[product.id]) {
        initialQuantities[product.id] = 1;
      }
    });
    
    if (Object.keys(initialQuantities).length > 0) {
      setProductQuantities(prev => ({ ...prev, ...initialQuantities }));
    }
  }, [cartList, products]);

  // Update quantity for a specific product
  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      // If quantity becomes 0, remove the item from cart
      handleRemoveFromCart(productId);
      return;
    }

    setProductQuantities(prev => ({
      ...prev,
      [productId]: newQuantity
    }));
  };

  // Get quantity for a specific product
  const getProductQuantity = (productId: number): number => {
    return productQuantities[productId] || 1;
  };

  // Calculate total for a specific product
  const getProductTotal = (product: any): number => {
    const quantity = getProductQuantity(product.id);
    return product.price * quantity;
  };

  // Calculate cart total
  const getCartTotal = (): number => {
    if (!filterProd || filterProd.length === 0) return 0;
    
    return filterProd.reduce((total, product) => {
      return total + getProductTotal(product);
    }, 0);
  };

  // Get total items count in cart
  const getTotalItemsCount = (): number => {
    return Object.values(productQuantities).reduce((total, quantity) => total + quantity, 0);
  };

  // Clear entire cart
  const clearCart = async () => {
    if (!filterProd || filterProd.length === 0) return;

    try {
      // Remove all products from cart via API calls
      const removePromises = filterProd.map(async (item) => {
        return dispatch(updateCartlist({
          id: user?.id ?? 0,
          payload: {
            productId: item.id,
            updatedBy: user?.id ?? 0
          }
        })).unwrap();
      });

      await Promise.all(removePromises);
      
      // Clear local quantities
      setProductQuantities({});
      
      // Refresh cart data
      dispatch(fetchCartsListbyUserId(user?.id ?? 0));
      dispatch(fetchAllProducts());
      
      toast.success("Cart cleared successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to clear cart");
    }
  };

  // Remove specific item from cart
  const handleRemoveFromCart = async (productId: number) => {
    try {
      const result = await dispatch(updateCartlist({
        id: user?.id ?? 0,
        payload: {
          productId: productId,
          updatedBy: user?.id ?? 0
        }
      })).unwrap();

      if (result.statusCode === HttpStatusCode.OK) {
        toast.success(result?.message ?? 'Item removed from cart');
        
        // Remove from local quantities
        setProductQuantities(prev => {
          const newQuantities = { ...prev };
          delete newQuantities[productId];
          return newQuantities;
        });
        
        // Refresh cart data
        dispatch(fetchCartsListbyUserId(user?.id ?? 0));
        dispatch(fetchAllProducts());
      } else {
        toast.error(result?.message ?? 'Failed to remove item');
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to remove item from cart");
    }
  };

  const handleToggleCart = async (
    e: React.MouseEvent<HTMLButtonElement>,
    item: { id: number; name: string; price: number; image: string }
  ) => {
    e.preventDefault();
    await handleRemoveFromCart(item.id);
  };

  const handleCheckout = () => {
    if (!filterProd || filterProd.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    setShowOrderConfirm(true);
  };

  // Get cart summary for checkout
  const handleSubmit = () =>{
    
  }

  return (
    <>
      <OrderConfirmPopup 
        
      />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">Shopping Cart</h1>
        <p className="text-muted-foreground mb-8">
          Review your items before proceeding to checkout.
          {getTotalItemsCount() > 0 && (
            <span className="ml-2 text-sm">
              ({getTotalItemsCount()} {getTotalItemsCount() === 1 ? 'item' : 'items'})
            </span>
          )}
        </p>
        
        {filterProd && filterProd.length === 0 || filterProd === undefined ? (  
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
                
                {filterProd && filterProd.map(item => {
                  const quantity = getProductQuantity(item.id);
                  const itemTotal = getProductTotal(item);
                  
                  return (
                    <div key={item.id} className="border-t grid grid-cols-1 md:grid-cols-12 p-4 gap-4 items-center">
                      {/* Product Info */}
                      <div className="md:col-span-6 flex items-center gap-4">
                        <Link to={`/products/${item.id}`} className="h-20 w-20 flex-shrink-0">
                          <img
                            src={item.image || "/placeholder-image.jpg"}
                            alt={item.name}
                            className="h-full w-full object-cover rounded"
                          />
                        </Link>
                        <div>
                          <Link to={`/products/${item.id}`} className="font-medium hover:text-luxury-gold transition-colors">
                            {item.name}
                          </Link>
                          <button 
                            onClick={(e) => handleToggleCart(e, item)} 
                            className="text-sm text-red-600 hover:text-red-800 mt-1 flex items-center"
                          >
                            <Trash className="h-3 w-3 mr-1" /> Remove
                          </button>
                        </div>
                      </div>
                      
                      {/* Price */}
                      <div className="md:col-span-2 font-medium">
                        ${item.price.toLocaleString()}
                      </div>
                      
                      {/* Quantity */}
                      <div className="md:col-span-2">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-10 text-center font-medium">{quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      
                      {/* Total */}
                      <div className="md:col-span-2 font-medium">
                        ${itemTotal.toLocaleString()}
                      </div>
                    </div>
                  );
                })}
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
                  disabled={!filterProd || filterProd.length === 0}
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
                    <span className="text-muted-foreground">
                      Subtotal ({getTotalItemsCount()} items)
                    </span>
                    <span className="font-medium">${getCartTotal().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="font-medium">Calculated at checkout</span>
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
                    disabled={!filterProd || filterProd.length === 0}
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

// ==================== UTILITY FUNCTIONS (Can be moved to separate utils file) ====================

// Helper function to calculate total price with tax
export const calculateTotalWithTax = (subtotal: number, taxRate: number = 0.08): number => {
  return subtotal + (subtotal * taxRate);
};

// Helper function to format currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

// Helper function to get quantity display text
export const getQuantityText = (count: number): string => {
  return `${count} ${count === 1 ? 'item' : 'items'}`;
};

// ==================== CART SUMMARY INTERFACE ====================
export interface CartSummaryItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  total: number;
}

export interface CartSummary {
  items: CartSummaryItem[];
  total: number;
  itemCount: number;
}