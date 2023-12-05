export function PostDescription({
  postDescription,
}: {
  postDescription: string;
}) {
  return <p className="h-[100px] overflow-y-auto px-2">{postDescription}</p>;
}
