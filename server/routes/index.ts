import { Router } from "express";
import candidatVidRouter from "./candidatVidRouter";
import pravaDostupaRouter from "./pravaDostupaRouter";

const router = Router();

router.use("/candidatVid", candidatVidRouter);
router.use("/pravaDostupa", pravaDostupaRouter);

export default router;
