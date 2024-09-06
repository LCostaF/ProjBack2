// Arquivo de rotas
import express from 'express';
import autenticacao from '../controllers/autenticacaoController.js';
import Usuario from '../models/Usuario.js';
import UsuarioController from '../controllers/usuarioController.js';
import Revista from '../models/Revista.js';
import RevistaController from '../controllers/revistaController.js';
import Assinatura from '../models/Assinatura.js';
import AssinaturaController from '../controllers/assinaturaController.js';
import { validarUsuario } from '../inputValidadores/validarUsuario.js';
import { validaLogin } from '../inputValidadores/validarLogin.js';
import { verificarToken, verificarAdmin } from '../middlewares/middlewareAutenticacao.js';

const router = express.Router();

// Rota para autenticação
router.post('/login', validaLogin, autenticacao, (req, res) => {
    /*  #swagger.tags = ['Login']
        #swagger.description = 'Endpoint para fazer login'
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Informações de login',
            required: true,
            schema: { 
                type: 'object',
                properties: {
                    email: { type: 'string', example: 'email@example.com' },
                    senha: { type: 'string', example: 'password123' }
                }
            }
        } */
});

// Rotas para Usuários
router.post('/usuario/registro', validarUsuario, UsuarioController.cadastrar, (req, res) => {
    // #swagger.tags = ['Usuário']
    // #swagger.description = 'Endpoint para registrar um novo usuário'
    // #swagger.parameters['body'] = {
    //   in: 'body',
    //   description: 'Dados para registro de usuário',
    //   required: true,
    //   schema: {
    //     type: 'object',
    //     properties: {
    //       nome: { type: 'string', example: 'Lucas' },
    //       email: { type: 'string', example: 'lucas@email.com' },
    //       senha: { type: 'string', example: 'batatinha' }
    //     }
    //   }
    // }
});

router.post('/usuario/cria-admin', verificarAdmin, UsuarioController.criarAdmin, (req, res) => {
    // #swagger.tags = ['Usuário']
    // #swagger.description = 'Endpoint para criar um usuário administrador'
    // #swagger.parameters['body'] = {
    //   in: 'body',
    //   description: 'Dados para criar administrador',
    //   required: true,
    //   schema: {
    //     type: 'object',
    //     properties: {
    //       nome: { type: 'string', example: 'Admin' },
    //       email: { type: 'string', example: 'admin@email.com' },
    //       senha: { type: 'string', example: 'senhaSegura' }
    //     }
    //   }
    // }
});

router.delete('/usuario/deleta-usuario/:id', verificarAdmin, UsuarioController.excluirUsuario, (req, res) => {
    // #swagger.tags = ['Usuário']
    // #swagger.description = 'Endpoint para deletar um usuário'
    // #swagger.parameters['id'] = { 
    //   in: 'path', 
    //   description: 'ID do usuário a ser deletado', 
    //   required: true, 
    //   type: 'string'
    // }
});

router.put('/usuario/atualiza-usuario/:id', verificarToken, UsuarioController.atualizarUsuario, (req, res) => {
    // #swagger.tags = ['Usuário']
    // #swagger.description = 'Endpoint para atualizar informações de um usuário'
    // #swagger.parameters['id'] = {
    //   in: 'path',
    //   description: 'ID do usuário a ser atualizado',
    //   required: true,
    //   type: 'string'
    // }
    // #swagger.parameters['body'] = {
    //   in: 'body',
    //   description: 'Dados atualizados do usuário',
    //   required: true,
    //   schema: {
    //     type: 'object',
    //     properties: {
    //       nome: { type: 'string', example: 'Novo Nome' },
    //       email: { type: 'string', example: 'novoemail@example.com' }
    //     }
    //   }
    // }
});

router.get('/usuarios', verificarAdmin, UsuarioController.listarUsuarios, (req, res) => {
    // #swagger.tags = ['Usuário']
    // #swagger.description = 'Endpoint para listar todos os usuários'
});

router.get('/usuario/:id', verificarAdmin, UsuarioController.obterUsuarioPorId, (req, res) => {
    // #swagger.tags = ['Usuário']
    // #swagger.description = 'Endpoint para obter informações de um usuário pelo ID'
    // #swagger.parameters['id'] = {
    //   in: 'path',
    //   description: 'ID do usuário',
    //   required: true,
    //   type: 'string'
    // }
});

