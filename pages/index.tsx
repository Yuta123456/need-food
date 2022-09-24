import { useEffect, useState } from "react";
import Header from "../components/Header";
import MealCheckboxGroup from "../components/MealCheckboxGroup";
import Login from "./login";
import { atom, RecoilState, useRecoilState } from "recoil";
import { User } from "firebase/auth";
import isAdmin from "../util/isAdmin";
import { useRouter } from "next/router";
const fetcher = (url: string) =>
  fetch(url).then((res) => {
    return res.json();
  });

const Home = () => {
  // const { data, error } = useSWR("/api/hello", fetcher);
  const [mealSchedule, setMealSchedule] = useState<MealSchedule | null>(null);
  const [user, _] = useRecoilState(userState);
  const [isAdminUser, setIsAdminUser] = useState(false);
  const router = useRouter();
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

  useEffect(() => {
    if (!user) {
      return;
    }
    setIsAdminUser(isAdmin(user.uid));
  }, [user]);

  useEffect(() => {
    if (user === undefined) {
      router.push("/login");
    }
    if (isAdminUser) {
      router.push("/admin");
    }
  }, [user, router, isAdminUser]);
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
        <p>loading...</p>
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
