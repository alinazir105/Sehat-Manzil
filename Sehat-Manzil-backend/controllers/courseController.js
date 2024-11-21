import Course from '../models/Course.js';
import Section from '../models/Section.js';
import { z } from 'zod';

const courseSchema = z.object({
  courseName: z.string().nonempty('Course name is required'),
  courseCode: z.string().nonempty('Course code is required'),
  creditHours: z.number().positive('Credit hours must be a positive number'),
  feesPerCreditHour: z.number().nonnegative('Fees per credit hour must be non-negative'),
});

const assignTeacherSchema = z.object({
  teacherId: z.string().length(24, 'Invalid teacher ID'),
});

const openRegistrationSchema = z.object({
  registrationOpen: z.boolean(),
});

export const createCourse = async (req, res) => {
  try {
    const parsedData = courseSchema.parse(req.body);
    const course = new Course(parsedData);
    await course.save();
    res.status(201).json({ message: 'Course created successfully', course });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ message: 'Server error', error });
  }
};

export const assignTeacherToCourse = async (req, res) => {
  const { courseId } = req.params;

  try {
    const parsedData = assignTeacherSchema.parse(req.body);
    const course = await Course.findByIdAndUpdate(
      courseId,
      { $addToSet: { teachers: parsedData.teacherId } },
      { new: true }
    );
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json({ message: 'Teacher assigned successfully', course });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ message: 'Server error', error });
  }
};

export const openRegistration = async (req, res) => {
  const { courseId } = req.params;

  try {
    const parsedData = openRegistrationSchema.parse(req.body);
    const course = await Course.findByIdAndUpdate(courseId, { registrationOpen: parsedData.registrationOpen }, { new: true });
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json({ message: 'Registration updated successfully', course });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getAvailableCourses = async (req, res) => {
  try {
    const courses = await Course.find({ registrationOpen: true }).populate('teachers', 'name email');
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
