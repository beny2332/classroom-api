import express from 'express';
import * as studentController from '../controllers/studentController';

const router = express.Router();

/**
 * @swagger
 * /api/students/{studentId}/grades:
 *   get:
 *     summary: Get all grades for a student
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: studentId
 *         schema:
 *           type: string
 *         required: true
 *         description: The student ID
 *     responses:
 *       200:
 *         description: List of grades
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/grades/{id}:
 *   get:
 *     summary: Get a grade by ID
 *     tags: [Students]
 *     security: 
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
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
router.get('/grades/:id', studentController.getGrade);
router.get('/students/:studentId/grades', studentController.getAllGrades);

export default router;