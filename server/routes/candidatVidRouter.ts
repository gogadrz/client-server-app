import { Router } from "express";
import candidatVidController from "../controllers/candidatVidController";

const router = Router();

router.get("/getUsers", candidatVidController.getUsers);
router.get("/detUserById/:id", candidatVidController.getUserById);
router.post("/add", candidatVidController.addUser);
router.put("/edit/:id", candidatVidController.editUser);
router.delete("/delete/:id", candidatVidController.deleteUser);

export default router;
