import { getUser } from "@/actions/auth";
import SignOut from "@/components/SingOut";
import protectedContent from "@/middleware/protectedContent";

async function Page() {
  const user = await getUser();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-8">
      <img
        src={user?.avatarUrl!}
        alt="Your Google Profile Picture"
        title="You look great!"
        className="rounded-md w-32 h-32"
      />
      <h1 className="font-mono font-bold text-6xl">Hi! 👋 {user?.name}</h1>
      <p className="max-w-[60ch] text-lg text-center">
        This is a protected route. You can only access it if you are signed in.
        If you sign out, you will be redirected to the home page.
      </p>
      <SignOut />
    </main>
  );
}

export default protectedContent(Page);
