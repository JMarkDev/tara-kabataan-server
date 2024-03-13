const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const {
  registerValidationRules,
  updateUsernameValidationRules,
  validateForm,
} = require("../middlewares/formValidation");
const multer = require("multer");
const upload = multer({ dest: "./uploads" });

router.get("/all", userController.getAllUsers);
router.get("/role/:role", userController.getUserByRole);
router.get("/id/:id", userController.getUserById);
router.get("/search/:name/:role", userController.searchUsers);
router.get("/filter/:gender/:role", userController.filterByGender);

router.put(
  "/update-profile/:id",
  upload.single("image"),
  userController.updateProfileImg
);
router.put(
  "/update/:id",
  registerValidationRules(),
  validateForm,
  userController.updateAdmin
);
router.post(
  "/update/username/:id",
  updateUsernameValidationRules(),
  validateForm,
  userController.updateUsername
);
router.put("/update-user-profile/:id", userController.updateAllUserData);

router.put("/update/username/verify-otp/:id", userController.verifyOTP);

router.delete("/delete/:id", userController.deleteUser);

module.exports = router;
