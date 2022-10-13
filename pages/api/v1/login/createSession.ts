// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "nookies";
import { auth, firebase } from "../../../../firebaseAdmin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  if (req.method !== "POST") return res.status(404).end();

  const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5日
  // const expiresIn = 60 * 5 * 1000;

  const id = (JSON.parse(req.body).id || "").toString();

  // Cookieに保存するセッションIDを作成する
  const sessionCookie = await auth.createSessionCookie(id, { expiresIn });

  // Cookieのオプション
  const options = {
    maxAge: expiresIn,
    httpOnly: true,
    secure: true,
    path: "/",
  };

  // セッションIDをCookieに設定する
  setCookie({ res }, "__session", sessionCookie, options);

  res.status(200).end();
}
