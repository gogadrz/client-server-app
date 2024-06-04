import { Router } from "express";
import pravaDostupaController from "../controllers/pravaDostupaController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.post("/register", pravaDostupaController.register);
router.post("/login", pravaDostupaController.login);
router.get("/check", authMiddleware, pravaDostupaController.check);

export default router;
