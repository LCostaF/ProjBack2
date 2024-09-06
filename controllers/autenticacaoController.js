import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';

const autenticacao = async (req, res) => {

    const { email, senha } = req.body

    const usuario = await Usuario.findOne({ email })

    if(!usuario) {
        return res.status(404).json({
            mensagem: "Usuário não encontrado"
        })
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha)

    if(!senhaCorreta) {
        return res.status(422).json({
            mensagem: 'Senha inválida'
        })
    }

    try {

        const segredoJwt = process.env.SECRET
        const expiracaoJwt = process.env.EXPIRE

        const token = jwt.sign(
            {
                id: usuario._id,
            },
            segredoJwt, { expiresIn: expiracaoJwt }
        )

        res.status(200).json({
            mensagem: "Autenticação concluída com sucesso", token
        })

    } catch (erro) {
        console.log(erro)
        return res.status(500).json({
            mensagem: "Ocorreu um erro no servidor, por favor tente novamente mais tarde"
        })
    }
}

export default autenticacao