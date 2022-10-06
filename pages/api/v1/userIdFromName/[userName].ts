// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userName } = req.query;
  // mock
  switch (userName) {
    case "yuta":
      res.status(200).json({ userId: "gaECP3LFM7cfCXNHK5k297kt1kD3" });
      break;
    case "miiro":
      res.status(200).json({ userId: "CRYl4m5uMQYqVFeMfs4jBW4fNxq1" });
      break;
    // case "manari":
    //   res.status(200).json({ userId: "gaECP3LFM7cfCXNHK5k297kt1kD3" });
    //   break;
  }
}
