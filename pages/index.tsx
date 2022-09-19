import { useEffect, useState } from "react";
import Header from "../components/Header";
import MealCheckboxGroup from "../components/MealCheckboxGroup";
import Login from "./login";
import { atom, useRecoilState } from "recoil";
const fetcher = (url: string) =>
  fetch(url).then((res) => {
    return res.json();
  });

const Home = () => {
  // const { data, error } = useSWR("/api/hello", fetcher);
  const [mealSchedule, setMealSchedule] = useState<MealSchedule | null>(null);
  const [isLogin, _] = useRecoilState(loginState);
  useEffect(() => {
    fetch("/api/v1/load").then(async (res) => {
      const mealJson = await res.json();
      setMealSchedule(mealJson.mealSchedule);
    });
  }, []);
  if (!isLogin) {
    return <Login />;
  }
  return (
    <>
      {mealSchedule !== null ? (
        <>
          <Header mealSchedule={mealSchedule} />
          <MealCheckboxGroup
            mealSchedule={mealSchedule}
            setMealSchedule={setMealSchedule}
          />
        </>
      ) : (
        <p>loading</p>
      )}
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
export const loginState = atom({
  key: "loginState", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});
export default Home;
