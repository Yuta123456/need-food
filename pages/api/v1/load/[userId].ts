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
    const data = snapshot.val().mealSchedule;
    res.status(200).json({
      mealSchedule: transferValidData(data),
    });
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

const isValidData = (data: MealSchedule) => {
  return [...Array(7)]
    .map((_, index) => {
      const today = new Date();
      today.setDate(today.getDate() + index);
      return today;
    })
    .map((day) => formatDate(day, "yyyy-MM-dd"))
    .map((date) => {
      return data[date];
    })
    .some((v) => !!v);
};

const transferValidData = (data: MealSchedule) => {
  const newData: MealSchedule = {};
  [...Array(7)]
    .map((_, index) => {
      const today = new Date();
      today.setDate(today.getDate() + index);
      return today;
    })
    .map((day) => formatDate(day, "yyyy-MM-dd"))
    .forEach((date) => {
      if (!data[date]) {
        newData[date] = {
          breakFast: true,
          lunch: true,
          dinner: true,
        };
      } else {
        newData[date] = data[date];
      }
    });
  return newData;
};
