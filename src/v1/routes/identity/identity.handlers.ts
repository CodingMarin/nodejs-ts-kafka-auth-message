import { Request, Response } from 'express'
import { TextractServices } from '../../../services/aws'
import fs from 'fs'
import multer from 'multer'
import path from 'path'
import { CustomError } from '../../../utils'

const storage = multer.diskStorage({
    destination: function (_, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (_, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage }).single('photo')

export const verifyIdentityHandler = async (req: Request, res: Response) => {

    upload(req, res, async () => {

        if (!req.file) throw new CustomError('Files is necessary', 400)

        const filePath = req.file.path
        try {
            const result = await TextractServices.scanDocument(filePath)

            fs.unlinkSync(filePath)

            res.status(200).json({ message: 'Archivo procesado exitosamente', result })
        } catch (error) {
            if (error instanceof Error) {
                throw new CustomError('Error interno del servidor', 500)
            }
        }
    })
}