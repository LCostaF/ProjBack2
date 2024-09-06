// Arquivo para o middleware de autenticação
import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';

async function verificarToken(req, res, next) {
    const cabecalhoAutorizacao = req.headers['authorization']
    const token = cabecalhoAutorizacao && cabecalhoAutorizacao.split(" ")[1]

    if (!token) {
        return res.status(401).json({ mensagem: "Acesso negado, token ausente" })
    }

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

async function verificarAdmin(req, res, next) {
    const cabecalhoAutorizacao = req.headers['authorization']
    const token = cabecalhoAutorizacao && cabecalhoAutorizacao.split(" ")[1]
    if (!token) {
        return res.status(401).json({ mensagem: "Acesso negado" })
    }

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