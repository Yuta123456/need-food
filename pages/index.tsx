import { useEffect, useState } from "react";
import Header from "../components/Header";
import MealCheckboxGroup from "../components/MealCheckboxGroup";
import { atom, useRecoilState } from "recoil";
import { User } from "../models/user";
import isAdmin from "../util/isAdmin";
import { useRouter } from "next/router";
import { auth as adminAuth } from "../firebaseAdmin";
import nookies from "nookies";
import { GetServerSideProps, NextPage } from "next";
import Seo from "../components/Seo";

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    return res.json();
  });

const Home: NextPage<{ uid: string; host: string }> = ({ uid, host }) => {
  const [mealSchedule, setMealSchedule] = useState<MealSchedule | null>(null);
  const [user, setUser] = useRecoilState(userState);
  const [isAdminUser, setIsAdminUser] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setUser({ uid });
  }, [uid]);

  useEffect(() => {
    if (!user) {
      return;
    }
    fetch(`/api/v1/load/${user.uid}`, {
      method: "GET",
    })
      .then(async (res) => {
        const mealJson = await res.json();
        setMealSchedule(mealJson.mealSchedule);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user]);

  useEffect(() => {
    if (!user) {
      return;
    }
    setIsAdminUser(isAdmin(user.uid));
  }, [user]);

  useEffect(() => {
    if (isAdminUser) {
      router.push("/admin");
    }
  }, [isAdminUser]);
  return (
    <>
      {mealSchedule !== null ? (
        <>
          <Header mealSchedule={mealSchedule} />
          <Seo host={host} />
          <MealCheckboxGroup
            mealSchedule={mealSchedule}
            setMealSchedule={setMealSchedule}
          />
        </>
      ) : (
        <p>loading...</p>
      )}
    </>
  );
};

export type MealSchedule = {
  [date: string]: DayMeal;
};
export type DayMeal = {
  breakFast: boolean;
  lunch: boolean;
  dinner: boolean;
};
export const userState = atom<User>({
  key: "userState", // unique ID (with respect to other atoms/selectors)
  default: undefined, // default value (aka initial value)
});

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx);
  const session = cookies.__session || "";

  // セッションIDを検証して、認証情報を取得する
  const user = await adminAuth
    .verifySessionCookie(session, true)
    .catch(() => null);

  // 認証情報が無い場合は、ログイン画面へ遷移させる
  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {
      uid: user.uid,
      host: ctx.req.headers.host || null,
    },
  };
};
export default Home;
