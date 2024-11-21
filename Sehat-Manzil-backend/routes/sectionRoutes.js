import express from 'express';
import {
  registerForSection,
  getRegisteredSections,
  getAssignedSections,
} from '../controllers/sectionController.js';
import { authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

router.post('/:sectionId/register', authorizeRoles('student'), registerForSection); // Students register for a section
router.get('/registered', authorizeRoles('student'), getRegisteredSections); // Get registered sections for a student
router.get('/assigned', authorizeRoles('teacher'), getAssignedSections); // Get assigned sections for a teacher

export default router;
