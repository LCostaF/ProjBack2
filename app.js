// Arquivo principal
import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import conexaoBanco from './mongo/bd.js';
import rotas from './routes/rotas.js';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger_doc.json' assert { type: 'json' };

// Verifica e informa resultado de conexão com BD
async function verificaConexao() {
    const db = await conexaoBanco();
    if(db)
        console.log('Conexão com o bd estabelecida com sucesso')
    else
        console.log(`Erro ao conectar com o bd`)
}

// Usa arquivo de rotas e também prepara rota para Swagger
function instanciaRotas(app) {
    app.use(rotas)
    app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
}

// Função principal
function main() {
    const app = express()
    app.use(cors())
    dotenv.config();
    app.use(express.json())

    verificaConexao()
    instanciaRotas(app)

    // Define porta 3000 como porta para uso pelo app
    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
}

// Executa
main()