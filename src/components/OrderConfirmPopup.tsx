
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppSelector } from "@/store";
import { RootState } from "@/store/reducer";

export function OrderConfirmPopup() {
  const navigate = useNavigate();
  const [ showOrderConfirm, setShowOrderConfirm] = useState(true);
  const { orders } = useAppSelector((state:RootState)=> state.orderSelector)
  const handleClose = () => {
    setShowOrderConfirm(false);
    // clearCart();
    navigate("/");
  };
  const orderState = orders[0] ?? []

  return (
    <Dialog open={showOrderConfirm} onOpenChange={setShowOrderConfirm}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <DialogTitle className="text-center text-2xl font-serif mt-4">Order Confirmed!</DialogTitle>
          <DialogDescription className="text-center">
            Thank you for your purchase. Your order has been received and is being processed.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center py-4">
          <div className="mb-4 text-center">
            <p className="text-sm text-muted-foreground">
              A confirmation email has been sent to your registered email address.
            </p>
          </div>
          <div className="rounded-lg bg-muted p-4 w-full">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Order Number:</span>
              <span className="text-sm text-muted-foreground">#{orderState?.id ?? ''}</span>
            </div>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-col gap-2">
          <Button onClick={handleClose} className="w-full">
            Continue Shopping
          </Button>
          <Button variant="outline" onClick={handleClose} className="w-full">
            <ShoppingBag className="mr-2 h-4 w-4" />
            View Order History
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
