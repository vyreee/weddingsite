import * as React from "react";
import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-brand-secondary/30 py-10 mt-10">
      <div className="mx-auto max-w-6xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-brand-dark/80">
        <div>© {new Date().getFullYear()} LureDexigns • Wedding.Site</div>
        <nav className="flex gap-4">
          <Link href="#features" className="hover:text-brand-primary">Features</Link>
          <Link href="#pricing" className="hover:text-brand-primary">Pricing</Link>
          <Link href="#contact" className="hover:text-brand-primary">Contact</Link>
          <Link href="#faq" className="hover:text-brand-primary">FAQ</Link>
        </nav>
      </div>
    </footer>
  );
}
