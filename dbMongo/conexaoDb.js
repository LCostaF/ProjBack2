import mongoose from "mongoose"

async function conexaoBanco() {

    const cluster = process.env.DB_CLUSTER
    const username = process.env.DB_USERNAME
    const password = process.env.DB_PASSWORD
    const appname = process.env.APPNAME

    const uri = `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/?retryWrites=true&w=majority&appName=${appname}`

    if (mongoose.connection.readyState === 0) {
        try {
            await mongoose.connect(uri)
            return true
        } catch (error) {
            return false
        }
    }
}

export default conexaoBanco