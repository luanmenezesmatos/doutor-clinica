import {
  JetBrains_Mono as FontMono,
  Inter as FontSans,
  Montserrat,
  Raleway,
  Nunito_Sans as NunitoSans,
} from "next/font/google";
import localFont from "next/font/local";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const fontMontserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const fontRaleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
});

export const fontNunito = NunitoSans({
  subsets: ["latin"],
  variable: "--font-nunito",
})

export const fontHeading = localFont({
  src: "../../assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
});
