"use client";

import { Button, Chip } from "@nextui-org/react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function PostType({ type }: { type: { name: string; id: string } }) {
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
    <Link href={`${pathname}?${createQueryString("type", type.id)}`}>
      <Chip as={Button} size="sm" color="secondary" variant="solid" radius="sm">
        {type.name}
      </Chip>
    </Link>
  );
}
