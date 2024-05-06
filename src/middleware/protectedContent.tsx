import { getUser } from "@/actions/auth";
import { NextPage } from "next";
import { redirect } from "next/navigation";

export default function protectedContent(Component: NextPage): NextPage {
  return async () => {
    const user = await getUser();

    if (!user) {
      redirect("/");
    }

    return <Component />;
  };
}
