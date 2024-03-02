import express from "express"
import { initializeDatabase } from './src/config'
import { identityRouter } from './src/v1/routes'
import { userRouter } from './src/v1/routes'
import { messageRouter } from './src/v1/routes'

const bootstrap = async () => {

    const app = express()

    app.use(express.json())

    app.use('/api/v1', userRouter)
    app.use('/api/v1', identityRouter)
    app.use('/api/v1', messageRouter)

    // Middleware to catch unmatches routes since currently there's no a clean way to do it with node js
    app.use((req, res, next, err) => {
        console.log(err)
        res.status(404).json({ message: err?.message || 'Route not found' })
    })

    app.get('/check-health', async (req, res) => {
        const message = 'Api Up!'
        res.status(200).json({ message })
    })

    await initializeDatabase()

    app.listen(8000, () => {
        console.log('App is listening on port 8000')
    })
}

bootstrap()