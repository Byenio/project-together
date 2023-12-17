import { redirect } from "next/navigation";

export default function Login() {
  redirect("/api/auth/signin");
}
