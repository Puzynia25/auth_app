const Router = require("express");
const router = new Router();
const userController = require("../controllers/userController");

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.post("/check", userController.check);
router.get("/table", userController.getAll);
router.delete("/table", userController.deleteUser);

module.exports = router;
