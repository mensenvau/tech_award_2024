import { Suspense } from "react";
import { Toaster } from "sonner";
import { Nunito } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { MainLayout } from "@/components/own/layout";

import "../assets/globals.css";
import GoogleAnalytics from "@/components/own/analytics";

const font = Nunito({ subsets: ["latin"] });

export const metadata = {
    title: "Jobgram - Sizning Ultimate Job Search Engine | Keyingi martaba harakatingizni kashf eting",
    description: "Jobgram - bu Internet bo'ylab ish o'rinlari ro'yxatlarini birlashtirgan yetakchi ish agregatoridir. Turli sohalarda va joylarda minglab imkoniyatlarni o'rganing. Karyera sayohatingizni bugun biz bilan boshlang!",
    keywords: ["Jobo", "Uzjobs", "Ish o'rinlar", "Ish kerak", "Ish"],
    generator: "Javascripts",
    applicationName: "Jobgram",
    referrer: "origin-when-cross-origin",
    authors: [{ name: "Utkir" }, { name: "Xujaev", url: "https://t.me/mensenvau" }],
    creator: "Utkir Xujaev",
    publisher: "@mensenvau",
    icons: {
        icon: "/star.png",
        shortcut: "/star.png",
        apple: "/star.png",
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={font.className}>
                <Suspense>
                    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
                        <MainLayout>{children}</MainLayout>
                        <Toaster />
                        <GoogleAnalytics />
                    </ThemeProvider>
                </Suspense>
            </body>
        </html>
    );
}
