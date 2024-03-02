import {
    TextractClient,
    AnalyzeDocumentCommand,
    FeatureType
} from "@aws-sdk/client-textract"
import * as fs from 'fs'
import * as dotenv from 'dotenv'

dotenv.config()

const {
    REGION,
    AWS_ACCESS_KEY,
    AWS_SECRET_KEY,
} = process.env

const textractClient = new TextractClient({
    region: REGION,
    credentials: {
        accessKeyId: AWS_ACCESS_KEY,
        secretAccessKey: AWS_SECRET_KEY,
    }
})

export default class TextractServices {

    static scanDocument = async (filePath: string) => {
        try {
            const bytes = fs.readFileSync(filePath)
            const params = {
                Document: {
                    Bytes: bytes,
                },
                FeatureTypes: [
                    FeatureType.FORMS,
                ]
            }
            const response = await textractClient.send(new AnalyzeDocumentCommand(params))

            return {
                message: 'Success Scanned',
                data: response
            }
        } catch (error) {
            if (error instanceof Error) {
                console.error("Error al analizar el documento:", error.message)
                throw error
            }
        }
    }
}
