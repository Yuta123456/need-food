// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  signInWithCustomToken,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";
import type { NextApiRequest, NextApiResponse } from "next";
import firebase from "firebase-admin";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";

type Response = {
  user: DecodedIdToken;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const session = JSON.parse(req.body).session;
  if (session) {
    const user = await firebase
      .auth()
      .verifySessionCookie(session, true)
      .catch(() => null);
    if (user) {
      res.status(200).json({
        user,
      });
    }
  }
}
