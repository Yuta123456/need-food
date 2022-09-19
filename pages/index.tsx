import { useEffect, useState } from "react";
import Header from "../components/Header";
import MealCheckboxGroup from "../components/MealCheckboxGroup";
import dummyData from "../data/dummyData";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../FirebaseConfig";
import { User } from "firebase/auth";
import Login from "./login";
import { atom, useRecoilState } from "recoil";
const fetcher = (url: string) =>
  fetch(url).then((res) => {
    return res.json();
  });

const Home = () => {
  // const { data, error } = useSWR("/api/hello", fetcher);
  const [mealSchedule, setMealSchedule] = useState<MealSchedule>(dummyData);
  const [isLogin, _] = useRecoilState(loginState);
  return (
    <>
      {isLogin ? (
        <>
          <Header mealSchedule={mealSchedule} />
          <MealCheckboxGroup
            mealSchedule={mealSchedule}
            setMealSchedule={setMealSchedule}
          />
        </>
      ) : (
        <Login />
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
