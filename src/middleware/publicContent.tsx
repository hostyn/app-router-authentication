import { getUser } from "@/actions/auth";
import { NextPage } from "next";

export default function publicContent(Component: NextPage): NextPage {
  return async () => {
    await getUser();
    return <Component />;
  };
}
