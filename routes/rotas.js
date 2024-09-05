import express from 'express'

import autenticacao from '../controllers/autenticacaoController.js'
import UsuarioController from '../controllers/usuarioController.js'

import { validarUsuario } from '../inputValidadores/validarUsuario.js'
import { validaLogin } from '../inputValidadores/validarLogin.js'

import { verificarToken, verificarAdmin } from '../middlewares/middlewareAutenticacao.js'

const router = express.Router();

// Rota para autenticação
router.post('/login', validaLogin, autenticacao)

// Rotas para o Usuário
router.post('/usuario/registro', validarUsuario, UsuarioController.cadastrar)
router.post('/usuario/cria-admin', verificarAdmin, UsuarioController.criarAdmin)
router.delete('/usuario/deleta-usuario/:id', verificarAdmin, UsuarioController.excluirUsuario)
router.put('/usuario/atualiza-usuario/:id', verificarToken, UsuarioController.atualizarUsuario)
router.get('/usuarios', verificarAdmin, UsuarioController.listarUsuarios)
router.get('/usuario/:id', verificarAdmin, UsuarioController.obterUsuarioPorId)

export default router;