import React from "react";

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
      <div className="justify-self-end">
        <DropdownMenu>
          <DropdownMenuTrigger>{locale}</DropdownMenuTrigger>
          <DropdownMenuContent>
            {locales.map((innerLocale) => (
              <DropdownMenuItem key={innerLocale}>
                {innerLocale}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
};

export default Navbar;
