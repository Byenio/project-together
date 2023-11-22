
export function PostDescription({ postDescription }: { postDescription: string; }) {
  return (
    <p className="h-[100px] px-2 overflow-y-auto">{postDescription}</p>
  );
}
