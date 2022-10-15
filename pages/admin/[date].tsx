import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Grid,
  GridItem,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import Morning from "../../icon/Morning";
import Night from "../../icon/Night";
import Noon from "../../icon/Noon";
import { nextDate, prevDate } from "../../util/dateUtil";
import { monitorUserScheduleDateState } from "../admin";
const DaySchedule = () => {
  const router = useRouter();
  const { date } = router.query;
  const [dateState, _] = useRecoilState(monitorUserScheduleDateState);
  if (typeof date !== "string") {
    return <div>None</div>;
  }
  return (
    <>
      <Header />
      <Box>
        <Center h={"2rem"}>
          <IconButton
            onClick={() => router.push(`/admin/${prevDate(date)}`)}
            disabled={!dateState[prevDate(date)]}
            aria-label="Search database"
            icon={<ChevronLeftIcon />}
            size="sm"
            bgColor={"white"}
          ></IconButton>
          {date}
          <IconButton
            onClick={() => router.push(`/admin/${nextDate(date)}`)}
            disabled={!dateState[nextDate(date)]}
            aria-label="Search database"
            icon={<ChevronRightIcon />}
            size="sm"
            bgColor={"white"}
          ></IconButton>
        </Center>
      </Box>
      <Center flexFlow={"column"}>
        {Object.keys(dateState[date]).map((userName) => {
          const dayMeal = dateState[date][userName];
          const iconColor = {
            morning: dayMeal.breakFast ? "#ED8936" : "#4B4B4B",
            noon: dayMeal.lunch ? "#FAF089" : "#4B4B4B",
            night: dayMeal.dinner ? "#00BFFF" : "#4B4B4B",
          };
          return (
            <Grid
              key={userName}
              h={"3rem"}
              templateColumns="repeat(4, 1fr)"
              gap={4}
              paddingTop={"1rem"}
              paddingLeft={"1rem"}
              width="100%"
            >
              <GridItem colSpan={1}>
                <Text> {userName}</Text>
              </GridItem>
              <GridItem display={"flex"} alignItems={"center"} colSpan={1}>
                <Morning color={iconColor.morning} size="24" />
              </GridItem>
              <GridItem display={"flex"} alignItems={"center"} colSpan={1}>
                <Noon color={iconColor.noon} size="24" />
              </GridItem>
              <GridItem display={"flex"} alignItems={"center"} colSpan={1}>
                <Night color={iconColor.night} size="24" />
              </GridItem>
            </Grid>
          );
        })}
      </Center>
    </>
  );
};

const Header = () => {
  const router = useRouter();
  return (
    <Grid
      bg="teal.300"
      h="5rem"
      templateColumns="repeat(3, 1fr)"
      borderRadius={"3px"}
      alignItems={"center"}
    >
      <GridItem colSpan={1}>
        <BackButton
          onClick={() => {
            router.push("/admin");
          }}
        />
      </GridItem>
      <GridItem colSpan={1} textAlign="center">
        <Text color="white" fontSize={"1.5rem"}>
          Admin
        </Text>
      </GridItem>
    </Grid>
  );
};

type BackButtonProps = {
  onClick: () => void;
};
const BackButton = (props: BackButtonProps) => {
  // UI改善
  return (
    <Button
      leftIcon={<ChevronLeftIcon />}
      onClick={props.onClick}
      aria-label="Search database"
      bgColor={"teal.300"}
      color={"white"}
    >
      Back
    </Button>
  );
};
export default DaySchedule;
