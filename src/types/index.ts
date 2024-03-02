import { Request, Response } from "express"

export enum RoleType {
    USER = "USER",
    DELIVERY = "DELIVERY",
    ADMIN = "ADMIN",
}

export type HandlerWithSub = (
    req: Request,
    res: Response,
    sub?: string
) => void | Promise<void>

