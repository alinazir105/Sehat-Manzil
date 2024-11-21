import Section from '../models/Section.js';
import Course from '../models/Course.js';
import { z } from 'zod';

const registerSectionSchema = z.object({
  sectionId: z.string().length(24, 'Invalid section ID'),
});

export const registerForSection = async (req, res) => {
  const studentId = req.user._id;
  const { sectionId } = req.body;

  try {
    const parsedData = registerSectionSchema.parse(req.body);
    const section = await Section.findById(parsedData.sectionId);

    if (!section) return res.status(404).json({ message: 'Section not found' });
    if (section.students.length >= section.maxStudents) {
      return res.status(400).json({ message: 'Section is full' });
    }

    section.students.push(studentId);
    await section.save();
    res.json({ message: 'Registered for section successfully', section });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getRegisteredSections = async (req, res) => {
  const studentId = req.user._id;

  try {
    const sections = await Section.find({ students: studentId })
      .populate('course', 'courseName courseCode')
      .populate('teachers', 'name email');
    res.json(sections);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getAssignedSections = async (req, res) => {
  const teacherId = req.user._id;

  try {
    const sections = await Section.find({ teachers: teacherId })
      .populate('course', 'courseName courseCode')
      .populate('students', 'name email');
    res.json(sections);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
