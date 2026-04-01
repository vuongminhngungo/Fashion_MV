"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
    <div className="container-px flex min-h-[70vh] items-center justify-center py-10">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold">Welcome back</h1>
          <p className="mt-2 text-sm text-zinc-600">
            Sign in to continue shopping.
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
          <div className="flex items-center justify-between text-sm">
            <Link
              href="/forgot-password"
              className="text-zinc-600 hover:text-black"
            >
              Forgot password?
            </Link>
            <Link href="/register" className="text-[#8B1A1A]">
              Create account
            </Link>
          </div>
          <Button className="w-full" disabled={loading} type="submit">
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
}
