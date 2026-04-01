import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="container-px mx-auto grid max-w-7xl gap-8 py-10 md:grid-cols-4">
        <div>
          <p className="text-lg font-semibold">fashion-mv</p>
          <p className="mt-2 text-sm text-zinc-600">
            Modern fashion for everyday confidence.
          </p>
        </div>
        <div>
          <h4 className="font-medium">Shop</h4>
          <ul className="mt-2 space-y-1 text-sm text-zinc-600">
            <li>
              <Link href="/products?category=CLOTHING">Clothing</Link>
            </li>
            <li>
              <Link href="/products?category=SHOES">Shoes</Link>
            </li>
            <li>
              <Link href="/products?category=BAGS">Bags</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium">Account</h4>
          <ul className="mt-2 space-y-1 text-sm text-zinc-600">
            <li>
              <Link href="/login">Login</Link>
            </li>
            <li>
              <Link href="/register">Register</Link>
            </li>
            <li>
              <Link href="/orders">Orders</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium">Follow</h4>
          <p className="mt-2 text-sm text-zinc-600">Instagram · Facebook · X</p>
        </div>
      </div>
      <div className="border-t border-zinc-200 py-4 text-center text-xs text-zinc-500">
        © {new Date().getFullYear()} fashion-mv. All rights reserved.
      </div>
    </footer>
  );
}
