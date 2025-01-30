import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router();

router.get('/', userController.getAllUsers);
router.get('/', userController.getUserById);

router.post('/', userController.createUser);
router.post('/id', userController.updateUser);
router.post('/:id', userController.deleteUser);

export default router;