// Rotas para Revistas
router.post('/revista/cadastrar', verificarToken, RevistaController.cadastrar, (req, res) => {
    // #swagger.tags = ['Revista']
    // #swagger.description = 'Endpoint para cadastrar uma nova revista'
    // #swagger.parameters['body'] = {
    //   in: 'body',
    //   description: 'Dados da revista',
    //   required: true,
    //   schema: {
    //     type: 'object',
    //     properties: {
    //       titulo: { type: 'string', example: 'Título da Revista' },
    //       categoria: { type: 'string', example: 'Categoria' },
    //       descricao: { type: 'string', example: 'Descrição da revista' }
    //     }
    //   }
    // }
});

router.get('/revistas', RevistaController.listarRevistas, (req, res) => {
    // #swagger.tags = ['Revista']
    // #swagger.description = 'Endpoint para listar todas as revistas'
});

router.get('/revista/:id', RevistaController.obterRevistaPorId, (req, res) => {
    // #swagger.tags = ['Revista']
    // #swagger.description = 'Endpoint para obter informações de uma revista pelo ID'
    // #swagger.parameters['id'] = {
    //   in: 'path',
    //   description: 'ID da revista',
    //   required: true,
    //   type: 'string'
    // }
});

router.put('/revista/atualizar/:id', verificarToken, RevistaController.atualizarRevista, (req, res) => {
    // #swagger.tags = ['Revista']
    // #swagger.description = 'Endpoint para atualizar uma revista pelo ID'
    // #swagger.parameters['id'] = {
    //   in: 'path',
    //   description: 'ID da revista',
    //   required: true,
    //   type: 'string'
    // }
    // #swagger.parameters['body'] = {
    //   in: 'body',
    //   description: 'Dados atualizados da revista',
    //   required: true,
    //   schema: {
    //     type: 'object',
    //     properties: {
    //       titulo: { type: 'string', example: 'Novo Título' },
    //       descricao: { type: 'string', example: 'Nova Descrição' }
    //     }
    //   }
    // }
});

router.delete('/revista/excluir/:id', verificarToken, RevistaController.excluirRevista, (req, res) => {
    // #swagger.tags = ['Revista']
    // #swagger.description = 'Endpoint para deletar uma revista pelo ID'
    // #swagger.parameters['id'] = {
    //   in: 'path',
    //   description: 'ID da revista',
    //   required: true,
    //   type: 'string'
    // }
});

// Rotas para Assinaturas
router.post('/assinatura/cadastrar', verificarToken, AssinaturaController.cadastrar, (req, res) => {
    // #swagger.tags = ['Assinatura']
    // #swagger.description = 'Endpoint para cadastrar uma nova assinatura'
    /* #swagger.parameters['body'] = {
          in: 'body',
          description: 'Informações da assinatura a ser cadastrada',
          required: true,
          schema: {
              type: 'object',
              properties: {
                  usuario: { type: 'string', example: '64e2fddcf90b6f1af1c34213' },
                  revista: { type: 'string', example: '64e2fddcf90b6f1af1c34567' },
                  dataInicial: { type: 'string', example: '2024-09-01' },
                  dataFinal: { type: 'string', example: '2025-09-01' }
              }
          }
      } */
    // #swagger.responses[201] = { description: 'Assinatura cadastrada com sucesso' }
    // #swagger.responses[400] = { description: 'Dados inválidos para cadastro da assinatura' }
    // #swagger.responses[500] = { description: 'Erro interno ao cadastrar a assinatura' }
});

