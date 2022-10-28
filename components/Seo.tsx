import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
type SeoProps = {
  host: string;
};
const Seo = ({ host }: SeoProps) => {
  const defaultTitle = "";
  const defaultDescription = "";
  const title = "need food" || defaultTitle;
  const description =
    "家族のための食事スケジュール管理アプリです" || defaultDescription;
  const url = host || "";
  const imgUrl = "https://" + host + "/needFoodOgp.png";

  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      <meta name="description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={imgUrl} />
      <meta property="og:image:width" content={String(1200)} />
      <meta property="og:image:height" content={String(630)} />
      <link rel="canonical" href={url} />
    </Head>
  );
};
export default Seo;
