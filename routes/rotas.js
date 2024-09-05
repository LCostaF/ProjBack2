import express from 'express'

import autenticacao from '../controllers/autenticacaoController.js'
import UsuarioController from '../controllers/usuarioController.js'
import RevistaController from '../controllers/revistaController.js'

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

// Rotas para Revista
router.post('/revista/cadastrar', verificarToken, RevistaController.cadastrar);
router.get('/revistas', RevistaController.listarRevistas);
router.get('/revista/:id', RevistaController.obterRevistaPorId);
router.put('/revista/atualizar/:id', verificarToken, RevistaController.atualizarRevista);
router.delete('/revista/excluir/:id', verificarToken, RevistaController.excluirRevista);

export default router;