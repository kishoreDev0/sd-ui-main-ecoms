import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Check, MapPin, FileText } from "lucide-react";

type StepperFormProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { address: string; notes: string }) => void;
  initialData?: { address: string; notes: string };
};

const StepperForm: React.FC<StepperFormProps> = ({
  open,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [step, setStep] = useState(1);
  const totalSteps = 2;

  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<{ address?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (open) {
      setStep(1);
      setAddress(initialData?.address || "");
      setNotes(initialData?.notes || "");
      setErrors({});
    }
  }, [open, initialData]);

  const validateAddress = () => {
    if (!address.trim()) return "Address is required";
    if (address.trim().length < 10) return "Address must be more descriptive";
    return "";
  };

  const handleNext = () => {
    const addressError = validateAddress();
    if (step === 1 && addressError) {
      setErrors({ address: addressError });
      return;
    }
    setErrors({});
    setStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
    setErrors({});
  };

  const handleFinalSubmit = async () => {
    const addressError = validateAddress();
    if (addressError) {
      setErrors({ address: addressError });
      setStep(1);
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({ address: address.trim(), notes: notes.trim() });
      onClose();
    } catch (err) {
      console.error("Submit error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepData = [
    {
      title: "Address",
      icon: MapPin,
      content: (
        <div className="space-y-4">
          <label className="text-sm font-semibold text-black">
            Delivery Address *
          </label>
          <Textarea
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
              if (errors.address) setErrors({});
            }}
            rows={5}
            placeholder="Enter full address: street, city, state..."
            className={cn(
              "w-full resize-none border border-black focus:border-black focus:ring-0 bg-white text-black placeholder-gray-400",
              errors.address && "border-blue-600 focus:border-blue-600"
            )}
          />
          {errors.address && (
            <p className="text-sm text-blue-600">{errors.address}</p>
          )}
        </div>
      ),
    },
    {
      title: "Notes",
      icon: FileText,
      content: (
        <div className="space-y-4">
          <label className="text-sm font-semibold text-black">
            Delivery Instructions
          </label>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={5}
            placeholder="Add any special instructions for delivery"
            className="w-full resize-none border border-black focus:border-black focus:ring-0 bg-white text-black placeholder-gray-400"
          />
        </div>
      ),
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-white border border-black p-0">
        <div className="p-4 border-b border-black">
          <DialogTitle className="text-xl font-bold text-black">Checkout</DialogTitle>
          <p className="text-xs text-gray-500">Step {step} of {totalSteps}</p>
        </div>

        {/* Stepper Indicators */}
        <div className="px-4 pt-4">
          <div className="flex justify-between items-center">
            {stepData.map((item, i) => {
              const stepNum = i + 1;
              const active = step === stepNum;
              const completed = step > stepNum;
              const Icon = item.icon;
              return (
                <div key={stepNum} className="flex flex-col items-center gap-2">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full border-2 flex items-center justify-center transition",
                      completed
                        ? "bg-black border-black text-white"
                        : active
                        ? "bg-black border-black text-white"
                        : "bg-white border-black text-black"
                    )}
                  >
                    {completed ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                  </div>
                  <span
                    className={cn(
                      "text-xs font-medium",
                      active ? "text-black" : "text-gray-500"
                    )}
                  >
                    {item.title}
                  </span>
                </div>
              );
            })}
            <div className="flex-1 h-[2px] bg-black mx-2" />
          </div>
        </div>

        {/* Step Content */}
        <div className="px-4 py-6">{stepData[step - 1].content}</div>

        {/* Navigation Buttons */}
        <DialogFooter className="px-4 py-3 bg-white border-t border-black">
          <div className="flex justify-between w-full">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={step === 1}
              className="border-black text-black hover:bg-gray-100"
            >
              <ChevronLeft className="mr-1 w-4 h-4" />
              Back
            </Button>
            {step === totalSteps ? (
              <Button
                onClick={handleFinalSubmit}
                disabled={isSubmitting}
                className="bg-black text-white hover:bg-gray-600"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Submitting...</span>
                  </div>
                ) : (
                  <>
                    <Check className="w-4 h-4 mr-1" />
                    Submit
                  </>
                )}
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                className="bg-black text-white hover:bg-gray-600"
              >
                Next
                <ChevronRight className="ml-1 w-4 h-4" />
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StepperForm;
