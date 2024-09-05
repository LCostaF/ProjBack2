import express from 'express'

import autenticacao from '../controllers/autenticacaoController.js'
import UsuarioController from '../controllers/usuarioController.js'
import RevistaController from '../controllers/revistaController.js'
import AssinaturaController from '../controllers/assinaturaController.js'

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

// Rotas para Assinatura
router.post('/assinatura/cadastrar', verificarToken, AssinaturaController.cadastrar);
router.get('/assinaturas', verificarToken, AssinaturaController.listarAssinaturas);
router.get('/assinatura/:id', verificarToken, AssinaturaController.obterAssinaturaPorId);
router.put('/assinatura/atualizar/:id', verificarToken, AssinaturaController.atualizarAssinatura);
router.delete('/assinatura/excluir/:id', verificarToken, AssinaturaController.excluirAssinatura);

//Rota de instalação
router.get('/install/', async (req, res) => {
    try {
        // Limpa as coleções existentes
        await Assinatura.deleteMany({});
        await Revista.deleteMany({});
        await Usuario.deleteMany({});

        // Insere dados na coleção Usuario
        const usuarios = [
            { nome: 'Lucas', email: 'lucas@email.com', senha: await Usuario.criptografarSenha('batatinha') },
            { nome: 'Miguel', email: 'miguel@email.com', senha: await Usuario.criptografarSenha('dm2109dfia') },
            { nome: 'Matheus', email: 'matheus@email.com', senha: await Usuario.criptografarSenha('pindamonhangaba') },
            { nome: 'Bruce Wayne', email: 'darkknight@batmail.com', senha: await Usuario.criptografarSenha('batsenha') },
            { nome: 'Tony Stark', email: 'ironman@starkenterprisesmail.com', senha: await Usuario.criptografarSenha('FerroDeHomi') }
        ];

        // Insere dados na coleção Revista
        const revistas = [
            { titulo: 'Engenharia da Pesca 101', categoria: 'Pesca', descricao: 'Revista sobre o curso mais brabo das engenharias' },
            { titulo: 'UOL Física', categoria: 'Notícias', descricao: 'Imprimiram o site da UOL' },
            { titulo: 'CR7 e os coadjuvantes', categoria: 'Esportes', descricao: 'CR7 CR7 CR7 CR7 CR7 CR7 CR7' },
            { titulo: 'Pattern Recognition', categoria: 'Aprendizado de Máquina', descricao: 'Revista científica sobre reconhecimento de padrões, Machine Learning, classificação' },
            { titulo: 'IEEE Software Testing', categoria: 'Testes de Software', descricao: 'Revista científica sobre práticas e estudos sobre testes de software' }
        ];

        // Insere dados na coleção Assinatura
        const assinaturas = [
            { usuario: usuarios[0]._id, revista: revistas[0]._id, dataInicial: new Date(), dataFinal: new Date(new Date().setDate(new Date().getDate() + 365)) },
            { usuario: usuarios[1]._id, revista: revistas[1]._id, dataInicial: new Date(), dataFinal: new Date(new Date().setDate(new Date().getDate() + 365)) },
            { usuario: usuarios[2]._id, revista: revistas[2]._id, dataInicial: new Date(), dataFinal: new Date(new Date().setDate(new Date().getDate() + 365)) },
            { usuario: usuarios[3]._id, revista: revistas[3]._id, dataInicial: new Date(), dataFinal: new Date(new Date().setDate(new Date().getDate() + 365)) },
            { usuario: usuarios[4]._id, revista: revistas[4]._id, dataInicial: new Date(), dataFinal: new Date(new Date().setDate(new Date().getDate() + 365)) }
        ];

        // Insere os dados de Usuários e Revistas no banco
        await Usuario.insertMany(usuarios);
        await Revista.insertMany(revistas);

        // Garante que os usuários e revistas foram inseridos antes de inserir assinaturas
        const usuariosInseridos = await Usuario.find();
        const revistasInseridas = await Revista.find();

        for (let i = 0; i < assinaturas.length; i++) {
            assinaturas[i].usuario = usuariosInseridos[i]._id;
            assinaturas[i].revista = revistasInseridas[i]._id;
        }

        // Insere os dados de Assinaturas
        await Assinatura.insertMany(assinaturas);

        res.status(200).json({
            mensagem: 'Banco de dados instalado e populado com sucesso!'
        });
    } catch (error) {
        res.status(500).json({
            erro: 'Erro ao instalar o banco de dados',
            detalhes: error.message
        });
    }
});

export default router;
