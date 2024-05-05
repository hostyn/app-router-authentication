"use client";

import { signInWithGoogle } from "@/actions/auth";

export default function SignInWithGoogle() {
  return (
    <button
      onClick={async () => {
        await signInWithGoogle();
      }}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Sign in with Google
    </button>
  );
}
