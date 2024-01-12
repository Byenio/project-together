import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { headers } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";
import { Navbar } from "./_components/navbar/navbar";

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
    <html lang="pl" className={GeistSans.className}>
      <body className={`m-5 w-[100]`}>
        <div className=" m-auto min-w-[400px] max-w-[1200px]">
          <TRPCReactProvider headers={headers()}>
            <Navbar />
            {children}
          </TRPCReactProvider>
        </div>
      </body>
    </html>
  );
}
