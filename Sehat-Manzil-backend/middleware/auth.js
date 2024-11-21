import Section from '../models/Section.js';  // Assuming student enrollment is tracked in Section
import Grade from "../models/Grade.js";
import Course from "../models/Course.js"


export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.session.userId || !roles.includes(req.session.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
};

export const isStudentEnrolledInCourse = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const studentId = req.session.userId;

    const section = await Section.findOne({ course: courseId, students: studentId });

    if (!section) {
      return res.status(403).json({ message: 'You are not enrolled in this course' });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const isTeacherAssignedToCourse = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const teacherId = req.session.userId;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (!course.teachers.includes(teacherId)) {
      return res.status(403).json({ message: 'You are not assigned to this course' });
    }

    next();

  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
