import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (dateString: string): string => {
  if (!dateString) {
    return "Invalid Date";
  }

  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  const formatter = new Intl.DateTimeFormat("id-ID", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const parts = formatter.formatToParts(date);
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;
  const year = parts.find((part) => part.type === "year")?.value;

  return `${month} ${day}, ${year}`;
};

export const formatDateAdmin = (dateString: string): string => {
  if (!dateString) {
    return "Invalid Date";
  }

  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  const formatter = new Intl.DateTimeFormat("id-ID", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const parts = formatter.formatToParts(date);
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;
  const year = parts.find((part) => part.type === "year")?.value;
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const time = `${hours}:${minutes}:${seconds}`;

  return `${month} ${day}, ${year} ${time}`;
};
