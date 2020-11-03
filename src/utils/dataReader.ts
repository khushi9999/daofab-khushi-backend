import fs from "fs";

/**
 * Return all child (Paid) Transactions of the given parent transaction.
 *
 * @param parentId
 */
export const getChilds = parentId => {
  const rawChildData = fs.readFileSync("src/data/Child.json");
  // @ts-ignore
  const CHILDS = JSON.parse(rawChildData);
  if (CHILDS && CHILDS.data) {
    return CHILDS.data.filter(data => {
      return data.parentId === parentId;
    });
  }
  return [];
};

/**
 * Return all parent transactions.
 */
export const getParents = () => {
  const rawParentData = fs.readFileSync("src/data/Parent.json");
  // @ts-ignore
  const PARENTS = JSON.parse(rawParentData);

  if (PARENTS && PARENTS.data) {
    return PARENTS.data.sort((a, b) => {
      return a.parentId - b.parentId;
    });
  }
  return [];
};
