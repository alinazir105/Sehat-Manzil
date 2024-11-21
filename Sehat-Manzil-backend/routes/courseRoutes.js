import express from 'express';
import {
  createCourse,
  assignTeacherToCourse,
  openRegistration,
  getAvailableCourses,
} from '../controllers/courseController.js';
import { authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authorizeRoles('admin'), createCourse);
router.post('/:courseId/assign-teacher', authorizeRoles('admin'), assignTeacherToCourse); // Admin can assign a teacher
router.patch('/:courseId/open-registration', authorizeRoles('admin'), openRegistration); // Admin can open registration
router.get('/getAvailable', getAvailableCourses); // Get available courses for students

export default router;
