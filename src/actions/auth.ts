"use server";

import { google } from "@/config/arctic";
import { lucia } from "@/config/lucia";
import { generateCodeVerifier, generateState } from "arctic";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

export const getUser = cache(async () => {
  const c = await cookies();
  const sessionCookie = c.get(lucia.sessionCookieName)?.value;
  if (!sessionCookie) return null;

  const { user, session } = await lucia.validateSession(sessionCookie);
  if (!user || !session) return null;

  if (session && session.fresh) {
    const sessionCookie = lucia.createSessionCookie(session.id);
    c.set(sessionCookie);
  }

  if (!session) {
    const sessionCookie = lucia.createBlankSessionCookie();
    c.set(sessionCookie);
  }

  return user;
});

export const signInWithGoogle = async () => {
  const c = await cookies();
  const state = generateState();
  const codeVerifier = generateCodeVerifier();
  const url = await google.createAuthorizationURL(state, codeVerifier, {
    scopes: ["profile", "email"],
  });

  c.set("state", state, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  });

  c.set("codeVerifier", codeVerifier, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  });

  redirect(url.toString());
};

export const signOut = async () => {
  const c = await cookies();
  const sessionCookie = c.get(lucia.sessionCookieName)?.value;
  if (!sessionCookie) return;

  await lucia.invalidateSession(sessionCookie);

  c.set(lucia.createBlankSessionCookie());
};
