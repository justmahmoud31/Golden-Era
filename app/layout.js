import { Spectral } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Shared/navbar";
import TopNav from "@/components/Shared/topNav";
import GoldenEraFooter from "@/components/Shared/Footer";
import Providers from "./provider";
import { Toaster } from "react-hot-toast";

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-spectral",
  display: "swap",
});

export const metadata = {
  title: "Turmusayacreations",
  description: "turmusayacreations , A nice collections made just for you",
  icons: {
    icon: "/Elogo.jpeg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${spectral.variable}`}>
        <Providers>
          <Toaster />
          <TopNav />
          <Navbar />
          {children}
          <GoldenEraFooter />
        </Providers>
      </body>
    </html>
  );
}

