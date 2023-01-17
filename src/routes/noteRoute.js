import { Router } from "express";
import noteController from '../controllers/noteController.js';

const router = Router();

router.post("/", noteController.create);
router.get("/", noteController.getAll);
router.get("/:userId", noteController.getByUserId);

export default router;