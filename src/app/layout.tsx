import type { Metadata } from "next";
import "./globals.css";
import "../styles/full-calendar.css";

import { siteConfig } from "@/config/site";

import { cn } from "@/lib/utils";
import {
  fontHeading,
  fontMono,
  fontSans,
  fontMontserrat,
  fontRaleway,
  fontNunito,
} from "@/lib/fonts";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";

import { Toaster } from "@/components/ui/sonner";

import AuthProvider from "@/components/auth-provider";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen font-sans antialiased",
          fontSans.variable,
          fontMono.variable,
          fontHeading.variable,
          fontMontserrat.variable,
          fontRaleway.variable,
          fontNunito.variable
        )}
      >
        <QueryClientProvider client={queryClient}>
          <Toaster />
          <AuthProvider>{children}</AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
