import { Box, Button, Center, IconButton, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { modeContext } from "../context/mode";
import { EditIcon, CheckIcon } from "@chakra-ui/icons";
import { MealSchedule } from "../pages";
type HeaderProps = {
  mealSchedule: MealSchedule;
};
const Header = (props: HeaderProps) => {
  const ctx = useContext(modeContext);
  const changeMode = () => {
    if (ctx.isView) {
      ctx.setIsView(false);
    } else {
      // ここに保存処理
      console.log(props.mealSchedule);
      ctx.setIsView(true);
    }
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
        onClick={changeMode}
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
const child = () => {
  return <Text color="white">編集する</Text>;
};
export default Header;
