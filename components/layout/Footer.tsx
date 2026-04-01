import Link from "next/link";

const footerGroups = [
  {
    title: "Customer Service",
    items: ["Help Center", "Payment", "Shipping", "Returns", "Contact Us"],
  },
  {
    title: "About Fashion_MV",
    items: ["About Us", "Careers", "Privacy Policy", "Terms", "Press"],
  },
  {
    title: "Payment",
    items: ["Visa", "Mastercard", "PayPal", "COD", "ShopeePay Style"],
  },
  {
    title: "Download App",
    items: ["iOS App", "Android App", "Desktop Web"],
  },
];

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-zinc-200 bg-white">
      <div className="container-px mx-auto max-w-7xl py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h4 className="text-sm font-bold uppercase tracking-wide text-zinc-800">
                {group.title}
              </h4>
              <ul className="mt-3 space-y-2 text-sm text-zinc-500">
                {group.items.map((item) => (
                  <li key={item}>
                    <Link
                      href="/products"
                      className="transition hover:text-[#ee4d2d]"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-zinc-200 bg-zinc-50 py-4 text-center text-xs text-zinc-500">
        © {new Date().getFullYear()} Fashion_MV. Shopee-inspired UI showcase for
        fashion commerce.
      </div>
    </footer>
  );
}
