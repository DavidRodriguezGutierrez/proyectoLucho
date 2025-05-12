import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { DesignSystemProvider } from "@mappnext/ds-tw/templates/DesignSystemProvider";
import BaseLayout from "@mappnext/ds-tw/templates/BaseLayout";
import { defaultThemeConfig, navigationData } from "./menu";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MappCheck",
  description: "Gestiona tus inventarios de forma eficiente y sencilla",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <DesignSystemProvider theme={defaultThemeConfig}>
          <BaseLayout navigationData={navigationData}>{children}</BaseLayout>
        </DesignSystemProvider>
      </body>
    </html>
  );
}
