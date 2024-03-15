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
