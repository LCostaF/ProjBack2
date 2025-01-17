// Arquivo controller para Revistas
import Revista from '../models/Revista.js';

const RevistaController = {
    // Função de cadastro
    async cadastrar(req, res) {
        try {
            const revista = new Revista({
                titulo: req.body.titulo,
                categoria: req.body.categoria,
                descricao: req.body.descricao
            });

            await revista.save();

            res.status(201).json({
                mensagem: "Revista criada com sucesso!"
            });
        } catch (erro) {
            res.status(500).json({
                erro: "Erro no servidor", erro
            });
        }
    },

    // Função de listagem
    async listarRevistas(req, res) {
        const { pagina = 1, limite = 5 } = req.query;

        if (limite != 5 && limite != 10 && limite != 30) {
            res.status(400).json({ mensagem: 'O limite deve ser 5, 10 ou 30.' });
        } else {
            try {
                const revistas = await Revista.find()
                    .limit(limite * 1)
                    .skip((pagina - 1) * limite)
                    .exec();
    
                const contagem = await Revista.countDocuments();
    
                res.json({
                    revistas,
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

    // Função de busca
    async obterRevistaPorId(req, res) {
        const { id } = req.params;

        try {
            const revista = await Revista.findById(id);
            if (!revista) return res.status(404).json({
                erro: 'Revista não encontrada'
            });
            res.json(revista);
        } catch (erro) {
            res.status(500).json({
                erro: "Erro no servidor"
            });
        }
    },

    // Função de atualização
    async atualizarRevista(req, res) {
        try {
            const revista = await Revista.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true, runValidators: true }
            );

            if (!revista)
                return res.status(404).json({
                    erro: 'Revista não encontrada'
                });
            res.json({
                revista
            });
        } catch (erro) {
            res.status(500).json({
                erro: "Erro no servidor"
            });
        }
    },

    // Função de exclusão
    async excluirRevista(req, res) {
        try {
            const revista = await Revista.findByIdAndDelete(req.params.id);
            if (!revista) return res.status(404).json({
                erro: 'Revista não encontrada'
            });
            res.json({
                mensagem: 'Revista removida com sucesso'
            });
        } catch (erro) {
            res.status(500).json({
                erro: "Erro no servidor"
            });
        }
    }
};

export default RevistaController;