import { Box, Button, Center, Grid, GridItem, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { nextDate, prevDate } from "../../util/dateUtil";
const DaySchedule = () => {
  const router = useRouter();
  const { date } = router.query;
  useEffect(() => {
    console.log("on mound");
  }, [date]);
  if (typeof date !== "string") {
    return <>None</>;
  }
  return (
    <>
      <Header />
      <Box>
        <Center h={"2rem"}>
          <Button
            onClick={() => router.push(`/admin/${prevDate(date)}`)}
          ></Button>

          {date}
          <Button
            onClick={() => router.push(`/admin/${nextDate(date)}`)}
          ></Button>
        </Center>
      </Box>
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
      <GridItem colSpan={1}>
        <Text color="white" paddingLeft={"1rem"} fontSize={"1.5rem"}>
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
  return <Button onClick={props.onClick}>{"<"}</Button>;
};
export default DaySchedule;
