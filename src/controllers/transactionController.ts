import { NextFunction, Request, Response } from "express";
import { getChilds, getParents } from "../utils/dataReader";

/**
 * Controller to handle transactions related requests
 *
 * @param req
 * @param res
 * @param next
 */
export const getParentTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const page = req.query.page;
  const limit = req.query.limit;
  // @ts-ignore
  const start = page * limit;
  // @ts-ignore
  const end = Number(start) + Number(limit);
  const parents = getParents();
  let data = parents.slice(start, end);
  data = data.map(parent => {
    const childs = getChilds(parent.id);
    let paidAmount = 0;
    childs.map(child => {
      paidAmount += child.paidAmount;
    });
    return { ...parent, paidAmount };
  });

  return res.json({ data, totalRecords: parents.length });
};

export const getChildTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const parentId = parseInt(req.params.parentId, 10);
  const childs = getChilds(parentId);
  return res.json(childs);
};
