import { Center, Input, Button, Heading, Text } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/react";
import { useRef, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { userState } from "./index";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router.js";
import { auth } from "../FirebaseConfig";
const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [_, setIsLogin] = useRecoilState(userState);
  const router = useRouter();
  const handleSubmit = async () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    if (!email || !password) {
      return;
    }
    // TODO: ログインできなかった時、判断できない。
    if (isRegister) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((value) => {
          setIsLogin(value.user);
          router.push("/");
        })
        .catch((err) => {
          console.log("error", err);
        });
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((value) => {
          setIsLogin(value.user);
          router.push("/");
        })
        .catch((err) => {
          console.log("error", err);
        });
    }
  };
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  return (
    <Center bg="teal.300" width={"100vw"} height={"100vh"}>
      {/* <Text color="white">Login</Text> */}
      <Center bg="teal.300" flexFlow={"column"}>
        <Heading color="white">{isRegister ? "Register" : "Login"}</Heading>
        <FormControl>
          <FormLabel color="white">Email address</FormLabel>
          <Input
            type="email"
            placeholder="example@hoge.com"
            isRequired
            id="email"
            ref={emailRef}
            color="White"
          />
          <FormLabel color="white">Password</FormLabel>
          <Input
            type="password"
            id="password"
            isRequired
            ref={passwordRef}
            color="White"
          />
          <Button mt={4} onClick={handleSubmit}>
            Login
          </Button>
          <Text color="white" mt="4">
            <button
              onClick={() => {
                setIsRegister(!isRegister);
              }}
            >
              {isRegister
                ? "or you already registered ?"
                : "Not yet registered ?"}
            </button>
          </Text>
        </FormControl>
      </Center>
    </Center>
  );
};

export default Login;
