import express from 'express';
import { 
  register,
  login,
  logout,
  approveUser,
  getAllUsers
} from '../controllers/authController.js';

import {
  authorizeRoles
} from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);


router.patch('/approve/:userId', authorizeRoles("admin"), approveUser)
router.get('/getUsers', authorizeRoles("admin"), getAllUsers)

export default router;
