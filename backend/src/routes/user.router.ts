import express from "express";
import {
  login,
  logout,
  signup,
  getRecentSearches,
  addRecentSearch,
  getSavedPassengers,
  addSavedPassenger,
  getCurrentUser,
  updateProfileImage
} from "../controllers/user.controller";
import { upload } from "../middlewares/multer.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/signup", upload.single("profileImg"), signup);
router.post("/login", upload.none(), login);
router.post("/logout", authMiddleware, logout);

router.get("/recent-searches", authMiddleware, getRecentSearches);
router.post("/recent-searches", upload.none(), authMiddleware, addRecentSearch);

router.get("/saved-passengers", authMiddleware, getSavedPassengers);
router.post("/saved-passengers", upload.none(), authMiddleware, addSavedPassenger);

router.get("/current-user", authMiddleware, getCurrentUser);
router.patch("/profile-image", authMiddleware, upload.single("profileImg"), updateProfileImage);

export default router;
