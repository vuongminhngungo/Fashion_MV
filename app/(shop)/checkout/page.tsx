"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MotionSection from "@/components/shared/MotionSection";
import SectionHeading from "@/components/shared/SectionHeading";
import { paymentSchema, shippingSchema } from "@/lib/validators";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";
import type { z } from "zod";

type ShippingValues = z.infer<typeof shippingSchema>;
type PaymentValues = z.infer<typeof paymentSchema>;

const steps = ["Shipping Info", "Payment", "Review"];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, coupon, clearCart } = useCartStore();
  const [step, setStep] = useState(0);

  const shippingForm = useForm<ShippingValues>({
    resolver: zodResolver(shippingSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      country: "",
    },
  });

  const paymentForm = useForm<PaymentValues>({
    resolver: zodResolver(paymentSchema),
    mode: "onChange",
    defaultValues: {
      cardName: "",
      cardNumber: "",
      expiry: "",
      cvv: "",
    },
  });

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  );
  const discount = coupon === "FASHION10" ? subtotal * 0.1 : 0;
  const shipping = subtotal - discount >= 120 || items.length === 0 ? 0 : 12;
  const total = subtotal - discount + shipping;

  const handleNext = async () => {
    if (step === 0) {
      const valid = await shippingForm.trigger();
      if (!valid) return;
    }

    if (step === 1) {
      const valid = await paymentForm.trigger();
      if (!valid) return;
    }

    setStep((value) => Math.min(value + 1, 2));
  };

  const handlePlaceOrder = async () => {
    clearCart();
    toast.success("Order placed successfully");
    router.push("/order-success");
  };

  return (
    <div className="container-px shopee-shell py-6 md:py-8">
      <MotionSection className="rounded-sm bg-white p-4 shadow-sm md:p-5">
        <SectionHeading
          title="Checkout"
          subtitle="Shopee-style multistep checkout with bold progress, delivery details, and order summary"
          action={<span className="shopee-pill">Secure Checkout</span>}
        />

        <div className="mt-5 mb-8">
          <div className="grid gap-3 sm:grid-cols-3">
            {steps.map((label, index) => (
              <div key={label} className="relative">
                <div
                  className={`rounded-sm border px-4 py-3 text-sm font-semibold transition ${
                    index <= step
                      ? "border-[#ee4d2d] bg-[#fff6f3] text-[#ee4d2d]"
                      : "border-zinc-200 bg-white text-zinc-500"
                  }`}
                >
                  {index + 1}. {label}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-zinc-200">
            <motion.div
              className="h-full bg-gradient-to-r from-[#ee4d2d] to-[#ff8a4c]"
              animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.35 }}
            />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <section className="rounded-sm border border-zinc-100 bg-white p-5 shadow-sm">
            {step === 0 ? (
              <form className="grid gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <Input
                    placeholder="Full name"
                    {...shippingForm.register("name")}
                    className="h-11 rounded-sm"
                  />
                  {shippingForm.formState.errors.name ? (
                    <p className="mt-1 text-xs text-red-600">
                      {shippingForm.formState.errors.name.message}
                    </p>
                  ) : null}
                </div>
                <div>
                  <Input
                    placeholder="Email"
                    {...shippingForm.register("email")}
                    className="h-11 rounded-sm"
                  />
                  {shippingForm.formState.errors.email ? (
                    <p className="mt-1 text-xs text-red-600">
                      {shippingForm.formState.errors.email.message}
                    </p>
                  ) : null}
                </div>
                <div>
                  <Input
                    placeholder="Phone"
                    {...shippingForm.register("phone")}
                    className="h-11 rounded-sm"
                  />
                  {shippingForm.formState.errors.phone ? (
                    <p className="mt-1 text-xs text-red-600">
                      {shippingForm.formState.errors.phone.message}
                    </p>
                  ) : null}
                </div>
                <div className="md:col-span-2">
                  <Input
                    placeholder="Address"
                    {...shippingForm.register("address")}
                    className="h-11 rounded-sm"
                  />
                  {shippingForm.formState.errors.address ? (
                    <p className="mt-1 text-xs text-red-600">
                      {shippingForm.formState.errors.address.message}
                    </p>
                  ) : null}
                </div>
                <div>
                  <Input
                    placeholder="City"
                    {...shippingForm.register("city")}
                    className="h-11 rounded-sm"
                  />
                  {shippingForm.formState.errors.city ? (
                    <p className="mt-1 text-xs text-red-600">
                      {shippingForm.formState.errors.city.message}
                    </p>
                  ) : null}
                </div>
                <div>
                  <Input
                    placeholder="Country"
                    {...shippingForm.register("country")}
                    className="h-11 rounded-sm"
                  />
                  {shippingForm.formState.errors.country ? (
                    <p className="mt-1 text-xs text-red-600">
                      {shippingForm.formState.errors.country.message}
                    </p>
                  ) : null}
                </div>
              </form>
            ) : null}

            {step === 1 ? (
              <form className="grid gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <Input
                    placeholder="Card holder name"
                    {...paymentForm.register("cardName")}
                    className="h-11 rounded-sm"
                  />
                  {paymentForm.formState.errors.cardName ? (
                    <p className="mt-1 text-xs text-red-600">
                      {paymentForm.formState.errors.cardName.message}
                    </p>
                  ) : null}
                </div>
                <div className="md:col-span-2">
                  <Input
                    placeholder="Card number"
                    {...paymentForm.register("cardNumber")}
                    className="h-11 rounded-sm"
                  />
                  {paymentForm.formState.errors.cardNumber ? (
                    <p className="mt-1 text-xs text-red-600">
                      {paymentForm.formState.errors.cardNumber.message}
                    </p>
                  ) : null}
                </div>
                <div>
                  <Input
                    placeholder="MM/YY"
                    {...paymentForm.register("expiry")}
                    className="h-11 rounded-sm"
                  />
                  {paymentForm.formState.errors.expiry ? (
                    <p className="mt-1 text-xs text-red-600">
                      {paymentForm.formState.errors.expiry.message}
                    </p>
                  ) : null}
                </div>
                <div>
                  <Input
                    placeholder="CVV"
                    {...paymentForm.register("cvv")}
                    className="h-11 rounded-sm"
                  />
                  {paymentForm.formState.errors.cvv ? (
                    <p className="mt-1 text-xs text-red-600">
                      {paymentForm.formState.errors.cvv.message}
                    </p>
                  ) : null}
                </div>
              </form>
            ) : null}

            {step === 2 ? (
              <div className="space-y-5 text-sm">
                <div className="rounded-sm bg-zinc-50 p-4">
                  <h2 className="font-semibold text-zinc-900">Shipping</h2>
                  <p className="mt-2 text-zinc-600">
                    {shippingForm.getValues("name")} ·{" "}
                    {shippingForm.getValues("email")}
                  </p>
                  <p className="text-zinc-600">
                    {shippingForm.getValues("address")},{" "}
                    {shippingForm.getValues("city")},{" "}
                    {shippingForm.getValues("country")}
                  </p>
                </div>
                <div className="rounded-sm bg-zinc-50 p-4">
                  <h2 className="font-semibold text-zinc-900">Payment</h2>
                  <p className="mt-2 text-zinc-600">
                    Card ending in{" "}
                    {paymentForm.getValues("cardNumber").slice(-4) || "0000"}
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setStep(0)}
                  type="button"
                  className="rounded-sm"
                >
                  Edit Details
                </Button>
              </div>
            ) : null}

            <div className="mt-6 flex gap-3">
              {step > 0 ? (
                <Button
                  variant="outline"
                  onClick={() => setStep((value) => value - 1)}
                  type="button"
                  className="rounded-sm"
                >
                  Back
                </Button>
              ) : null}
              {step < 2 ? (
                <Button
                  onClick={handleNext}
                  type="button"
                  className="rounded-sm bg-[#ee4d2d] hover:bg-[#d94324]"
                >
                  Continue
                </Button>
              ) : (
                <Button
                  onClick={handlePlaceOrder}
                  type="button"
                  className="rounded-sm bg-[#ee4d2d] hover:bg-[#d94324]"
                >
                  Place Order
                </Button>
              )}
            </div>
          </section>

          <aside className="rounded-sm bg-white p-5 shadow-sm">
            <SectionHeading
              title="Order Summary"
              subtitle="Final totals before confirmation"
            />
            <div className="mt-4 space-y-3 text-sm">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between gap-3 border-b border-zinc-100 pb-3"
                >
                  <span className="line-clamp-1">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="font-medium text-zinc-800">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
              <div className="flex justify-between pt-2 text-zinc-600">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>Discount</span>
                <span>-{formatPrice(discount)}</span>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between border-t border-zinc-100 pt-4 text-lg font-semibold text-zinc-900">
                <span>Total</span>
                <span className="text-[#ee4d2d]">{formatPrice(total)}</span>
              </div>
            </div>
          </aside>
        </div>
      </MotionSection>
    </div>
  );
}
