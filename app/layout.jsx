import { Syne, DM_Sans } from "next/font/google";
import AppTheme from "./theme";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "XiviaSoft",
  description:
    "Soft glass digital experiences — web, mobile, and AI products crafted with calm precision.",
  icons: {
    icon: "/images/xivia-mark.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`}>
      <body>
        <AppTheme>
          <div className="site-shell">
            <div className="atmosphere" aria-hidden>
              <div className="atmosphere__orb atmosphere__orb--one" />
              <div className="atmosphere__orb atmosphere__orb--two" />
              <div className="atmosphere__orb atmosphere__orb--three" />
            </div>
            <div className="site-content">{children}</div>
          </div>
        </AppTheme>
      </body>
    </html>
  );
}
