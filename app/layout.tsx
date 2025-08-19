import { ThemeProvider } from "@/components/ui/theme-provider";
import { Montez, Poppins } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { Toaster } from "sonner";

const poppins = Poppins({
  variable: "--font-edu-nsw-act-cursive",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Questly",
  description:
    "Boost your productivity with our free Questly todo app. Create, manage, and complete tasks with ease. Available on all devices with seamless sync. Try it now!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${poppins.className}`}>
      <body className={`antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NavBar />
          {children}
          <Toaster
            position="bottom-right"
            duration={4000}
            closeButton
            richColors
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
