import { Box, Text, useToast } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { MealSchedule } from "../pages";
type HeaderProps = {
  mealSchedule: MealSchedule;
};
const Header = (props: HeaderProps) => {
  const toast = useToast();
  const handleClick = () => {
    console.log(props.mealSchedule);
    setTimeout(() => {
      toast({
        title: "保存しました",
        status: "success",
        duration: 2000,
      });
    }, 2000);
  };
  const IconStyle = {
    color: "white",
    w: "16",
    h: "16",
  };
  return (
    <Box
      bg="teal.300"
      h="5rem"
      display={"flex"}
      justifyContent={"right"}
      borderRadius={"3px"}
    >
      <button
        onClick={handleClick}
        style={{ display: "flex", alignItems: "center", paddingRight: "1rem" }}
      >
        <CheckIcon style={IconStyle} />
        <Text color="white" fontWeight={"300"} paddingLeft={"0.5rem"}>
          保存する
        </Text>
      </button>
    </Box>
  );
};
export default Header;
