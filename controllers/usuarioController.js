import Usuario from '../models/Usuario.js'

const UsuarioController = {
    async cadastrar(req, res) {
        const { nome, email, senha, admin } = req.body

        const usuarioExiste = await Usuario.findOne({ email })

        if (usuarioExiste) {
            return res.status(422).json({ mensagem: "Email já existe" })
        }

        const senhaCriptografada = await Usuario.criptografarSenha(senha);

        const novoUsuario = new Usuario({
            nome,
            email,
            senha: senhaCriptografada,
            admin
        });

        try {
            await novoUsuario.save();
            res.status(201).json({
                mensagem: "Usuário criado com sucesso!"
            });
        } catch (erro) {
            res.status(500).json({
                mensagem: "Erro no servidor"
            });
        }
    },

    async criarAdmin(req, res) {
        const { email } = req.body;

        try {
            const usuario = await Usuario.findOneAndUpdate({ email }, { admin: true }, { new: true })

            if (!usuario) {
                return res.status(404).json({ mensagem: "Usuário não encontrado" })
            }

            res.status(200).json({
                mensagem: "Usuário atualizado como admin!",
            });
        } catch (erro) {
            res.status(500).json({
                mensagem: "Erro no servidor"
            });
        }
    },

    async excluirUsuario(req, res) {
        const { id } = req.params

        try {
            const usuario = await Usuario.findById(id)

            if (!usuario) {
                return res.status(404).json({ mensagem: "Usuário não encontrado" })
            }

            if (usuario.admin) {
                return res.status(403).json({ mensagem: "Excluir administradores não é permitido" })
            }

            await usuario.deleteOne({ _id: usuario.id })
            res.json({ mensagem: "Usuário removido com sucesso" })
        } catch (erro) {
            res.status(500).json({ mensagem: 'Erro no servidor.' })
        }
    },

    async atualizarUsuario(req, res) {
        const { id } = req.params;
        const { nome, email, senha, admin } = req.body

        try {
            const usuario = await Usuario.findById(id)

            if (!usuario) {
                return res.status(404).json({ mensagem: "Usuário não encontrado" })
            }

            if (!req.usuario.admin && req.usuario._id.toString() !== id) {
                return res.status(403).json({
                    mensagem: "Você não está autorizado atualizar este usuário"
                });
            }

            usuario.nome = nome || usuario.nome
            usuario.email = email || usuario.email

            if (senha) {
                usuario.senha = await Usuario.criptografarSenha(senha);
            }

            usuario.admin = admin === undefined ? usuario.admin : admin

            const usuarioAtualizado = await usuario.save();
            res.json(usuarioAtualizado)
        } catch (erro) {
            res.status(500).json({
                mensagem: 'Erro no servidor.'
            });
        }
    },

    async listarUsuarios(req, res) {
        try {
            const { pagina = 1, limite = 5 } = req.query

            console.log("Parâmetros:", { pagina, limite });
            
            const usuariosNaoAdmin = await Usuario.find({ admin: false })
                .limit(limite * 1)
                .skip((pagina - 1) * limite)
                .exec();
            
            const contagem = await Usuario.countDocuments({ admin: false });
            
            res.json({
                usuariosNaoAdmin,
                totalPaginas: Math.ceil(contagem / limite),
                paginaAtual: pagina,
            });
        } catch (erro) {
            console.error('Erro detalhado:', erro);
            res.status(500).json({ mensagem: 'Erro no servidor' })
        }
    },

    async obterUsuarioPorId(req, res) {
        try {
            const usuario = await Usuario.findById(req.params.id)
            if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado' })
            res.json(usuario)
        } catch (erro) {
            res.status(500).json({ mensagem: 'Erro no servidor.' })
        }
    }
};

export default UsuarioController