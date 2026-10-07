import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";

import "./globals.css";

import ThemeProvider from "../components/common/ThemeProvider";
import Header from "../components/layouts/Header";
import Footer from "../components/layouts/Footer";
import FloatingContact from "../components/layouts/FloatingContact";

const font = Be_Vietnam_Pro({
  subsets: ["vietnamese", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-be-vietnam",
});

export const metadata: Metadata = {
  title: "Cho thuê xe cẩu Tây Ninh 5 – 100 tấn | Xe Cẩu Phước Lộc",
  description:
    "Dịch vụ cho thuê xe cẩu Tây Ninh từ 5 tấn đến 100 tấn. Có xe ngay, giá hợp lý, vận hành an toàn, phục vụ 24/7.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="vi"
      className={font.variable}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main>{children}</main>
          <Footer />
          <FloatingContact />
        </ThemeProvider>
      </body>
    </html>
  );
}