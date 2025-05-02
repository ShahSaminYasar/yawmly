import { quickSand } from "@/lib/fonts";
import "./globals.css";
import AuthSessionProvider from "@/services/AuthSessionProvider";
import SettingsProvider from "@/services/SettingsProvider";
import { Toaster } from "react-hot-toast";
import LoadingScreen from "@/components/common/LoadingScreen";
import { Analytics } from "@vercel/analytics/next";
import ChooseDataSetModal from "@/components/auth/ChooseDataSetModal";
import NotificationEnableTutorialModal from "@/components/main/NotificationEnableTutorialModal";
import LoginPromptModal from "@/components/main/LoginPromptModal";

export const metadata = {
  manifest: "/manifest.json",
  title: "YAWMLY - Productivity, daily",
  description:
    "Yawmly is your all-in-one daily planner and D-Day tracker designed to keep you focused, productive, and in control of your schedule.",
  icons: "/favicon.ico",
  keywords: [
    "Yawmly",
    "day planner",
    "productivity",
    "productivity app",
    "study planner app",
    "student planner",
    "task manager",
    "online day planner",
    "daily schedule planner",
    "dday viewer",
    "pwa productivity",
    "free productivity app",
    "web app for planning",
    "personal planner",
    "habit tracker",
    "goal planner",
    "free online productivity web app",
    "multiplatform planner app",
    "planner app for students",
    "time blocking app",
    "routine planner",
    "d-day tracker",
    "daily productivity",
  ],
  robots: "index, follow",
  authors: [{ name: "Shah Samin Yasar" }],
  metadataBase: new URL("https://yawmly.vercel.app"),
  openGraph: {
    title: "YAWMLY - Productivity, daily.",
    description:
      "Yawmly is your all-in-one daily planner and D-Day tracker designed to keep you focused, productive, and in control of your schedule.",
    url: "https://yawmly.vercel.app",
    siteName: "YAWMLY - Productivity, daily.",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1080,
        height: 1080,
        alt: "YAWMLY - Day planner and D-Day tracker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "YAWMLY - Productivity, daily.",
    description:
      "Yawmly is your personal daily planner and D-Day tracker designed to help you stay focused and organized.",
    images: ["/og-image.jpg"],
  },
};

export const viewport = {
  themeColor: "#ff6302",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthSessionProvider>
        <SettingsProvider>
          <body className={`${quickSand.className} antialiased`}>
            {children}
            <Toaster />
            <ChooseDataSetModal />
            <NotificationEnableTutorialModal />
            <LoginPromptModal />
            <LoadingScreen />
            <Analytics />
          </body>
        </SettingsProvider>
      </AuthSessionProvider>
    </html>
  );
}
