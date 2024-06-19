import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import { Providers } from "@/store/Providers";

import "./globals.css";

const prompt = Prompt({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mercy Shop",
  description: "Shopping express by Mercy Player",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body className={prompt.className}>{children}</body>
      </Providers>
    </html>
  );
}
