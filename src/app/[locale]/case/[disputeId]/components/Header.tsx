import React from "react";

import { getTranslations } from "next-intl/server";

interface IHeader {
  disputeId: `${number}`;
}

const Header: React.FC<IHeader> = async ({ disputeId }) => {
  const t = await getTranslations("case");

  return (
    <div
      className="pb-12 pt-6 px-6 w-full"
      style={{
        background: "var(--gradient-hero)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center">
          <h2
            className="text-4xl font-bold text-white mb-4 animate-fade-in"
            dir="auto"
          >
            {t("title")}
            <span className="text-accent-foreground" dir="auto">
              &nbsp;#{disputeId}&nbsp;
            </span>
          </h2>
          <div className="w-32 h-1 bg-white/30 mx-auto rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Header;
