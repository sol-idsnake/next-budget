import { Role } from "@prisma/client";
import { isEmpty } from "lodash";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id as keyof typeof Role;

  const admin = await prisma.user.findFirst({
    where: {
      role: id,
    },
  });

  if (!isEmpty(admin)) {
    res.status(200).json(admin);
  } else {
    res.send(null);
  }
};

export default handler;
