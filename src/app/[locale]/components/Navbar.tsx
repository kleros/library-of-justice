"use client";

import React, { useMemo } from "react";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { locales } from "@/i18n/routing";

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
    <header className="w-full">
      <div className="flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <Link href={`/${locale}`} className="group flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-purple-500/20 rounded-lg blur-sm group-hover:blur-md transition-all" />
              <Image
                className="relative z-10 drop-shadow-sm"
                src="/kleros.svg"
                priority={true}
                alt="Kleros Library of Justice"
                width="160"
                height="52"
              />
            </div>
          </Link>
        </div>

        {/* Title Section - Hidden on smaller screens, visible on large screens */}
        <div className="hidden lg:flex flex-col items-center">
          <h1 className="text-xl font-semibold text-neutral-800 tracking-tight">
            Library of Justice
          </h1>
          <p className="text-sm text-neutral-500 font-medium">
            Historical Archive
          </p>
        </div>

        {/* Language Selector */}
        <div className="flex items-center">
          <div className={clsx(
            "relative group",
            "bg-white rounded-lg shadow-soft border border-neutral-200",
            "hover:shadow-medium hover:border-primary-300",
            "transition-all duration-200"
          )}>
            <DropdownMenu>
              <DropdownMenuTrigger
                className={clsx(
                  "flex items-center gap-2 px-4 py-2.5 rounded-lg",
                  "text-neutral-700 font-medium text-sm",
                  "hover:bg-gradient-to-br hover:from-primary-50 hover:to-purple-50",
                  "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1",
                  "transition-all duration-200 group"
                )}
              >
                {/* Language Icon */}
                <svg className="w-4 h-4 text-neutral-500 group-hover:text-primary-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
                
                {/* Language Code */}
                <span className="font-semibold tracking-wider text-primary-700">
                  {locale.toUpperCase()}
                </span>
                
                {/* Dropdown Arrow */}
                <svg className="w-4 h-4 text-neutral-400 group-hover:text-primary-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </DropdownMenuTrigger>
              
              <DropdownMenuContent 
                className={clsx(
                  "min-w-[120px] mt-2 p-1",
                  "bg-white rounded-lg shadow-strong border border-neutral-200",
                  "animate-scale-in"
                )}
                align="end"
              >
                {locales.map((innerLocale) =>
                  innerLocale !== locale ? (
                    <DropdownMenuItem
                      key={innerLocale}
                      className={clsx(
                        "flex items-center justify-center px-3 py-2.5 rounded-md",
                        "hover:bg-gradient-to-br hover:from-primary-50 hover:to-purple-50",
                        "hover:text-primary-700 transition-all duration-200",
                        "cursor-pointer group"
                      )}
                    >
                      <Link 
                        href={`/${innerLocale}/${pathWithoutLocale}`}
                        className="flex items-center gap-2 w-full justify-center"
                      >
                        {/* Flag or locale indicator could go here */}
                        <span className="font-semibold tracking-wider text-center group-hover:text-primary-700">
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
      
      {/* Mobile Title - Only visible on smaller screens */}
      <div className="lg:hidden mt-4 text-center">
        <h1 className="text-lg font-semibold text-neutral-800 tracking-tight">
          Library of Justice
        </h1>
        <p className="text-xs text-neutral-500 font-medium">
          Historical Archive
        </p>
      </div>
    </header>
  );
};

export default Navbar;
