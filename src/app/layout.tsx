import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ProductProvider } from "./context/ProductContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Magalu",
  description: "A product management application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <ProductProvider>{children}</ProductProvider>
      </body>
    </html>
  );
}