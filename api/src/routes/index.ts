import { Router } from "express";
import users from "./user";
import talks from "./talk";

const router = Router();

router.use("/talks", talks);
router.use("/users", users);

export default router;
