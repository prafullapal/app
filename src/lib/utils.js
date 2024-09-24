import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import animationData from "@/assets/lottie-json";

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const colors = [
  "bg-[#712C4A57] text-[#FF006E] border-[1px] border-[#FF006FAA]",
  "bg-[#FFD60A2A] text-[#FFD60A] border-[1px] border-[#FFD60ABB]",
  "bg-[#06D6A02A] text-[#06D6A0] border-[1px] border-[#06D6A0BB]",
  "bg-[#4CC9F02A] text-[#4CC9F0] border-[1px] border-[#4CC9F0BB]",
];

export const getColor = (color) => {
  if(color >= 0 && color < colors.length) {
      return colors[color];
  }
  return colors[0];
}

export const animationDefaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
};