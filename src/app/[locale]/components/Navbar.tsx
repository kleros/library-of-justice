import React from "react";

import clsx from "clsx";
import Image from "next/image";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { locales } from "@/i18n/routing";

interface INavbar {
  locale: typeof locales[number];
}

const Navbar: React.FC<INavbar> = ({ locale }) => {
  return(
    <header className="w-full grid grid-cols-3">
      <Image
        className="col-start-2 place-self-center"
        src="/kleros.svg"
        priority={true}
        alt="kleros"
        width="148"
        height="48"
      />
      <div
        className={clsx(
          "justify-self-end place-self-center",
          "border-stroke border-2 rounded"
        )}
      >
        <DropdownMenu>
          <DropdownMenuTrigger
            className={clsx(
              "focus:outline-none hover:bg-light-background transition",
              "rounded",
              "py-2 px-4"
            )}
          >
            <span className="text-primary-text">
              {locale.toUpperCase()}
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-min">
            {locales.map((innerLocale) => (
              innerLocale !== locale ? (
                <DropdownMenuItem
                  key={innerLocale}
                  className={clsx(
                    "hover:cursor-pointer hover:bg-light-background",
                    "py-2 px-4"
                  )}
                >
                  <span className="text-primary-text text-center">
                    {innerLocale.toUpperCase()}
                  </span>
                </DropdownMenuItem>
              ) : null
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
};

export default Navbar;
