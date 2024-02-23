import type { Metadata } from "next";
import "./globals.css";

import { siteConfig } from "@/config/site";

import { cn } from "@/lib/utils";
import { fontHeading, fontMono, fontSans, fontMontserrat, fontRaleway } from "@/lib/fonts";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";

import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  icons: {
    icon: "/images/ico/favicon.ico",
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
        )}
      >
        <QueryClientProvider client={queryClient}>
          {children}
          <Toaster />
        </QueryClientProvider>
      </body>
    </html>
  );
}
