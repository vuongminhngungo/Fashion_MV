"use client";

import Link from "next/link";
import { Home, Search, ShoppingCart, User } from "lucide-react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/search", label: "Search", icon: Search },
  { href: "/cart", label: "Cart", icon: ShoppingCart },
  { href: "/login", label: "Me", icon: User },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-zinc-200 bg-white shadow-[0_-8px_24px_rgba(0,0,0,0.06)] md:hidden">
      <ul className="grid grid-cols-4">
        {links.map((link) => {
          const Icon = link.icon;
          const active = pathname === link.href;
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "relative flex flex-col items-center justify-center py-2 text-[11px] font-medium",
                  active ? "text-[#ee4d2d]" : "text-zinc-500",
                )}
              >
                {active ? (
                  <motion.span
                    layoutId="mobile-nav-indicator"
                    className="absolute top-0 h-0.5 w-10 rounded-full bg-[#ee4d2d]"
                  />
                ) : null}
                <Icon className="mb-1 h-5 w-5" />
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
