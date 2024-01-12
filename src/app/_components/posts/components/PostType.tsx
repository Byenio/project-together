"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function PostType({
  type,
}: {
  type: { postType: string; postTypeId: string };
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
    <div className="card-actions justify-start">
      <Link href={`${pathname}?${createQueryString("type", type.postTypeId)}`}>
        <button className="btn btn-accent btn-xs mx-[.4rem] text-accent-content">
          {type.postType}
        </button>
      </Link>
    </div>
  );
}
