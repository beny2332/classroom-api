import express from "express"
import authenticate from "../middlewares/authMiddleware"
import { authorize } from "../middlewares/roleMiddleware"
import * as teacherController from "../controllers/teacherController"

const router = express.Router()

/**
 * @swagger
 * /api/teachers/grades:
 *   post:
 *     summary: Add a grade to a student
 *     tags: [Teachers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentId:
 *                 type: string
 *               classId:
 *                 type: string
 *               name:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               grade:
 *                 type: number
 *     responses:
 *       201:
 *         description: Grade added successfully
 *       500:
 *         description: Internal server error
 */
router.post(
  "/grades",
  authenticate,
  authorize(["teacher"]),
  teacherController.addGrade
)
/**
 * @swagger
 * /api/teachers/grades/{id}:
 *   put:
 *     summary: Update a grade
 *     tags: [Teachers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The grade ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               grade:
 *                 type: number
 *     responses:
 *       200:
 *         description: Grade updated successfully
 *       404:
 *         description: Grade not found
 *       500:
 *         description: Internal server error
 */
router.put(
  "/grades/:id",
  authenticate,
  authorize(["teacher"]),
  teacherController.updateGrade
)
/**
 * @swagger
 * /api/teachers/classrooms/{classroomId}/students:
 *   get:
 *     summary: Get all students in a classroom
 *     tags: [Teachers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: classroomId
 *         schema:
 *           type: string
 *         required: true
 *         description: The classroom ID
 *     responses:
 *       200:
 *         description: List of students
 *       404:
 *         description: Classroom not found
 *       500:
 *         description: Internal server error
 */
router.get(
  "/classrooms/:classroomId/students",
  authenticate,
  authorize(["teacher"]),
  teacherController.getClassroomStudents
)
/**
 * @swagger
 * /api/teachers/classrooms/{classroomId}/average:
 *   get:
 *     summary: Get the average grade for a classroom
 *     tags: [Teachers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: classroomId
 *         schema:
 *           type: string
 *         required: true
 *         description: The classroom ID
 *     responses:
 *       200:
 *         description: Classroom average grade
 *       404:
 *         description: Classroom not found
 *       500:
 *         description: Internal server error
 */
router.get(
  "/classrooms/:classroomId/average",
  authenticate,
  authorize(["teacher"]),
  teacherController.getClassroomAverage
)

/**
 * @swagger
 * /api/teachers/students/{studentId}/grades/{gradeId}:
 *   get:
 *     summary: Get a specific grade for a student
 *     tags: [Teachers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: studentId
 *         schema:
 *           type: string
 *         required: true
 *         description: The student ID
 *       - in: path
 *         name: gradeId
 *         schema:
 *           type: string
 *         required: true
 *         description: The grade ID
 *     responses:
 *       200:
 *         description: Grade details
 *       404:
 *         description: Grade not found
 *       500:
 *         description: Internal server error
 */
router.get(
  "/students/:studentId/grades/:gradeId",
  authenticate,
  authorize(["teacher"]),
  teacherController.getStudentGrade
)

export default router
