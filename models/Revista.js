// Arquivo de modelo para Revistas
import mongoose from "mongoose";

const EsquemaRevista = new mongoose.Schema({
  titulo: { 
    type: String, 
    required: true 
  },
  categoria: { 
    type: String, 
    required: true 
  },
  descricao: { 
    type: String, 
    required: true 
  }
})

const Revista = mongoose.model('Revista', EsquemaRevista)

// listar revistas que o usuário logado assina

export default Revista;