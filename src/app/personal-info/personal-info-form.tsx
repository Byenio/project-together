"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "~/trpc/react";

export default function PersonalInfoForm() {
  const router = useRouter();
  const [fullname, setFullname] = useState("");

  const updateFullname = api.user.updateFullname.useMutation({
    onSuccess: () => {
      router.refresh();
      setFullname("");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        updateFullname.mutate({ fullname });
      }}
      className="flex flex-col gap-2"
    >
      <input
        type="text"
        placeholder="Full name"
        value={fullname}
        onChange={(e) => setFullname(e.target.value)}
        className="input input-bordered input-accent w-full rounded-md px-4 py-2 text-neutral-content"
      />
      <div className="flex w-full justify-end">
        <button
          type="submit"
          className="w-max-[150px] my-4 rounded-md bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
          disabled={updateFullname.isLoading}
        >
          {updateFullname.isLoading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  );
}
