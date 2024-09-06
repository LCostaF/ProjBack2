// Arquivo para o middleware de autenticação
import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';

// Verifica se o Token de acesso está presente
async function verificarToken(req, res, next) {
    const cabecalhoAutorizacao = req.headers['authorization']
    const token = cabecalhoAutorizacao && cabecalhoAutorizacao.split(" ")[1]

    // Se não conseguir obter token
    if (!token) {
        return res.status(401).json({ mensagem: "Acesso negado, token ausente" })
    }

    // Utiliza token e SECRET para buscar um Usuário correspondente
    try {
        const segredo = process.env.SECRET
        const decodificado = jwt.verify(token, segredo)
        const usuario = await Usuario.findById(decodificado.id)

        if (!usuario) {
            return res.status(404).json({ mensagem: "Usuário não encontrado" })
        }

        req.usuario = usuario
        next()
    } catch (erro) {
        res.status(401).json({ mensagem: "Token inválido" })
    }
}

// Verifica se o usuário é um Administrador
async function verificarAdmin(req, res, next) {
    const cabecalhoAutorizacao = req.headers['authorization']
    const token = cabecalhoAutorizacao && cabecalhoAutorizacao.split(" ")[1]

    // Se não conseguir obter token
    if (!token) {
        return res.status(401).json({ mensagem: "Acesso negado" })
    }

    // Utiliza token e SECRET para buscar um Usuário correspondente, e validar se usuario.admin é true
    try {
        const segredo = process.env.SECRET
        const decodificado = jwt.verify(token, segredo)
        const usuario = await Usuario.findById(decodificado.id)

        if (!usuario || !usuario.admin) {
            return res.status(403).json({ mensagem: "Acesso negado, não é um administrador" })
        }

        req.usuario = usuario
        next()
    } catch (erro) {
        res.status(400).json({ mensagem: "Token de usuário inválido", erro })
    }
}

export { verificarToken, verificarAdmin }
