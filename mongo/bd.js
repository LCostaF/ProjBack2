// Arquivo para conectar com o banco de dados MongoDB
import mongoose from "mongoose";

async function conexaoBanco() {

    // Pega as variáveis do arquivo de ambiente
    const cluster = process.env.DB_CLUSTER
    const username = process.env.DB_USERNAME
    const password = process.env.DB_PASSWORD
    const appname = process.env.APPNAME

    // URL do banco de dados
    const uri = `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/?retryWrites=true&w=majority&appName=${appname}`

    // Tenta conectar com o banco de dados
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
