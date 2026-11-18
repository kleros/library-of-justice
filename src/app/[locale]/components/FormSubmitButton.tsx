"use client";
import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useFormStatus } from "react-dom";
import { getLangDir } from "rtl-detect";

const FormSubmitButton: React.FC = () => {
  const { pending } = useFormStatus();

  const t = useTranslations("landing");
  const tLoading = useTranslations("loading");
  const locale = useLocale();
  const langDir = getLangDir(locale);

  return (
    <button
      type="submit"
      className={cn(
        "bg-primary-blue h-10",
        {
          "rounded-r": langDir === "ltr",
          "rounded-l": langDir === "rtl",
        },
        "text-base text-white-background font-semibold",
        "px-4 flex gap-2 justify-center items-center",
        !pending && "hover:bg-secondary-blue transition cursor-pointer",
        pending && "bg-stroke animate-pulse",
      )}
      disabled={pending}
    >
      <Image src="/search.svg" alt="Search" width="16" height="16" />
      {pending ? tLoading("title") : t("button")}
    </button>
  );
};

export default FormSubmitButton;
