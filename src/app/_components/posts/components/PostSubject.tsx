"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function PostSubject({
  subject,
}: {
  subject: { postSubject: string; postSubjectId: string };
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
      <Link
        href={`${pathname}?${createQueryString(
          "subject",
          subject.postSubjectId,
        )}`}
      >
        <button className="btn btn-accent btn-xs text-accent-content">
          {subject.postSubject}
        </button>
      </Link>
    </div>
  );
}
