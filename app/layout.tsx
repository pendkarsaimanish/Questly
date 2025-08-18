import { ThemeProvider } from "@/components/ui/theme-provider";
import { Sansation, Edu_NSW_ACT_Cursive } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

const sansation = Sansation({
  weight: ["300", "400", "700"],
  variable: "--font-sansation",
  subsets: ["latin"],
});

const edu_nsw_act_cursive = Edu_NSW_ACT_Cursive({
  variable: "--font-edu-nsw-act-cursive",
  subsets: ["latin"],
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
    <html
      lang="en"
      suppressHydrationWarning
      className={`${edu_nsw_act_cursive.className}`}
    >
      <body className={`antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
