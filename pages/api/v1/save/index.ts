// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from "next";
import { database } from "../../../../firebaseAdmin";

// type Request = {
//   userId: string;
//   mealSchedule: MealSchedule;
// };
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    // TODO: 番号確認
    res.status(405).end();
    return;
  }
  const { userId, mealSchedule } = JSON.parse(req.body);
  if (!userId || !mealSchedule) {
    // TODO: 番号確認
    res.status(403).end();
    return;
  }
  const ref = database.ref("users/" + userId);
  ref.set({
    mealSchedule,
  });
  res.status(200).end();
}
