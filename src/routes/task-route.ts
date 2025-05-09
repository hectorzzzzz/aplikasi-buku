import express  from "express";
import taskController from "../controller/task-controller";
import { authMiddleware } from "../middlewares/auth-middleware";

const taskRoutes = express.Router()

taskRoutes.post('/tasks', express.json(), authMiddleware, taskController.createTask)
taskRoutes.get('/tasks', authMiddleware, taskController.findAllTask)
taskRoutes.get('/tasks/:id', express.json(), authMiddleware, taskController.updateTaskById)
taskRoutes.delete('/tasks/:id', authMiddleware, taskController.deleteTaskById)

export default taskRoutes
