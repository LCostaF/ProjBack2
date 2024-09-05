import express from "express"
import cors from "cors"
import dotenv from 'dotenv';
import conexaoBanco from './dbMongo/conexaoDb.js'

import rotas from './routes/rotas.js'

async function verificaConexao() {
    const db = await conexaoBanco();

    if(db)
        console.log('Conexão com o bd estabelecida com sucesso')
    else
        console.log(`Erro ao conectar com o bd`)
}

function instanciaRotas(app) {
    app.use(rotas)
}

function main() {
    const app = express()
    app.use(cors())
    dotenv.config();
    app.use(express.json())

    verificaConexao()
    instanciaRotas(app)

    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
}

main()