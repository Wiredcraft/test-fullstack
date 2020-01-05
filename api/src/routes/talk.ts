import { Router } from "express";
import { getAll, post, patch } from "../controllers/talks";

const router = Router();

router.get("/", getAll);
router.post("/", post);
router.patch("/:id", patch);

export default router;
