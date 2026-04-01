"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MotionSection from "@/components/shared/MotionSection";
import SectionHeading from "@/components/shared/SectionHeading";
import { registerSchema } from "@/lib/validators";
import type { z } from "zod";

type RegisterValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (_values: RegisterValues) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    toast.success("Account created successfully (mock)");
    setLoading(false);
  };

  return (
    <div className="container-px shopee-shell py-8 md:py-12">
      <MotionSection className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="hidden rounded-sm bg-white p-8 shadow-sm lg:block">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#ee4d2d]">
            Join Fashion_MV
          </p>
          <h1 className="mt-3 text-4xl font-black leading-tight text-zinc-900">
            Create your account to unlock Shopee-style shopping perks
          </h1>
          <p className="mt-4 text-sm text-zinc-600">
            Save favorite products, receive voucher notifications, and speed up
            checkout.
          </p>
          <div className="mt-8 space-y-3 text-sm text-zinc-600">
            <p>• Daily campaign updates</p>
            <p>• Saved shipping details</p>
            <p>• Fast reorder from order history</p>
          </div>
        </div>

        <div className="rounded-sm bg-white p-5 shadow-sm md:p-6">
          <SectionHeading
            title="Register"
            subtitle="Create your account in under 1 minute"
            action={<span className="shopee-pill">New User</span>}
          />

          <div className="mt-4 grid gap-2">
            <Button variant="outline" type="button" className="h-11 rounded-sm">
              Continue with Google
            </Button>
            <Button variant="outline" type="button" className="h-11 rounded-sm">
              Continue with Facebook
            </Button>
          </div>

          <div className="my-4 flex items-center gap-3 text-xs text-zinc-400">
            <span className="h-px flex-1 bg-zinc-200" />
            OR
            <span className="h-px flex-1 bg-zinc-200" />
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Input
                placeholder="Full name"
                className="h-11 rounded-sm"
                {...register("name")}
              />
              {errors.name ? (
                <p className="mt-1 text-xs text-red-600">
                  {errors.name.message}
                </p>
              ) : null}
            </div>
            <div>
              <Input
                placeholder="Email"
                type="email"
                className="h-11 rounded-sm"
                {...register("email")}
              />
              {errors.email ? (
                <p className="mt-1 text-xs text-red-600">
                  {errors.email.message}
                </p>
              ) : null}
            </div>
            <div>
              <Input
                placeholder="Password"
                type="password"
                className="h-11 rounded-sm"
                {...register("password")}
              />
              {errors.password ? (
                <p className="mt-1 text-xs text-red-600">
                  {errors.password.message}
                </p>
              ) : null}
            </div>
            <div>
              <Input
                placeholder="Confirm password"
                type="password"
                className="h-11 rounded-sm"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword ? (
                <p className="mt-1 text-xs text-red-600">
                  {errors.confirmPassword.message}
                </p>
              ) : null}
            </div>
            <div className="text-sm">
              <Link href="/login" className="font-medium text-[#ee4d2d]">
                Already have an account? Sign in
              </Link>
            </div>
            <motion.div whileTap={{ scale: 0.98 }}>
              <Button
                className="h-11 w-full rounded-sm bg-[#ee4d2d] hover:bg-[#d94324]"
                disabled={loading}
                type="submit"
              >
                {loading ? "Creating account..." : "Create Account"}
              </Button>
            </motion.div>
          </form>
        </div>
      </MotionSection>
    </div>
  );
}
