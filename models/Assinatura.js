// Arquivo de modelo para Assinaturas
import mongoose from "mongoose";

const EsquemaAssinatura = new mongoose.Schema({
  usuario: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Usuario',
    required: true 
  },
  revista: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Revista',
    required: true 
  },
  dataInicial: { 
    type: Date, 
    default: Date.now 
  },
  dataFinal: { 
    type: Date, 
    required: true 
  },
})

const Assinatura = mongoose.model('Assinatura', EsquemaAssinatura)

export default Assinatura