"use client";

import { signOut } from "@/actions/auth";

export default function SignOut() {
  return (
    <button
      onClick={async () => {
        await signOut();
      }}
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded w-max transition-colors"
    >
      Sign out
    </button>
  );
}
