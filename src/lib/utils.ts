import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { init } from "@paralleldrive/cuid2";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

export function generate(length: number = 10) {
  const createId = init({
    random: Math.random,
    length: length,
  });

  return createId();
}

export function generateControlNumber(length: number = 8) {
  let control_number = "";

  for (let i = 0; i < length; i++) {
    control_number += Math.floor(Math.random() * 10);
  }

  return control_number;
}

export function calculateAge(date: Date | string) {
  const today = new Date();
  const birthDate = new Date(date);
  const ageDiff = today.getTime() - birthDate.getTime();
  const ageDate = new Date(ageDiff);
  const calculatedAge = Math.abs(ageDate.getUTCFullYear() - 1970);

  let ageString = "";
  if (calculatedAge === 0) {
    const monthDiff = ageDate.getUTCMonth();
    const monthWord = monthDiff === 1 ? "mês" : "meses";
    ageString = `${monthDiff} ${monthWord}`;
  } else {
    const yearWord = calculatedAge === 1 ? "ano" : "anos";
    ageString = `${calculatedAge} ${yearWord}`;
  }

  return ageString;
}

export function dateFormatter(date: Date | string, style: "full" | "long" | "medium" | "short" = "short") {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: style,
  }).format(new Date(date));
}