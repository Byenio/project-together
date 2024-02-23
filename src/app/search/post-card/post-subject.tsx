"use client";

import { Button, Chip } from "@nextui-org/react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function PostSubject({
  subject,
}: {
  subject: { name: string; id: string };
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams],
  );

  return (
    <Link href={`${pathname}?${createQueryString("subject", subject.id)}`}>
      <Chip as={Button} size="sm" color="secondary" variant="solid" radius="sm">
        {subject.name}
      </Chip>
    </Link>
  );
}
