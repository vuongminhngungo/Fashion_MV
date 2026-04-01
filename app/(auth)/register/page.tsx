"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
    <div className="container-px flex min-h-[70vh] items-center justify-center py-10">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold">Create account</h1>
          <p className="mt-2 text-sm text-zinc-600">
            Join fashion-mv for faster checkout and saved favorites.
          </p>
        </div>

        <div className="mb-4 grid gap-2">
          <Button variant="outline" type="button">
            Continue with Google
          </Button>
          <Button variant="outline" type="button">
            Continue with Facebook
          </Button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input placeholder="Full name" {...register("name")} />
            {errors.name ? (
              <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
            ) : null}
          </div>
          <div>
            <Input placeholder="Email" type="email" {...register("email")} />
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
              {...register("confirmPassword")}
            />
            {errors.confirmPassword ? (
              <p className="mt-1 text-xs text-red-600">
                {errors.confirmPassword.message}
              </p>
            ) : null}
          </div>
          <div className="text-sm">
            <Link href="/login" className="text-[#8B1A1A]">
              Already have an account? Sign in
            </Link>
          </div>
          <Button className="w-full" disabled={loading} type="submit">
            {loading ? "Creating account..." : "Create Account"}
          </Button>
        </form>
      </div>
    </div>
  );
}
