import { Checkbox, Grid, GridItem, Stack, Text } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { DayMeal, MealSchedule } from "../pages";
import Morning from "../icon/Morning";
import Noon from "../icon/Noon";
import Night from "../icon/Night";
type DayCheckboxProps = {
  day: string;
  mealSchedule: MealSchedule;
  setMealSchedule: Dispatch<SetStateAction<MealSchedule>>;
};
type IconColor = {
  morning: string;
  noon: string;
  night: string;
};
const DayCheckbox = (props: DayCheckboxProps) => {
  const [iconColor, setIconColor] = useState<IconColor>({} as IconColor);
  const handleClick = (mealType: string) => {
    const newMealSchedule = JSON.parse(JSON.stringify(props.mealSchedule));
    newMealSchedule[props.day][mealType] =
      !newMealSchedule[props.day][mealType];
    props.setMealSchedule(newMealSchedule);
  };
  useEffect(() => {
    const dayMeal: DayMeal = props.mealSchedule[props.day];
    setIconColor({
      morning: dayMeal.breakFast ? "#ED8936" : "#4B4B4B",
      noon: dayMeal.lunch ? "#FAF089" : "#4B4B4B",
      night: dayMeal.dinner ? "#2C5282" : "#4B4B4B",
    });
  }, [props.mealSchedule, props.day]);

  return (
    <Grid
      h={"3rem"}
      templateColumns="repeat(5, 1fr)"
      gap={4}
      paddingTop={"1rem"}
      paddingLeft={"1rem"}
    >
      <GridItem colSpan={2}>
        <Text>{props.day}</Text>
      </GridItem>
      <GridItem display={"flex"} alignItems={"center"}>
        <button
          onClick={() => {
            handleClick("breakFast");
          }}
        >
          <Morning color={iconColor.morning} size="24" />
        </button>
      </GridItem>
      <GridItem display={"flex"} alignItems={"center"}>
        <button
          onClick={() => {
            handleClick("lunch");
          }}
        >
          <Noon color={iconColor.noon} size="24" />
        </button>
      </GridItem>
      <GridItem display={"flex"} alignItems={"center"}>
        <button
          onClick={() => {
            handleClick("dinner");
          }}
        >
          <Night color={iconColor.night} size="24" />
        </button>
      </GridItem>
    </Grid>
  );
};

export default DayCheckbox;
