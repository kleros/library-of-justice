"use client";

import React, { useMemo } from "react";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { locales } from "@/i18n/routing";
import { ExternalLink, HelpCircle } from "lucide-react";

interface INavbar {
  locale: (typeof locales)[number];
}

const Navbar: React.FC<INavbar> = ({ locale }) => {
  const pathname = usePathname();

  const pathWithoutLocale = useMemo(
    () => pathname.split("/").slice(2).join("/"),
    [pathname],
  );

  return (
    <header
      className="relative pt-12 px-6 overflow-hidden"
      style={{
        background: "var(--gradient-hero)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          <Link
            href={`/${locale}`}
            className="flex items-center space-x-4 cursor-pointer"
          >
            <img
              src="/kleros.svg"
              alt="Kleros"
              className="w-36 h-20 object-contain"
            />
          </Link>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
              dir="auto"
            >
              <HelpCircle className="w-4 h-4 mr-2" />
              FAQ
              <ExternalLink className="w-3 h-3 ml-1" />
            </Button>
            <div
              className={clsx(
                "justify-self-end place-self-center",
                "transition hover:scale-110 hover:drop-shadow",
              )}
            >
              <DropdownMenu>
                <DropdownMenuTrigger className="border-none">
                  <Badge
                    variant="secondary"
                    className="glass text-secondary-foreground border-white/30"
                  >
                    {locale.toUpperCase()}
                  </Badge>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="min-w-min">
                  {locales.map((innerLocale) =>
                    innerLocale !== locale ? (
                      <DropdownMenuItem
                        key={innerLocale}
                        className={clsx(
                          "hover:cursor-pointer hover:bg-light-background",
                          "py-2 px-4",
                        )}
                      >
                        <Link href={`/${innerLocale}/${pathWithoutLocale}`}>
                          <span className="text-primary-text text-center">
                            {innerLocale.toUpperCase()}
                          </span>
                        </Link>
                      </DropdownMenuItem>
                    ) : null,
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
