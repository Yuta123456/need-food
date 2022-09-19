import { useEffect, useState } from "react";
import Header from "../components/Header";
import MealCheckboxGroup from "../components/MealCheckboxGroup";
import Login from "./login";
import { atom, RecoilState, useRecoilState } from "recoil";
import { User } from "firebase/auth";
const fetcher = (url: string) =>
  fetch(url).then((res) => {
    return res.json();
  });

const Home = () => {
  // const { data, error } = useSWR("/api/hello", fetcher);
  const [mealSchedule, setMealSchedule] = useState<MealSchedule | null>(null);
  const [user, _] = useRecoilState(userState);
  useEffect(() => {
    if (!user) {
      return;
    }
    fetch(`/api/v1/load/${user.uid}`, {
      method: "GET",
    })
      .then(async (res) => {
        const mealJson = await res.json();
        setMealSchedule(mealJson.mealSchedule);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user]);

  if (!user) {
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
export const userState = atom<User>({
  key: "userState", // unique ID (with respect to other atoms/selectors)
  default: undefined, // default value (aka initial value)
});
export default Home;
