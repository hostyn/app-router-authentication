import { getUser } from "@/actions/auth";
import SignInWithGoogle from "@/components/SignInWithGoogle";
import SignOut from "@/components/SingOut";
import publicContent from "@/middleware/publicContent";
import Link from "next/link";

async function Home() {
  const user = await getUser();

  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-8 justify-center">
      <h1 className="font-mono font-bold text-6xl max-w-[20ch] text-pretty text-center">
        Authentication in Next.js App Router
      </h1>
      <p className="max-w-[60ch] text-lg">
        This is a demo developed to demonstrate how the App Router works. In
        this case, I developed basic authentication using Lucia to manage
        sessions, Arctic for OAuth logins, and Drizzle as the ORM for a
        PostgreSQL database. All the code is fully available on my GitHub for
        you to see how it&apos;s done.
      </p>
      {user == null ? (
        <SignInWithGoogle />
      ) : (
        <div className="gap-2 flex flex-col">
          <h2 className="text-2xl font-bold text-blue-500">
            Hi! 👋 {user.name}
          </h2>
          <p>
            Now that you have signed in, you can access{" "}
            <Link href="profile" className="font-semibold text-blue-400">
              your profile
            </Link>
            , which is a protected route.
          </p>
          <SignOut />
        </div>
      )}
    </main>
  );
}

export default publicContent(Home);
