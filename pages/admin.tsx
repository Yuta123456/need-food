import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import { DayMeal, MealSchedule } from ".";
import Morning from "../icon/Morning";
import Noon from "../icon/Noon";
import Night from "../icon/Night";
import { useEffect, useState } from "react";
import Link from "next/link";
import { atom, useRecoilState } from "recoil";
import { dayCount } from "../util/schedule";
const Admin = () => {
  const [monitorUserDict, setMonitorUserDict] = useRecoilState(
    monitorUserScheduleState
  );
  useEffect(() => {
    // const monitorUserList = ["yuta", "miiro", "manari"];
    const monitorUserList = ["yuta", "miiro"];
    const newMonitorUserDict: { [userName: string]: MealSchedule } = {};
    Promise.all(
      monitorUserList.map((userName) =>
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
          })
      )
    ).then(() => {
      setMonitorUserDict(newMonitorUserDict);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <AdminHeader />
      {monitorUserDict ? <FamilyStats /> : <div>loading</div>}
    </>
  );
};

export const AdminHeader = () => {
  // TODO: UI改善
  return (
    <Box
      bg="teal.300"
      h="5rem"
      display={"flex"}
      justifyContent={"left"}
      borderRadius={"3px"}
    >
      <Text
        color="white"
        display={"flex"}
        alignItems={"center"}
        paddingLeft={"1rem"}
        fontSize={"1.5rem"}
      >
        Admin
      </Text>
    </Box>
  );
};

type FamilyStatsProps = {};
type DayMealCount = {
  breakFast: number;
  lunch: number;
  dinner: number;
};
const FamilyStats = () => {
  const dayDict: { [date: string]: DayMealCount } = {};
  const [dateState, setDateState] = useRecoilState(
    monitorUserScheduleDateState
  );
  const [monitorUserDict, setMonitorUserDict] = useRecoilState(
    monitorUserScheduleState
  );
  Object.keys(monitorUserDict).forEach((userName) => {
    const schedule = monitorUserDict[userName];
    Object.keys(schedule).forEach((date) => {
      if (!(date in dayDict)) {
        dayDict[date] = {
          breakFast: 0,
          lunch: 0,
          dinner: 0,
        };
      }
      const dayMeal = schedule[date];
      dayDict[date] = {
        breakFast: dayDict[date].breakFast + Number(dayMeal.breakFast),
        lunch: dayDict[date].lunch + Number(dayMeal.lunch),
        dinner: dayDict[date].dinner + Number(dayMeal.dinner),
      };
    });
  });

  useEffect(() => {
    setDateState(dayCount(monitorUserDict));
  }, [monitorUserDict, setDateState]);
  return (
    <>
      {Object.keys(dayDict).map((date) => {
        return (
          <UserStats key={date} dayMealCount={dayDict[date]} date={date} />
        );
      })}
    </>
  );
};
type UserStatsProps = {
  dayMealCount: DayMealCount;
  date: string;
};
const UserStats = (props: UserStatsProps) => {
  const iconColor = {
    morning: "#ED8936",
    noon: "#FAF089",
    night: "#2C5282",
  };
  return (
    <Link href={`/admin/${props.date}`}>
      <Grid
        h={"3rem"}
        templateColumns="repeat(5, 1fr)"
        gap={4}
        paddingTop="1rem"
        paddingLeft="1rem"
      >
        <GridItem colSpan={2}>
          <Text>{props.date}</Text>
        </GridItem>
        <GridItem display="flex" alignItems="center">
          <Morning color={iconColor.morning} size="24" />
          <Text pl="1rem">{props.dayMealCount.breakFast}</Text>
        </GridItem>
        <GridItem display="flex" alignItems="center">
          <Noon color={iconColor.noon} size="24" />
          <Text pl="1rem">{props.dayMealCount.lunch}</Text>
        </GridItem>
        <GridItem display="flex" alignItems="center">
          <Night color={iconColor.night} size="24" />
          <Text pl="1rem">{props.dayMealCount.lunch}</Text>
        </GridItem>
      </Grid>
    </Link>
  );
};

export const monitorUserScheduleState = atom<{
  [userName: string]: MealSchedule;
}>({
  key: "monitorUserScheduleState",
  default: {},
});

export const monitorUserScheduleDateState = atom<{
  [date: string]: { [userName: string]: DayMeal };
}>({
  key: "monitorUserScheduleDateState",
  default: {},
});
export default Admin;
