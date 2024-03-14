import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { init } from "@paralleldrive/cuid2";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generate(length: number = 10) {
  const createId = init({
    random: Math.random,
    length: length,
  });

  return createId();
}