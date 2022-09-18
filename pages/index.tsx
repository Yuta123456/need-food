import { useState } from "react";
import Header from "../components/Header";
import MealCheckboxGroup from "../components/MealCheckboxGroup";
import dummyData from "../data/dummyData";
const fetcher = (url: string) =>
  fetch(url).then((res) => {
    return res.json();
  });

const Home = () => {
  // const { data, error } = useSWR("/api/hello", fetcher);
  const [mealSchedule, setMealSchedule] = useState<MealSchedule>(dummyData);
  return (
    <>
      <Header mealSchedule={mealSchedule} />
      <MealCheckboxGroup
        mealSchedule={mealSchedule}
        setMealSchedule={setMealSchedule}
      />
    </>
  );
};

export type MealSchedule = {
  [date: string]: DayMeal;
};
export type DayMeal = {
  breakFast: boolean;
  lunch: boolean;
  dinner: boolean;
};
export default Home;
