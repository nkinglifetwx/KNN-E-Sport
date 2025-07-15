import { Router } from "express";
import { validateRegisterSchema } from "@/features/auth/validations/registerSchema";
import { validateRequest } from "@/shared/middlewares/validateRequest";
import { validateLoginSchema } from "@/features/auth/validations/loginSchema";
import { validateRefreshSchema } from "@/features/auth/validations/refreshSchema";
import { verifyAccessToken, verifyRefreshToken } from "@/features/auth/middlewares/verifyToken";
import { loginController} from "@/features/auth/controllers/loginController";
import { registerController } from "@/features/auth/controllers/registerController";
import { refreshController } from "@/features/auth/controllers/refreshController";
import { validateMeSchema } from "../validations/validateMeSchema";
import { meController } from "../controllers/meController";

const router = Router();

router.get("/me", validateMeSchema, validateRequest, verifyAccessToken, meController);
router.post("/register", validateRegisterSchema, validateRequest, registerController);
router.post("/login", validateLoginSchema, validateRequest, loginController);
router.post("/refresh", validateRefreshSchema, validateRequest, verifyRefreshToken, refreshController);

export default router;
