// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { MealSchedule } from "../../../index";
import dummyData from "../../../../data/dummyData";
type Response = {
  mealSchedule: MealSchedule;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  res.status(200).json({ mealSchedule: dummyData });
}
