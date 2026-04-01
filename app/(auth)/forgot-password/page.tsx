"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MotionSection from "@/components/shared/MotionSection";
import SectionHeading from "@/components/shared/SectionHeading";

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email"),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
    mode: "onChange",
  });

  const onSubmit = async (_values: ForgotPasswordValues) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    toast.success("Password reset link sent (mock)");
    setLoading(false);
  };

  return (
    <div className="container-px shopee-shell py-8 md:py-12">
      <MotionSection className="mx-auto max-w-lg rounded-sm bg-white p-5 shadow-sm md:p-6">
        <SectionHeading
          title="Forgot Password"
          subtitle="Recover account access using your registered email"
          action={<span className="shopee-pill">Recovery</span>}
        />

        <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
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
          <motion.div whileTap={{ scale: 0.98 }}>
            <Button
              className="h-11 w-full rounded-sm bg-[#ee4d2d] hover:bg-[#d94324]"
              disabled={loading}
              type="submit"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>
          </motion.div>
        </form>
      </MotionSection>
    </div>
  );
}
