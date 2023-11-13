import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { headers } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";
import { Navbar } from "./_components/navbar/navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "ZSTI Together",
  description: "ZSTI instance of Project Together",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body className={`font-sans ${inter.variable} w-[100] m-5`}>
        <div className=" min-w-[400px] max-w-[1200px] m-auto">
          <TRPCReactProvider headers={headers()}>
            <Navbar />
            {children}
          </TRPCReactProvider>
        </div>
      </body>
    </html>
  );
}
