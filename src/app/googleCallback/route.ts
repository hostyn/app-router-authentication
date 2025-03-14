import { google } from "@/config/arctic";
import { lucia } from "@/config/lucia";
import { db, userSchema } from "@db";
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
  const url = new URL(request.url);

  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  const c = await cookies();

  const storedState = c.get("state")?.value;
  const codeVerifier = c.get("codeVerifier")?.value;

  if (!code || !storedState || !codeVerifier || state !== storedState) {
    return Response.redirect(process.env.NEXT_PUBLIC_URL);
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

  const [user] = await db
    .insert(userSchema)
    .values({
      googleId: googleUser.sub,
      name: googleUser.name,
      email: googleUser.email,
      avatarUrl: googleUser.picture,
    })
    .onConflictDoUpdate({
      target: userSchema.googleId,
      set: {
        name: googleUser.name,
        email: googleUser.email,
        avatarUrl: googleUser.picture,
      },
    })
    .returning({ id: userSchema.id });

  const session = await lucia.createSession(user.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  c.set(sessionCookie);

  return Response.redirect(process.env.NEXT_PUBLIC_URL);
}
