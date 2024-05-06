"use client";

import { signOut } from "@/actions/auth";

export default function SignOut() {
  return (
    <button
      onClick={async () => {
        await signOut();
      }}
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
    >
      Sign out
    </button>
  );
}
