import useSWR from "swr";
import styles from "../styles/Home.module.css";

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    console.log(res);
    return res.json();
  });
const Home = () => {
  const { data, error } = useSWR("/api/hello", fetcher);
  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;
  return <div className={styles.container}>{data.name}</div>;
};

export default Home;
