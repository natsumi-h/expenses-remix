import { hash, compare } from "bcryptjs";
import { prisma } from "./database.server";
import { createCookieSessionStorage, redirect } from "@remix-run/node";

type AuthInput = {
  email: string;
  password: string;
};

const SESSION_SECRET = process.env.SESSION_SECRET;

// sessionのタイプをcookieに設定
export const sessionStorage = createCookieSessionStorage({
  cookie: {
    secure: process.env.NODE_ENV === "production",
    secrets: [SESSION_SECRET as string],
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    httpOnly: true,
  },
});

// sessionの作成
async function createUserSession(userId: string, redirectPath: string) {
  const session = await sessionStorage.getSession();
  session.set("userId", userId);
  return redirect(redirectPath, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
}

// sessionの取得
export async function getUserFromSession(request: Request) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  const userId = session.get("userId");
  if (!userId) return null;
  return userId;
}

// sessionの削除
export async function logout(request: Request) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  // session.set("userId", null);
  return redirect("/", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}

// sessionのチェック
export async function requireUserSession(request: Request) {
  const userId = await getUserFromSession(request);
  if (!userId) {
    throw redirect("/auth");
  }
  return userId;
}

export async function signup({ email, password }: AuthInput) {
  const existingUser = await prisma.user.findFirst({
    where: { email },
  });

  if (existingUser) {
    const error: any = new Error("User already exists");
    error.status = 422;
    throw error;
  }

  const passwordHash = await hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      password: passwordHash,
      plan: "free",
    },
  });
  return createUserSession(user.id, "/expenses");
}

export async function login({ email, password }: AuthInput) {
  const existingUser = await prisma.user.findFirst({
    where: { email },
  });

  if (!existingUser) {
    // const error = new Error("Either email or password is incorrect");
    // error.status = 401;
    // throw error;

    throw new Response("Either email or password is incorrect.", {
      status: 401,
    });

    // let validationErrors: any = {};
    // validationErrors.email = "Either email or password is incorrect.";
    // throw validationErrors;
  }

  const passwordMatch = await compare(password, existingUser.password);

  if (!passwordMatch) {
    // const error = new Error("Either email or password is incorrect");
    // error.status = 401;
    // throw error;
    throw new Response("Either email or password is incorrect.", {
      status: 401,
    });

    // let validationErrors: any = {};
    // validationErrors.email = "Either email or password is incorrect.";
    // throw validationErrors;
  }

  return createUserSession(existingUser.id, "/expenses");
}
