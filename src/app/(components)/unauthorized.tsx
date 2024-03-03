import { Link } from "@nextui-org/react";

export default function Unauthorized() {
  return (
    <>
      <div>Nie masz dostępu do tej strony!</div>
      <Link href="/">Powrót do strony głównej</Link>
    </>
  );
}
