import { getUser } from "@/actions/auth";
import SignInWithGoogle from "@/components/SignInWithGoogle";
import SignOut from "@/components/SingOut";
import publicContent from "@/middleware/publicContent";

async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="font-mono font-bold text-6xl">Auth demo</h1>
      <SignInWithGoogle />
    </main>
  );
}

export default publicContent(Home);
