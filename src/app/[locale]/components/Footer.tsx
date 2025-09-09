import { Scale } from "lucide-react";
import { getTranslations } from "next-intl/server";
import React from "react";

const Footer: React.FC = async () => {
  const t = await getTranslations("footer");
  return (
    <div className="text-center pt-8 pb-16">
      <div
        className="flex items-center justify-center space-x-4 mb-4"
        dir="auto"
      >
        <Scale className="size-6 text-primary rtl:ml-1" />
        <span className="text-lg font-semibold">{t("title")}</span>
      </div>
      <p className="text-muted-foreground" dir="auto">
        {t("subtitle")}
      </p>
    </div>
  );
};

export default Footer;
