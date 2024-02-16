// app/providers.tsx
"use client";

import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const navigate = router.push.bind(router);
  return <NextUIProvider navigate={navigate}>{children}</NextUIProvider>;
}
