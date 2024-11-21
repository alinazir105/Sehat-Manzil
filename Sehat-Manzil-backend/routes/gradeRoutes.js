import express from 'express';
import {
  createOrUpdateGrades,
  lockGrades,
  getStudentGrades,
  getAllSectionGrades,
  deleteGrades,
  getStudentOwnGrades
} from '../controllers/gradeController.js';

import {
  isTeacherAssignedToCourse,
  authorizeRoles,
  isStudentEnrolledInCourse
} from "../middleware/auth.js"

const router = express.Router();

router.post('/grades/:courseId',authorizeRoles("teacher"), isTeacherAssignedToCourse, createOrUpdateGrades);
router.put('/grades/lock/:gradeId/:courseId', authorizeRoles("teacher"), isTeacherAssignedToCourse, lockGrades);
router.get('/grades/student/:studentId/:courseId',authorizeRoles("teacher"), isTeacherAssignedToCourse, getStudentGrades);
router.get('/grades/section/:courseId',authorizeRoles("teacher"), isTeacherAssignedToCourse, getAllSectionGrades);
router.delete('/grades/:gradeId/:courseId',authorizeRoles("teacher"), isTeacherAssignedToCourse, deleteGrades);

// for student
router.get('/grades/student/:courseId', authorizeRoles("student"), isStudentEnrolledInCourse, getStudentOwnGrades);

export default router;
