import expressPromiseRouter from "express-promise-router";
import * as TransactionController from "./controllers/transactionController";

export const router = expressPromiseRouter();

// Parents
router.route("/parents").get(TransactionController.getParentTransaction);

// Childs
router
  .route("/childs/:parentId")
  .get(TransactionController.getChildTransaction);
