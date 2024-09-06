// Arquivo de validação de login
import Joi from 'joi';

const loginSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).required().messages({
    'string.email': 'O e-mail deve ser um endereço de e-mail válido e conter "@".',
    'any.required': 'O e-mail é obrigatório.',
  }),
  senha: Joi.string().required().messages({
    'any.required': 'A senha é obrigatória.',
  })
})

export const validaLogin = (req, res, next) => {
  const { error } = loginSchema.validate(req.body, { abortEarly: false })
  if (error) {
    return res.status(400).json({ errors: error.details.map(detail => detail.message) })
  }
  next();
}