import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { headers } from "next/headers";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { TRPCReactProvider } from "~/trpc/react";
import Nav from "./_components/nav";
import { Providers } from "./providers";

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
    <html lang="pl" className={`dark ${GeistSans.className}`}>
      <body className="m-2">
        <Providers>
          <div className="m-auto min-w-[320px] max-w-[1200px]">
            <TRPCReactProvider headers={headers()}>
              <Nav />
              {children}
              <SpeedInsights />
              <Analytics />
            </TRPCReactProvider>
          </div>
        </Providers>
      </body>
    </html>
  );
}
