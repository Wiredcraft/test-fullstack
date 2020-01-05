import { Router } from "express";
import { register, login } from "../controllers/users";

const router = Router();

router.post("/", register);
router.post("/login", login);

export default router;
