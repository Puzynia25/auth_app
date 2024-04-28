const Router = require("express");
const router = new Router();
const userController = require("../controllers/userController");
const checkStatusMiddleWare = require("../middleware/checkStatusMiddleWare");

// router.use(checkStatusMiddleWare);
router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.post("/check", userController.check);
router.get("/table", userController.getAll);
router.delete("/delete", userController.deleteUser);
router.patch("/status", userController.updateUsersStatus);

module.exports = router;
