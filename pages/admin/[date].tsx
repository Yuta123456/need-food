import { Box, Button, Text } from "@chakra-ui/react";
import { Router, useRouter } from "next/router";
const DaySchedule = () => {
  const router = useRouter();
  const { date } = router.query;
  return (
    <>
      <Header />
      <p>{date}</p>
    </>
  );
};

const Header = () => {
  const router = useRouter();
  return (
    <Box
      bg="teal.300"
      h="5rem"
      display={"flex"}
      justifyContent={"left"}
      borderRadius={"3px"}
      alignItems={"center"}
    >
      <BackButton onClick={router.back} />
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

type BackButtonProps = {
  onClick: () => void;
};
const BackButton = (props: BackButtonProps) => {
  // UI改善
  return <Button onClick={props.onClick}>{"<"}</Button>;
};
export default DaySchedule;
