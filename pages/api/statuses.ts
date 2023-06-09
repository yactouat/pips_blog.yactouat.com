// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type APIResponseType = {
  msg: string;
  data: {}[] | {} | null;
};


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIResponseType>
) {
  res
    .status(200)
    .json({ msg: "blog.yactouat.com is up and running", data: null });
}
