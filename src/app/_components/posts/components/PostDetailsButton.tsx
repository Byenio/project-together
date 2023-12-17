import Link from "next/link";

export function PostDetailsButton({ postId }: { postId: string }) {
  return (
    <div className="card-actions justify-end">
      <Link href={`/search/post/${postId}`}>
        <button className="btn btn-accent btn-sm text-accent-content">
          <FaAngleRight />
        </button>
      </Link>
    </div>
  );
}
function FaAngleRight() {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth={0}
      viewBox="0 0 256 512"
      height="1em"
      width="1em"
    >
      <path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z" />
    </svg>
  );
}
