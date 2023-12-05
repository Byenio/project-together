import Link from "next/link";

export function PostType({
  type,
}: {
  type: { postType: string; postTypeId: string };
}) {
  return (
    <div className="card-actions justify-start">
      <Link href={`/filter/type/${type.postTypeId}`}>
        <button className="btn btn-accent btn-xs text-accent-content">
          {type.postType}
        </button>
      </Link>
    </div>
  );
}
