import Joi from 'joi';

const userSchema = Joi.object({
  nome: Joi.string().min(3).max(50).required().messages({ 
    'string.min': 'O nome deve conter no mínimo {#limit} caracteres.',
    'string.max': 'O nome deve conter no máximo {#limit} caracteres.',
    'any.required': 'O nome é obrigatório.',
  }),

  email: Joi.string().email({ tlds: { allow: false } }).required().messages({
    'string.email': 'O e-mail deve ser um endereço de e-mail válido e conter "@".',
    'any.required': 'O e-mail é obrigatório.',
  }),

  senha: Joi.string().min(8).required().messages({
    'string.min': 'A senha deve ter pelo menos {#limit} caracteres.',
    'any.required': 'A senha é obrigatória.',
  }),

  confirmarsenha: Joi.any().valid(Joi.ref('senha')).required().messages({
    'any.only': 'Senhas não confirmam',
    'any.required': 'A confirmação da senha é obrigatória.',
  }),

  admin: Joi.boolean().optional(),
  
})

export const validarUsuario = (req, res, next) => {
  const { error } = userSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ errors: error.details.map(detail => detail.message) });
  }
  next();
}