// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { MealSchedule } from "../../../index";
import { getDatabase } from "firebase/database";
import { formatDate } from "../../../../components/MealCheckboxGroup";
import { database } from "../../firebase";
type Response = {
  mealSchedule: MealSchedule;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const { userId } = req.query;
  const starCountRef = database.ref("users/" + userId);
  starCountRef.once("value", (snapshot) => {
    res.status(200).json({
      mealSchedule: defaultMealSchedule(),
    });
    // if (!snapshot.val()) {
    //   // データが無い場合は、デフォルトを返してあげる。
    //   // TODO: 一週間分のデータがあるかどうか確認
    //   res.status(200).json({
    //     mealSchedule: defaultMealSchedule(),
    //   });
    // } else {
    //   res.status(200).json(snapshot.val());
    // }
  });
}

const defaultMealSchedule = () => {
  const mealSchedule: MealSchedule = {};
  [...Array(7)]
    .map((_, index) => {
      const today = new Date();
      today.setDate(today.getDate() + index);
      return today;
    })
    .map((day) => formatDate(day, "yyyy-MM-dd"))
    .forEach((day) => {
      mealSchedule[day] = {
        breakFast: true,
        lunch: true,
        dinner: true,
      };
    });
  return mealSchedule;
};
