import { Outfit, Quicksand } from "next/font/google";

export const quickSand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  display: "swap",
});