router.get('/assinaturas', verificarToken, AssinaturaController.listarAssinaturas, (req, res) => {
    // #swagger.tags = ['Assinatura']
    // #swagger.description = 'Endpoint para listar todas as assinaturas'
    // #swagger.responses[200] = {
    //     description: 'Lista de assinaturas obtida com sucesso',
    //     schema: { 
    //         type: 'array',
    //         items: {
    //             type: 'object',
    //             properties: {
    //                 usuario: { type: 'string', example: '64e2fddcf90b6f1af1c34213' },
    //                 revista: { type: 'string', example: '64e2fddcf90b6f1af1c34567' },
    //                 dataInicial: { type: 'string', example: '2024-09-01' },
    //                 dataFinal: { type: 'string', example: '2025-09-01' }
    //             }
    //         }
    //     }
    // }
    // #swagger.responses[401] = { description: 'Usuário não autenticado' }
    // #swagger.responses[500] = { description: 'Erro interno ao listar assinaturas' }
});

router.get('/assinatura/:id', verificarToken, AssinaturaController.obterAssinaturaPorId, (req, res) => {
    // #swagger.tags = ['Assinatura']
    // #swagger.description = 'Endpoint para obter uma assinatura específica por ID'
    // #swagger.parameters['id'] = {
    //   in: 'path',
    //   description: 'ID da assinatura',
    //   required: true,
    //   type: 'string',
    //   example: '64e2fddcf90b6f1af1c34213'
    // }
    // #swagger.responses[200] = {
    //     description: 'Assinatura obtida com sucesso',
    //     schema: {
    //         usuario: { type: 'string', example: '64e2fddcf90b6f1af1c34213' },
    //         revista: { type: 'string', example: '64e2fddcf90b6f1af1c34567' },
    //         dataInicial: { type: 'string', example: '2024-09-01' },
    //         dataFinal: { type: 'string', example: '2025-09-01' }
    //     }
    // }
    // #swagger.responses[404] = { description: 'Assinatura não encontrada' }
    // #swagger.responses[500] = { description: 'Erro interno ao buscar a assinatura' }
});

router.put('/assinatura/atualizar/:id', verificarToken, AssinaturaController.atualizarAssinatura, (req, res) => {
    // #swagger.tags = ['Assinatura']
    // #swagger.description = 'Endpoint para atualizar uma assinatura existente por ID'
    // #swagger.parameters['id'] = {
    //   in: 'path',
    //   description: 'ID da assinatura',
    //   required: true,
    //   type: 'string',
    //   example: '64e2fddcf90b6f1af1c34213'
    // }
    /* #swagger.parameters['body'] = {
          in: 'body',
          description: 'Dados para atualização da assinatura',
          required: true,
          schema: {
              type: 'object',
              properties: {
                  usuario: { type: 'string', example: '64e2fddcf90b6f1af1c34213' },
                  revista: { type: 'string', example: '64e2fddcf90b6f1af1c34567' },
                  dataInicial: { type: 'string', example: '2024-09-01' },
                  dataFinal: { type: 'string', example: '2025-09-01' }
              }
          }
      } */
    // #swagger.responses[200] = { description: 'Assinatura atualizada com sucesso' }
    // #swagger.responses[400] = { description: 'Dados inválidos para atualização' }
    // #swagger.responses[404] = { description: 'Assinatura não encontrada' }
    // #swagger.responses[500] = { description: 'Erro interno ao atualizar a assinatura' }
});

router.delete('/assinatura/excluir/:id', verificarToken, AssinaturaController.excluirAssinatura, (req, res) => {
    // #swagger.tags = ['Assinatura']
    // #swagger.description = 'Endpoint para excluir uma assinatura por ID'
    // #swagger.parameters['id'] = {
    //   in: 'path',
    //   description: 'ID da assinatura',
    //   required: true,
    //   type: 'string',
    //   example: '64e2fddcf90b6f1af1c34213'
    // }
    // #swagger.responses[200] = { description: 'Assinatura excluída com sucesso' }
    // #swagger.responses[404] = { description: 'Assinatura não encontrada' }
    // #swagger.responses[500] = { description: 'Erro interno ao excluir a assinatura' }
});

//Rota de instalação
router.get('/install/', async (req, res) => {
    try {
        // Limpa as coleções existentes
        await Assinatura.deleteMany({});
        await Revista.deleteMany({});
        await Usuario.deleteMany({});

        // Insere dados na coleção Usuario
        const usuarios = [
            { nome: 'Lucas', email: 'lucas@email.com', senha: await Usuario.criptografarSenha('batatinha'), admin: true },
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
