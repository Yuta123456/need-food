import { atom, useRecoilState } from "recoil";
import { DayMeal, MealSchedule } from "../pages";

export const dayCount = (monitorUserScheduleState: {
  [userName: string]: MealSchedule;
}) => {
  const dict: { [date: string]: { [userName: string]: DayMeal } } = {};
  Object.keys(monitorUserScheduleState).forEach((userName) => {
    const mealSchedule = monitorUserScheduleState[userName];
    Object.keys(mealSchedule).forEach((date) => {
      if (!(date in dict)) {
        dict[date] = {};
      }
      dict[date][userName] = monitorUserScheduleState[userName][date];
      // console.log(dict);
    });
  });

  return dict;
};

export const fetchUserData = () => {
  const monitorUserList = ["yuta", "miiro", "manari"];
  const newMonitorUserDict: { [userName: string]: MealSchedule } = {};
  Promise.all(
    monitorUserList.map((userName) => {
      fetch(`api/v1/userIdFromName/${userName}`)
        .then((res) => res.json())
        .then((res) => res.userId)
        .then((userId) => {
          return fetch(`api/v1/load/${userId}`);
        })
        .then((res) => res.json())
        .then((res) => res.mealSchedule)
        .then((res) => {
          newMonitorUserDict[userName] = res;
        })
        .catch((err) => {
          console.log(err);
        });
    })
  );
};
