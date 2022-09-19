import { Box, Text, useToast } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { userState, MealSchedule } from "../pages";
import { useRecoilState } from "recoil";
type HeaderProps = {
  mealSchedule: MealSchedule;
};
const Header = (props: HeaderProps) => {
  const toast = useToast();
  const [user, _] = useRecoilState(userState);
  const handleClick = () => {
    fetch("/api/v1/save", {
      method: "POST",
      // TODO: ID設定
      body: JSON.stringify({
        mealSchedule: props.mealSchedule,
        userId: user.uid,
      }),
    })
      .then(() => {
        toast({
          title: "保存しました",
          status: "success",
          duration: 2000,
        });
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "保存に失敗しました",
          status: "error",
          duration: 2000,
        });
      });
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
