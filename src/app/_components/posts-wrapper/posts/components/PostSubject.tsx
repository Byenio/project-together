import Link from "next/link";


export function PostSubject({ subject }: { subject: { postSubject: string; postSubjectId: string; }; }) {
  return (
    <div className="card-actions justify-start">
      <Link href={`/filter/subject/${subject.postSubjectId}`}>
        <button className="btn btn-accent btn-xs text-accent-content">{subject.postSubject}</button>
      </Link>
    </div>
  );
}
