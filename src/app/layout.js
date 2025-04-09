import { quickSand } from "@/lib/fonts";
import "./globals.css";
import AuthSessionProvider from "@/services/AuthSessionProvider";
import SettingsProvider from "@/services/SettingsProvider";
import { Toaster } from "react-hot-toast";
import LoadingScreen from "@/components/common/LoadingScreen";

export const metadata = {
  title: "YAWMLY",
  description: "Productivity, daily.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthSessionProvider>
        <SettingsProvider>
          <body className={`${quickSand.className} antialiased`}>
            {children}
            <Toaster />
            <LoadingScreen />
          </body>
        </SettingsProvider>
      </AuthSessionProvider>
    </html>
  );
}
