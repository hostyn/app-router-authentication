import { google } from "@/config/arctic";
import { cookies } from "next/headers";

interface GoogleUser {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
  locale: string;
}

export async function GET(request: Request) {
  // return Response.redirect("http://localhost:3000");

  const url = new URL(request.url);

  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  const storedState = cookies().get("state")?.value;
  const codeVerifier = cookies().get("codeVerifier")?.value;

  if (!code || !storedState || !codeVerifier || state !== storedState) {
    return Response.redirect(process.env.NEXT_PUBLIC_URL!);
  }

  const tokens = await google.validateAuthorizationCode(code, codeVerifier);

  const response = await fetch(
    "https://openidconnect.googleapis.com/v1/userinfo",
    {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    }
  );
  const googleUser: GoogleUser = await response.json();

  console.log(googleUser);

  return Response.redirect(process.env.NEXT_PUBLIC_URL!);
}
