import type { Metadata } from "next";
import "./page.css";
import "./overrides.css";
import "./profile.css";
import "./tasks.css";
import "./documents.css";
import "./farewell.css";
import "./farewell-overrides.css";
import "./farewell-finale.css";
import "./farewell-party-extended.css";
import "./finale-reading-mode.css";
import "./thoughts.css";
import "./finale-reading-fixes.css";
import "./privacy.css";

export const metadata: Metadata = {
  title: "Документы — рабочее пространство",
  description: "Демонстрационный интерфейс",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body>{children}</body></html>;
}
