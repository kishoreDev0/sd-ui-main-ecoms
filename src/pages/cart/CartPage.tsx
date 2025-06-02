import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { 
  Trash, 
  Plus, 
  Minus, 
  ShoppingCart, 
  ArrowLeft, 
  X, 
  Check, 
  ArrowRight, 
  MapPin, 
  MessageSquare 
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { OrderConfirmPopup } from "@/components/OrderConfirmPopup";

import { useAppSelector, AppDispatch } from "@/store";
import { RootState } from "@/store/reducer";
import { fetchCartsListbyUserId, updateCartlist } from "@/store/action/cart";
import { fetchAllProducts } from "@/store/action/products";
import { createOrder } from "@/store/action/order";
import { HttpStatusCode } from "@/constants";
import { ProductQuantityItem } from "@/store/types/order";
import React from "react";

interface ProductQuantity {
  [productId: number]: number;
}

interface FormData {
  address: string;
  notes: string;
}

const CartPage = () => {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const { cartList } = useAppSelector((state: RootState) => state.cartSelector);
  const { products } = useAppSelector((state: RootState) => state.productSelector);

  const [filterProd, setFilterProd] = useState<any[]>([]);
  const [productQuantities, setProductQuantities] = useState<ProductQuantity>({});
  const [showStepper, setShowStepper] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  
  // Stepper form states
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({ address: '', notes: '' });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = 3;

  useEffect(() => {
    dispatch(fetchAllProducts());
    dispatch(fetchCartsListbyUserId(user?.id ?? 0));
  }, [dispatch]);

  useEffect(() => {
    if (!cartList || cartList.length === 0) return;

    const productIds = cartList.map((id: string | number) => Number(id));
    const filteredCart = products.filter((product) => productIds.includes(product.id));
    setFilterProd(filteredCart);

    const initialQuantities: ProductQuantity = {};
    filteredCart.forEach((product) => {
      if (!productQuantities[product.id]) {
        initialQuantities[product.id] = 1;
      }
    });

    if (Object.keys(initialQuantities).length > 0) {
      setProductQuantities((prev) => ({ ...prev, ...initialQuantities }));
    }
  }, [cartList, products]);

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      handleRemoveFromCart(productId);
      return;
    }

    setProductQuantities((prev) => ({
      ...prev,
      [productId]: newQuantity,
    }));
  };

  const getProductQuantity = (productId: number): number => {
    return productQuantities[productId] || 1;
  };

  const getProductTotal = (product: any): number => {
    const quantity = getProductQuantity(product.id);
    return product.price * quantity;
  };

  const getCartTotal = (): number => {
    if (!filterProd || filterProd.length === 0) return 0;
    return filterProd.reduce((total, product) => total + getProductTotal(product), 0);
  };

  const getTotalItemsCount = (): number => {
    return Object.values(productQuantities).reduce((total, quantity) => total + quantity, 0);
  };

  const clearCart = async () => {
    if (!filterProd || filterProd.length === 0) return;
    try {
      const removePromises = filterProd.map((item) =>
        dispatch(
          updateCartlist({
            id: user?.id ?? 0,
            payload: { productId: item.id, updatedBy: user?.id ?? 0 },
          })
        ).unwrap()
      );
      await Promise.all(removePromises);
      setProductQuantities({});
      dispatch(fetchCartsListbyUserId(user?.id ?? 0));
      dispatch(fetchAllProducts());
      toast.success("Cart cleared successfully");
    } catch (error) {
      toast.error("Failed to clear cart");
    }
  };

  const handleRemoveFromCart = async (productId: number) => {
    try {
      const result = await dispatch(
        updateCartlist({
          id: user?.id ?? 0,
          payload: { productId, updatedBy: user?.id ?? 0 },
        })
      ).unwrap();

      if (result.statusCode === HttpStatusCode.OK) {
        setProductQuantities((prev) => {
          const updated = { ...prev };
          delete updated[productId];
          return updated;
        });
        dispatch(fetchCartsListbyUserId(user?.id ?? 0));
        dispatch(fetchAllProducts());
        toast.success(result.message || "Item removed");
      } else {
        toast.error(result.message || "Failed to remove item");
      }
    } catch (error) {
      toast.error("Error removing item from cart");
    }
  };

  const handleCheckout = () => {
    if (!filterProd || filterProd.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    setShowStepper(true);
  };

  // Stepper form functions
  const validateStep = (step: number): boolean => {
    const newErrors: Partial<FormData> = {};

    if (step === 1) {
      if (!formData.address.trim()) {
        newErrors.address = 'Address is required';
      } else if (formData.address.trim().length < 10) {
        newErrors.address = 'Please provide a more detailed address';
      }
    }

    if (step === 2) {
      if (!formData.notes.trim()) {
        newErrors.notes = 'Notes are required';
      } else if (formData.notes.trim().length < 5) {
        newErrors.notes = 'Please provide more detailed notes';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    setErrors({});
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleStepperClose = () => {
    setCurrentStep(1);
    setFormData({ address: '', notes: '' });
    setErrors({});
    setShowStepper(false);
  };

  const handleSubmit = async () => {
    if (validateStep(1) && validateStep(2)) {
      setIsSubmitting(true);
      
      const productQuantity: ProductQuantityItem[] = Object.entries(productQuantities).map(
        ([productId, quantity]) => ({
          product_id: Number(productId),
          quantity: Number(quantity),
        })
      );

      const data = {
        products: filterProd ?? [],
        productQuantity,
        createdBy: user?.id ?? 0,
        address: formData.address,
        notes: formData.notes,
      };

      try {
        const result = await dispatch(createOrder({ OrderData: data })).unwrap();
        if (result.statusCode === HttpStatusCode.CREATED) {
          setShowDialog(true);
          setShowStepper(false);
          setCurrentStep(1);
          setFormData({ address: '', notes: '' });
          setErrors({});        
          
        } else {
          toast.error(result.message || "Failed to create order");
        }
      } catch (error) {
        toast.error("Error creating order");
        console.error('Order creation error:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <MapPin className="w-12 h-12 mx-auto text-red-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Delivery Address</h3>
              <p className="text-gray-600 text-sm">Please provide your complete delivery address</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Complete Address *
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Enter your complete address including street, city, state, and postal code..."
                  className={`w-full px-4 py-3 border rounded-md resize-none h-32 text-sm ${
                    errors.address 
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                      : 'border-gray-300 focus:border-red-500 focus:ring-red-200'
                  } focus:outline-none focus:ring-2`}
                />
                {errors.address && (
                  <p className="text-red-600 text-sm mt-1">{errors.address}</p>
                )}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <MessageSquare className="w-12 h-12 mx-auto text-red-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Order Notes</h3>
              <p className="text-gray-600 text-sm">Add any special instructions for your order</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Special Instructions *
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="Any special delivery instructions, preferences, or notes for the seller..."
                  className={`w-full px-4 py-3 border rounded-md resize-none h-32 text-sm ${
                    errors.notes 
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                      : 'border-gray-300 focus:border-red-500 focus:ring-red-200'
                  } focus:outline-none focus:ring-2`}
                />
                {errors.notes && (
                  <p className="text-red-600 text-sm mt-1">{errors.notes}</p>
                )}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Check className="w-12 h-12 mx-auto text-green-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Order Review</h3>
              <p className="text-gray-600 text-sm">Please review your order details before confirming</p>
            </div>
            
            <div className="space-y-4">
              {/* Order Summary */}
              <div className="bg-gray-50 rounded-md p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Order Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Items:</span>
                    <span className="font-medium">{getTotalItemsCount()} {getTotalItemsCount() === 1 ? 'item' : 'items'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total:</span>
                    <span className="font-semibold text-lg">${getCartTotal().toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="bg-gray-50 rounded-md p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Delivery Address</h4>
                <p className="text-sm text-gray-700 whitespace-pre-line">{formData.address}</p>
              </div>

              {/* Order Notes */}
              <div className="bg-gray-50 rounded-md p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Order Notes</h4>
                <p className="text-sm text-gray-700 whitespace-pre-line">{formData.notes}</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {showDialog && <OrderConfirmPopup />}
      
      {/* Stepper Modal */}
      {showStepper && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Checkout Details</h2>
              <button
                onClick={handleStepperClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Progress Steps */}
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-2">
                {Array.from({ length: totalSteps }, (_, index) => {
                  const stepNumber = index + 1;
                  const isActive = currentStep === stepNumber;
                  const isCompleted = currentStep > stepNumber;
                  
                  return (
                    <React.Fragment key={stepNumber}>
                      <div className="flex items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                            isCompleted
                              ? 'bg-green-600 text-white'
                              : isActive
                              ? 'bg-red-600 text-white'
                              : 'bg-gray-200 text-gray-600'
                          }`}
                        >
                          {isCompleted ? <Check className="w-4 h-4" /> : stepNumber}
                        </div>
                      </div>
                      {stepNumber < totalSteps && (
                        <div
                          className={`flex-1 h-1 mx-4 ${
                            currentStep > stepNumber ? 'bg-green-600' : 'bg-gray-200'
                          }`}
                        />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
              <div className="flex justify-between text-xs text-gray-600">
                <span>Address</span>
                <span>Notes</span>
                <span>Review</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {renderStepContent()}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-6 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              <div className="text-sm text-gray-600">
                Step {currentStep} of {totalSteps}
              </div>

              {currentStep < totalSteps ? (
                <Button
                  onClick={handleNext}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  {isSubmitting ? 'Processing...' : 'Confirm Order'}
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="bg-gray-50 min-h-screen font-sans">
        <div className="container mx-auto px-4 py-8 md:py-8 ">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-gray-600 mb-8 text-sm">
            Review your items before proceeding to checkout.
            {getTotalItemsCount() > 0 && (
              <span className="ml-2">
                ({getTotalItemsCount()} {getTotalItemsCount() === 1 ? 'item' : 'items'})
              </span>
            )}
          </p>

          {(!filterProd || filterProd.length === 0) ? (
            <div className="text-center py-16 bg-white rounded-md shadow-sm">
              <ShoppingCart className="w-12 h-12 mx-auto text-red-600 mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Your Cart is Empty</h2>
              <p className="text-gray-600 mb-6 text-sm">
                Looks like you haven't added any items to your cart yet.
              </p>
              <Button asChild className="bg-red-600 hover:bg-red-700 text-white rounded-md py-2 px-6 text-sm font-medium">
                <Link to="/products">Start Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-md shadow-sm">
                  <div className="hidden md:grid grid-cols-12 py-4 px-6 bg-gray-50 border-b border-gray-200 font-semibold text-gray-900 text-sm">
                    <div className="col-span-6">Product</div>
                    <div className="col-span-2">Price</div>
                    <div className="col-span-2">Quantity</div>
                    <div className="col-span-2">Total</div>
                  </div>

                  {filterProd.map((item) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center py-4 px-6 border-b border-gray-200"
                    >
                      <div className="md:col-span-6 flex gap-4">
                        <Link to={`/products/${item.id}`} className="w-20 h-20 flex-shrink-0">
                          <img
                            src={item.image || "/placeholder-image.jpg"}
                            alt={item.name}
                            className="w-full h-full object-cover rounded-md"
                          />
                        </Link>
                        <div>
                          <Link
                            to={`/products/${item.id}`}
                            className="text-sm font-medium text-gray-900 hover:text-red-600 transition-colors"
                          >
                            {item.name}
                          </Link>
                          <button
                            onClick={() => handleRemoveFromCart(item.id)}
                            className="text-sm text-red-600 hover:text-red-700 mt-1 flex items-center"
                          >
                            <Trash className="w-4 h-4 mr-1" /> Remove
                          </button>
                        </div>
                      </div>

                      <div className="md:col-span-2 text-sm font-semibold text-gray-900">
                        ${item.price.toLocaleString()}
                      </div>

                      <div className="md:col-span-2 flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-9 w-9 border-gray-300 hover:bg-gray-100"
                          onClick={() => updateQuantity(item.id, getProductQuantity(item.id) - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-10 text-center text-gray-900">{getProductQuantity(item.id)}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-9 w-9 border-gray-300 hover:bg-gray-100"
                          onClick={() => updateQuantity(item.id, getProductQuantity(item.id) + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="md:col-span-2 text-sm font-semibold text-gray-900">
                        ${getProductTotal(item).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center mt-6">
                  <Button
                    asChild
                    variant="outline"
                    className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded-md py-2 px-4 text-sm font-medium"
                  >
                    <Link to="/products">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Continue Shopping
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={clearCart}
                    className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded-md py-2 px-4 text-sm font-medium"
                    disabled={!filterProd || filterProd.length === 0}
                  >
                    <Trash className="h-4 w-4 mr-2" /> Clear Cart
                  </Button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-md shadow-sm p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        Subtotal ({getTotalItemsCount()} {getTotalItemsCount() === 1 ? 'item' : 'items'})
                      </span>
                      <span className="font-semibold text-gray-900">
                        ${getCartTotal().toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-semibold text-green-600">Free</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tax</span>
                      <span className="font-semibold text-gray-900">Calculated at checkout</span>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 pt-3 mb-6">
                    <div className="flex justify-between text-lg font-semibold text-gray-900">
                      <span>Total</span>
                      <span>${getCartTotal().toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-900 mb-1 block">Promo Code</label>
                      <div className="flex gap-2">
                        <Input placeholder="Enter code" className="flex-1 border-gray-300 rounded-md" />
                        <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded-md">
                          Apply
                        </Button>
                      </div>
                    </div>
                    <Button
                      className="w-full bg-red-600 hover:bg-red-700 text-white rounded-md py-3 text-sm font-medium"
                      onClick={handleCheckout}
                      disabled={!filterProd || filterProd.length === 0}
                    >
                      Proceed to Checkout
                    </Button>
                    <p className="text-center text-sm text-gray-600 mt-4">
                      By proceeding, you agree to our
                      <a href="#" className="text-red-600 hover:underline ml-1">
                        Terms of Service
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartPage;