"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Countdown({ endAt }: { endAt: string }) {
  const [time, setTime] = useState("00:00:00");

  useEffect(() => {
    const target = new Date(endAt).getTime();

    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTime(
        `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`,
      );
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [endAt]);

  return (
    <motion.span
      animate={{ scale: [1, 1.03, 1] }}
      transition={{
        duration: 1.2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
      className="rounded-sm bg-[#ee4d2d] px-3 py-1.5 text-xs font-bold tracking-wide text-white shadow-sm"
    >
      {time}
    </motion.span>
  );
}
