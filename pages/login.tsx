import {
  Center,
  Input,
  Button,
  Heading,
  Text,
  useToast,
} from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";
import { userState } from "./index";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router.js";
import { auth as adminAuth } from "../firebaseAdmin";
import { auth } from "../FirebaseConfig";
import nookies, { parseCookies } from "nookies";
import { GetServerSideProps } from "next";

const createSession = (id: string) => {
  fetch("/api/v1/login/createSession", {
    method: "POST",
    body: JSON.stringify({ id }),
  }).catch((err) => {
    console.log(err);
  });
};
const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [user, setIsLogin] = useRecoilState(userState);
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  const handleSubmit = async () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    if (!email || !password) {
      return;
    }
    console.log("handle click");
    if (isRegister) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((value) => {
          setIsLogin({ uid: value.user.uid });
          value.user.getIdToken().then((id) => createSession(id));
          router.push("/");
        })
        .catch((err) => {
          toast({
            title: "ログインに失敗しました",
            status: "error",
            duration: 2000,
          });
        });
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((value) => {
          setIsLogin({ uid: value.user.uid });
          value.user.getIdToken().then((id) => createSession(id));
          router.push("/");
        })
        .catch((err) => {
          toast({
            title: "ログインに失敗しました",
            status: "error",
            duration: 2000,
          });
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
