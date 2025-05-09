import { Request, Response, NextFunction } from 'express'
import Unauthorized from '../helper/cutom-errors/unauthorized'
import jwt from '../helper/jwt'
import { getUserAndPrivilege } from '../services/auth-service'
import { JwtPayload } from 'jsonwebtoken'
import ForbiddenError from '../helper/cutom-errors/forbidden'

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization
  if (!authorization) {
    throw new Unauthorized('Not Authorized')
  }

  const token = authorization?.replace('Bearer', '').trim()
  if (!token) {
    throw new Unauthorized('Not Authorized')
  }

  try {
    const decoded = await jwt.verifyToken(token) as JwtPayload

    const user = await getUserAndPrivilege(decoded.uid)

    req.USER = user

    next()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    throw new Unauthorized('Not Authorized')
  }
}

export const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  if (req.USER?.privilege?.name !== 'admin') {
    throw new ForbiddenError('Forbidden')
  }

  next()
}

export default {
  authMiddleware,
  adminMiddleware,
}