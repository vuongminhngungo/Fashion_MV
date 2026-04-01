"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
    <div className="container-px mx-auto max-w-6xl py-8">
      <h1 className="mb-6 text-3xl font-semibold">Checkout</h1>

      <div className="mb-8">
        <div className="mb-3 flex items-center justify-between text-sm text-zinc-500">
          {steps.map((label, index) => (
            <div
              key={label}
              className={index <= step ? "font-medium text-black" : ""}
            >
              {index + 1}. {label}
            </div>
          ))}
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-zinc-200">
          <div
            className="h-full bg-black transition-all"
            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <section className="rounded-xl border border-zinc-200 p-5">
          {step === 0 ? (
            <form className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <Input
                  placeholder="Full name"
                  {...shippingForm.register("name")}
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
                />
                {shippingForm.formState.errors.address ? (
                  <p className="mt-1 text-xs text-red-600">
                    {shippingForm.formState.errors.address.message}
                  </p>
                ) : null}
              </div>
              <div>
                <Input placeholder="City" {...shippingForm.register("city")} />
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
                />
                {paymentForm.formState.errors.expiry ? (
                  <p className="mt-1 text-xs text-red-600">
                    {paymentForm.formState.errors.expiry.message}
                  </p>
                ) : null}
              </div>
              <div>
                <Input placeholder="CVV" {...paymentForm.register("cvv")} />
                {paymentForm.formState.errors.cvv ? (
                  <p className="mt-1 text-xs text-red-600">
                    {paymentForm.formState.errors.cvv.message}
                  </p>
                ) : null}
              </div>
            </form>
          ) : null}

          {step === 2 ? (
            <div className="space-y-4 text-sm">
              <div>
                <h2 className="font-semibold">Shipping</h2>
                <p className="mt-1 text-zinc-600">
                  {shippingForm.getValues("name")} ·{" "}
                  {shippingForm.getValues("email")}
                </p>
                <p className="text-zinc-600">
                  {shippingForm.getValues("address")},{" "}
                  {shippingForm.getValues("city")},{" "}
                  {shippingForm.getValues("country")}
                </p>
              </div>
              <div>
                <h2 className="font-semibold">Payment</h2>
                <p className="mt-1 text-zinc-600">
                  Card ending in{" "}
                  {paymentForm.getValues("cardNumber").slice(-4) || "0000"}
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => setStep(0)}
                type="button"
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
              >
                Back
              </Button>
            ) : null}
            {step < 2 ? (
              <Button onClick={handleNext} type="button">
                Continue
              </Button>
            ) : (
              <Button onClick={handlePlaceOrder} type="button">
                Place Order
              </Button>
            )}
          </div>
        </section>

        <aside className="rounded-xl border border-zinc-200 p-5">
          <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>
          <div className="space-y-3 text-sm">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between gap-3">
                <span className="line-clamp-1">
                  {item.name} × {item.quantity}
                </span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
            <div className="flex justify-between border-t pt-3">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              <span>-{formatPrice(discount)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between border-t pt-3 text-base font-semibold">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
