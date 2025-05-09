import taskRepository from '../repository/task-repository'
import { queryTaskSchema, TaskSchema, TaskSchemaPartial } from '../schemas/task-schema'
import NotFoundError from '../helper/cutom-errors/not-found'
import { FindAndCountOptions } from 'sequelize'
import { Task } from '../models/task'

type TaskSchemaWithUserId = TaskSchema & { userId: number }

const createTask = async (task: TaskSchemaWithUserId) => {
    return taskRepository.createTask(task)
}

const findTaskById = async (id: number, userId: number) => {
    const task = await taskRepository.findTaskByIdAndUserId(id, userId)

    if (!task) {
        throw new NotFoundError('Task not found')
    }

    return task
}

const updateTaskById = async (id: number, userId: number, data: TaskSchemaPartial) => {
    const task = await taskRepository.findTaskByIdAndUserId(id, userId)

    if (!task) {
        throw new NotFoundError('Task not found')
    }

    return taskRepository.updateTaskById(id, data)
}

const findAllTask = async (userId: number, query: queryTaskSchema) => {
    const payload: Omit<FindAndCountOptions<Task>, 'group'> = {}

    payload.where = {
        userId,
    }

    if (query.is_completed) {
        payload.where = {
            completed: query.is_completed === 'true' ? true : false,
        }
    }

    return taskRepository.findAllTask(payload)
}

const deleteTaskById = async (id: number, userId: number) => {
    const task = await taskRepository.findTaskByIdAndUserId(id, userId)

    if(!task) {
        throw new NotFoundError('Task not found')
    }

    return taskRepository.deleteTaskById(id)
}

export default {
    createTask,
    findTaskById, 
    updateTaskById,
    findAllTask,
    deleteTaskById
}
