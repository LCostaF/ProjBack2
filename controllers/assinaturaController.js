// Arquivo controller para Assinaturas
import Assinatura from '../models/Assinatura.js';
import Revista from '../models/Revista.js';

const AssinaturaController = {
    // Função de cadastro
    async cadastrar(req, res) {
        const { usuario, revista } = req.body;
    
        try {
            const revistaExistente = await Revista.findById(revista);
    
            if (!revistaExistente) {
                return res.status(404).json({
                    erro: 'Revista não encontrada'
                });
            }
    
            // Define a data inicial como a data atual
            const dataInicial = new Date(Date.now());
    
            // Cria a data final adicionando 365 dias à data inicial
            const dataFinal = new Date(dataInicial);
            dataFinal.setDate(dataFinal.getDate() + 365);
    
            const assinatura = new Assinatura({
                usuario: req.usuario._id,
                revista: revista,
                dataInicial: dataInicial,
                dataFinal: dataFinal
            });
    
            await assinatura.save();
    
            res.status(201).json({
                mensagem: "Assinatura realizada com sucesso"
            });
    
        } catch (erro) {
            res.status(500).json({
                erro: "Erro no servidor",
                erro
            });
        }
    },    

    // Função de listagem
    async listarAssinaturas(req, res) {
        const { pagina = 1, limite = 5 } = req.query;

        if (limite != 5 && limite != 10 && limite != 30) {
            res.status(400).json({ mensagem: 'O limite deve ser 5, 10 ou 30.' });
        } else {
            try {
                const assinaturas = await Assinatura.find({ usuario: req.usuario._id })
                    .populate('revista')
                    .limit(limite * 1)
                    .skip((pagina - 1) * limite)
                    .exec();
    
                const contagem = await Assinatura.countDocuments({ usuario: req.usuario._id });
    
                res.json({
                    assinaturas,
                    totalPaginas: Math.ceil(contagem / limite),
                    paginaAtual: pagina,
                });
            } catch (erro) {
                res.status(500).json({
                    erro: "Erro no servidor"
                });
            }
        }
    },

    // Listar revistas que o usuário logado assina
    async listarRevistasAssinadas(req, res) {
        const { pagina = 1, limite = 5 } = req.query;

        if (limite != 5 && limite != 10 && limite != 30) {
            res.status(400).json({ mensagem: 'O limite deve ser 5, 10 ou 30.' });
        } else {
            try {
                const assinaturas = await Assinatura.find({ usuario: req.usuario._id })
                    .populate('revista', 'titulo categoria descricao')
                    .limit(limite * 1)
                    .skip((pagina - 1) * limite)
                    .exec();
    
                if (!assinaturas.length) {
                    return res.status(404).json({ mensagem: 'Nenhuma revista encontrada para o usuário' });
                }
    
                // Extrai as revistas das assinaturas
                const revistas = assinaturas.map(assinatura => assinatura.revista);
    
                res.status(200).json({
                    revistas,
                    totalRevistas: revistas.length,
                });
            } catch (erro) {
                res.status(500).json({
                    mensagem: "Erro no servidor",
                    erro
                });
            }
        }
    },

    // Função de busca
    async obterAssinaturaPorId(req, res) {
        const { id } = req.params;

        try {
            const assinatura = await Assinatura.findById(id).populate('revista');

            if (!assinatura) return res.status(404).json({
                erro: 'Assinatura não encontrada'
            });

            if (assinatura.usuario.toString() !== req.usuario._id.toString()) {
                return res.status(403).json({ erro: 'Não autorizado' });
            }

            res.json(assinatura);

        } catch (erro) {
            res.status(500).json({
                erro: "Erro no servidor"
            });
        }
    },

    // Função de atualização - Atualiza a revista, mas não o usuário
    async atualizarAssinatura(req, res) {
        try {
            const assinatura = await Assinatura.findById(req.params.id);
    
            if (!assinatura) {
                return res.status(404).json({
                    erro: 'Assinatura não encontrada'
                });
            }
    
            // Se houver Usuário no body dispara erro - Não é permitido alterar o Usuário assinante de uma assinatura
            if (req.body.usuario) {
                return res.status(403).json({ erro: 'Não é permitido alterar o Usuário assinante' });
            }

            // Atualiza a revista se fornecida
            if (req.body.revista) {
                const novaRevista = await Revista.findById(req.body.revista);
                if (!novaRevista) {
                    return res.status(404).json({ erro: 'Revista não encontrada' });
                }
                assinatura.revista = req.body.revista;
            }
    
            // Atualiza a dataFinal se fornecida, caso contrário, calcula a dataFinal com base na dataAtual
            if (req.body.dataFinal) {
                assinatura.dataFinal = new Date(req.body.dataFinal);
            } else {
                // Define dataInicial como a data atual
                assinatura.dataInicial = new Date(Date.now());
    
                // Calcula a nova dataFinal com base na dataInicial
                const dataFinal = new Date(assinatura.dataInicial);
                dataFinal.setDate(dataFinal.getDate() + 365);
                assinatura.dataFinal = dataFinal;
            }
    
            await assinatura.save();
    
            res.json(assinatura);
        } catch (erro) {
            console.log(erro)
            res.status(500).json({
                erro: "Erro no servidor"
            });
        }
    },

    // Função de exclusão
    async excluirAssinatura(req, res) {
        try {
            const assinatura = await Assinatura.findById(req.params.id);

            if (!assinatura)
                return res.status(404).json({
                    erro: 'Assinatura não encontrada'
                });

            if (assinatura.usuario.toString() !== req.usuario._id.toString()) {
                return res.status(403).json({ erro: 'Não autorizado' });
            }

            await assinatura.deleteOne({ _id: assinatura.id });

            res.json({
                mensagem: 'Assinatura removida com sucesso'
            });
        } catch (erro) {
            res.status(500).json({
                erro: `Erro no servidor ${erro}`
            });
        }
    }
};



export default AssinaturaController;