"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Ship, Tent, Compass, MapPinned, Calculator } from "lucide-react";
import { Logo } from "@/components/site/Logo";
import { StyleSwitcher } from "@/components/site/StyleSwitcher";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/cruises", label: "Luxury Cruises", icon: Ship },
  { href: "/backpacking", label: "Budget Backpacking", icon: Tent },
  { href: "/blog", label: "Travel Guides", icon: Compass },
  { href: "/stays", label: "Excursions & Stays", icon: MapPinned },
  { href: "/calculator", label: "Trip Budget Calculator", icon: Calculator },
];

const linkBase =
  "relative inline-flex min-h-[44px] whitespace-nowrap items-center text-[13px] font-semibold tracking-wide transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy";

const linkDesktop =
  "hidden lg:inline-flex after:absolute after:inset-x-0 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-gold after:content-[''] motion-safe:after:transition-transform motion-safe:after:duration-200 hover:after:scale-x-100";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40 border-b border-sand bg-paper/95 backdrop-blur supports-[backdrop-filter]:bg-paper/85">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex min-h-[44px] items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
          aria-label="Anchor & Trail — home"
        >
          <Logo />
          <span className="font-serif text-[19px] font-bold leading-none text-navy">
            Anchor &amp; Trail
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-5 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={cn(linkBase, linkDesktop, "py-2", {
                "text-navy after:scale-x-100 after:bg-gold":
                  isActive(link.href),
                "text-mist hover:text-navy": !isActive(link.href),
              })}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden xl:block">
          <StyleSwitcher />
        </div>

        {/* Mobile / tablet drawer */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="mobile-nav"
              className="flex size-11 items-center justify-center rounded-md text-navy transition-colors duration-150 ease-out hover:bg-sand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy xl:hidden"
            >
              <Menu aria-hidden="true" className="size-5" />
              <span className="sr-only">Open navigation menu</span>
            </button>
          </SheetTrigger>
          <SheetContent
            id="mobile-nav"
            side="right"
            className="w-80 overflow-y-auto bg-canvas p-6"
          >
            <SheetHeader className="p-0">
              <SheetTitle className="flex items-center gap-2.5 text-left">
                <Logo className="size-8" />
                <span className="font-serif text-lg font-bold text-navy">
                  Anchor &amp; Trail
                </span>
              </SheetTitle>
            </SheetHeader>
            <nav aria-label="Mobile" className="mt-6">
              <ul className="space-y-1">
                {NAV_LINKS.map((link) => {
                  const Icon = link.icon;
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        aria-current={isActive(link.href) ? "page" : undefined}
                        className={cn(
                          "flex min-h-[44px] items-center gap-3 rounded-md px-3 py-2.5 text-[15px] font-semibold transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy",
                          isActive(link.href)
                            ? "bg-sand text-navy"
                            : "text-ink hover:bg-sand/70"
                        )}
                      >
                        <Icon aria-hidden="true" className="size-4.5 text-gold-ink" />
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <div className="mt-6 border-t border-sand pt-6">
              <p className="eyebrow mb-3 text-mist">Travel Style</p>
              <StyleSwitcher />
            </div>
            <Link
              href="/disclosure"
              onClick={() => setOpen(false)}
              className="mt-6 inline-flex min-h-[44px] items-center text-[13px] font-semibold text-mist underline decoration-gold underline-offset-4 hover:text-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
            >
              Affiliate Disclosure
            </Link>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
