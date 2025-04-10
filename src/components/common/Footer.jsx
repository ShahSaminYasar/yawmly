import { useSettings } from "@/services/SettingsProvider";
import Link from "next/link";

const Footer = () => {
  const { colors } = useSettings();

  return (
    <footer
      style={{
        background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})`,
      }}
      className="p-5 mt-auto"
    >
      <span className="block text-center text-sm text-white">
        Copyright 2025 &copy;{" "}
        <Link
          href={"https://shahsaminyasar.vercel.app"}
          target="_blank"
          className="font-medium"
        >
          SHAH SAMIN YASAR
        </Link>
      </span>
    </footer>
  );
};
export default Footer;
