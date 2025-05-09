import { Request, Response} from 'express'
import { taskSchema, queryTaskSchema, taskSchemaPartial} from '../schemas/task-schema'
import taskService from '../services/task-service'
import { createdResponse, successResponse} from '../helper/response'
import { numberIdSchema } from '../schemas/id-schema'

export const createTask = async (req: Request, res: Response) => {
    const user = req.USER

    if (!user || !user.id) {
        res.status(401).json({ message: 'Unauthorized'})
        return
    }

    const parsePayload = await taskSchema.parseAsync(req.body)

    const payload = {
        ...parsePayload,
        userId: user.id,
    }

    const task = await taskService.createTask(payload)

    createdResponse(res, task)
}

export const findAllTask = async (req: Request, res: Response) => {
    const user = req.USER

    if (!user || !user.id) {
        res.status(401).json({ message: 'Unauthorized'})
        return
    }

    const query = await queryTaskSchema.parseAsync(req.query)

    const tasks= await taskService.findAllTask(user.id, query)

    successResponse(res, tasks)
}

export const updateTaskById = async (req: Request, res: Response) => {
    const user = req.USER

    if (!user || !user.id) {
        res.status(401).json({ message: 'Unauthorized'})
        return
    }

    const id = await numberIdSchema.parseAsync(req.params.id)

    const data =await taskSchemaPartial.parseAsync(req.body)

    await taskService.updateTaskById(id, user.id, data)
}

export const deleteTaskById = async (req: Request, res: Response) => {
    const user = req.USER

    if (!user || !user.id) {
        res.status(401).json({ message: 'Unauthorized'})
        return
    }

    const id = await numberIdSchema.parseAsync(req.params.id)

    await taskService.deleteTaskById(id, user.id)

    successResponse(res, {})
}

export default {
    createTask,
    findAllTask,
    updateTaskById,
    deleteTaskById,
}