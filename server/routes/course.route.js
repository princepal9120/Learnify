import express from 'express'
import { createCourse } from '../controllers/course.controller';
import isAuthenticated from '../middlewares/isAuthenticated';

const router=express.Router();
router.route("/").post(isAuthenticated, createCourse);

export default router;