import { Checkbox, CheckboxGroup } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { MealSchedule } from "../pages";
import DayCheckbox from "./DayCheckbox";

type MealCheckboxProps = {
  mealSchedule: MealSchedule;
  setMealSchedule: Dispatch<SetStateAction<MealSchedule>>;
};
const MealCheckboxGroup = (props: MealCheckboxProps) => {
  const week = [...Array(7)]
    .map((_, index) => {
      const today = new Date();
      today.setDate(today.getDate() + index);
      return today;
    })
    .map((day) => formatDate(day, "MM/dd"));
  return (
    <div>
      {week.map((day) => {
        return <DayCheckbox key={day} day={day} {...props} />;
      })}
    </div>
  );
};
export const formatDate = (date: Date, format: string) => {
  format = format.replace(/yyyy/g, date.getFullYear().toString());
  format = format.replace(/MM/g, ("0" + (date.getMonth() + 1)).slice(-2));
  format = format.replace(/dd/g, ("0" + date.getDate()).slice(-2));
  format = format.replace(/HH/g, ("0" + date.getHours()).slice(-2));
  format = format.replace(/mm/g, ("0" + date.getMinutes()).slice(-2));
  format = format.replace(/ss/g, ("0" + date.getSeconds()).slice(-2));
  format = format.replace(/SSS/g, ("00" + date.getMilliseconds()).slice(-3));
  return format;
};
export default MealCheckboxGroup;
