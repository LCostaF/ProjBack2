import mongoose from "mongoose"
import bcrypt from "bcrypt"

const EsquemaUsuario = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  senha: {
    type: String,
    required: true
  },
  admin: { 
    type: Boolean, 
    default: false 
  }
});

EsquemaUsuario.statics.criptografarSenha = async function(senha) {
  const sal = await bcrypt.genSalt(12);
  return bcrypt.hash(senha, sal);
};

const Usuario = mongoose.model('Usuario', EsquemaUsuario)

export default Usuario;