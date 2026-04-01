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
import { loginSchema } from "@/lib/validators";
import type { z } from "zod";

type LoginValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (_values: LoginValues) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    toast.success("Logged in successfully (mock)");
    setLoading(false);
  };

  return (
    <div className="container-px shopee-shell py-8 md:py-12">
      <MotionSection className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="hidden rounded-sm shopee-gradient shopee-grid-bg p-8 text-white shadow-sm lg:block">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/80">
            Fashion_MV Account
          </p>
          <h1 className="mt-3 text-4xl font-black leading-tight">
            Sign in and continue your Shopee-style shopping flow
          </h1>
          <p className="mt-4 text-sm text-white/85">
            Track orders, save products, apply vouchers, and checkout faster
            with your account.
          </p>
          <div className="mt-8 space-y-3 text-sm">
            <p>• Daily campaign alerts</p>
            <p>• Secure order tracking</p>
            <p>• Wishlist + cart sync</p>
          </div>
        </div>

        <div className="rounded-sm bg-white p-5 shadow-sm md:p-6">
          <SectionHeading
            title="Login"
            subtitle="Access your account to continue checkout"
            action={<span className="shopee-pill">Secure</span>}
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
            <div className="flex items-center justify-between text-sm">
              <Link
                href="/forgot-password"
                className="text-zinc-500 hover:text-black"
              >
                Forgot password?
              </Link>
              <Link href="/register" className="font-medium text-[#ee4d2d]">
                Create account
              </Link>
            </div>
            <motion.div whileTap={{ scale: 0.98 }}>
              <Button
                className="h-11 w-full rounded-sm bg-[#ee4d2d] hover:bg-[#d94324]"
                disabled={loading}
                type="submit"
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </motion.div>
          </form>
        </div>
      </MotionSection>
    </div>
  );
}
