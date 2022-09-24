import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import { MealSchedule } from ".";
import Morning from "../icon/Morning";
import Noon from "../icon/Noon";
import Night from "../icon/Night";
import { useEffect, useState } from "react";
import Link from "next/link";
const Admin = () => {
  const monitorUserList = ["yuta", "miiro", "manari"];
  const [monitorUserDict, setMonitorUserDict] = useState<{
    [userName: string]: MealSchedule;
  }>({});
  useEffect(() => {
    monitorUserList.forEach((userName) => {
      fetch(`api/v1/userIdFromName/${userName}`)
        .then((res) => res.json())
        .then((res) => res.userId)
        .then((userId) => {
          return fetch(`api/v1/load/${userId}`);
        })
        .then((res) => res.json())
        .then((res) => res.mealSchedule)
        .then((res) => {
          const newMonitorUserDict = JSON.parse(
            JSON.stringify(monitorUserDict)
          );
          monitorUserDict[userName] = res;
          setMonitorUserDict(newMonitorUserDict);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }, []);

  return (
    <>
      <AdminHeader />
      <FamilyStats monitorUserDict={monitorUserDict} />
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

type FamilyStatsProps = {
  monitorUserDict: { [userName: string]: MealSchedule };
};
type DayMealCount = {
  breakFast: number;
  lunch: number;
  dinner: number;
};
const FamilyStats = (props: FamilyStatsProps) => {
  const dayDict: { [date: string]: DayMealCount } = {};
  Object.keys(props.monitorUserDict).forEach((userName) => {
    const schedule = props.monitorUserDict[userName];
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
export default Admin;
