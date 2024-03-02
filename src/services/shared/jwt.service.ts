import * as dotenv from 'dotenv'
import jwt, { SignOptions } from 'jsonwebtoken'
import { CustomError } from '../../utils'

dotenv.config()

export class JwtService {
    private static SECRET = process.env.JWT_SECRET
    private static LIFETIME = parseInt(process.env.JWT_LIFETIME, 10) || 3600

    protected static signToken = (
        id: string,
        additionalPayload?: any,
        additionalSignOptions?: SignOptions
    ) => {
        return jwt.sign({ sub: id, ...additionalPayload }, this.SECRET, {
            algorithm: 'HS256',
            expiresIn: this.LIFETIME,
            ...additionalSignOptions,
        })
    }

    static authorize = (token: string) => {
        if (!token) throw new CustomError('Must provide authorization token', 403)
        try {
            const result = jwt.verify(token, this.SECRET)
            return typeof result === 'string' ? result : (<{ sub: string }>result).sub
        } catch (error) {
            if (error.name === 'TokenExpiredError')
                throw new CustomError('Token expired', 401)

            throw error
        }
    }
}
