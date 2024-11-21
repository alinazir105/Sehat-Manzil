import Grade from '../models/Grade.js';
import { z } from 'zod';

// Zod schema for validating grade input
const questionSchema = z.object({
  questionText: z.string().nonempty('Question text is required'),
  score: z.number().min(0, 'Score must be a positive number'),
});

const gradeSchema = z.object({
  student: z.string().length(24, 'Invalid student ID'),
  section: z.string().length(24, 'Invalid section ID'),
  midterms: z.array(questionSchema).optional(),
  assignments: z.array(questionSchema).optional(),
  quizzes: z.array(questionSchema).optional(),
  project: z.array(questionSchema).optional(),
  final: z.array(questionSchema).optional(),
});

// Create or update grades for a student in a section
export const createOrUpdateGrades = async (req, res) => {
  try {
    // Validate the request body
    const parsedData = gradeSchema.parse(req.body);

    const { student, section, midterms, assignments, quizzes, project, final } = parsedData;

    // Find existing grade record for the student and section
    let grade = await Grade.findOne({ student, section });

    if (grade && grade.isLocked) {
      return res.status(400).json({ message: 'Grades are locked and cannot be updated.' });
    }

    if (grade) {
      // If grade exists, update it
      grade.grades = { midterms, assignments, quizzes, project, final };
    } else {
      // If no grade exists, create a new one
      grade = new Grade({
        student,
        section,
        grades: { midterms, assignments, quizzes, project, final },
      });
    }

    await grade.save();
    res.status(200).json({ message: 'Grades saved successfully', grade });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ message: 'Server error', error });
  }
};

// Lock grades for a specific student
export const lockGrades = async (req, res) => {
  const { gradeId } = req.params;

  try {
    const grade = await Grade.findByIdAndUpdate(
      gradeId,
      { isLocked: true },
      { new: true }
    );

    if (!grade) return res.status(404).json({ message: 'Grade not found' });

    res.json({ message: 'Grades locked successfully', grade });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get grades for a specific student
export const getStudentGrades = async (req, res) => {
  const { studentId, sectionId } = req.params;

  try {
    const grade = await Grade.findOne({ student: studentId, section: sectionId })
      .populate('student', 'name email')
      .populate('section', 'sectionName');

    if (!grade) return res.status(404).json({ message: 'Grades not found' });

    res.json(grade);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all grades for a section
export const getAllSectionGrades = async (req, res) => {
  const { sectionId } = req.params;

  try {
    const grades = await Grade.find({ section: sectionId })
      .populate('student', 'name email')
      .populate('section', 'sectionName');

    if (!grades.length) return res.status(404).json({ message: 'No grades found for this section' });

    res.json(grades);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete grades for a student in a section
export const deleteGrades = async (req, res) => {
  const { gradeId } = req.params;

  try {
    const grade = await Grade.findByIdAndDelete(gradeId);

    if (!grade) return res.status(404).json({ message: 'Grade not found' });

    res.json({ message: 'Grades deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getStudentOwnGrades = async (req, res) => {
  const { courseId } = req.params;
  const studentId = req.session.userId;

  try {

    const grade = await Grade.findOne({ student: studentId, section: courseId })
      .populate('student', 'name email')
      .populate('section', 'name');

    if (!grade) {
      return res.status(404).json({ message: 'No grades found for this course' });
    }

    res.json(grade);

  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
