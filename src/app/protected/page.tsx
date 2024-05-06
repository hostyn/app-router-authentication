import SignOut from "@/components/SingOut";
import protectedContent from "@/middleware/protectedContent";

async function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="font-mono font-bold text-6xl">Protected page</h1>
      <SignOut />
    </main>
  );
}

export default protectedContent(Page);
