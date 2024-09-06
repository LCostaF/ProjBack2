// Arquivo para gerar documentação swagger
import swaggerAutogen from 'swagger-autogen';

const swaggerAutogenInstance = swaggerAutogen();
const output = './swagger_doc.json';
const endpoints = ['./routes/rotas.js']; // Agora aponta para rotas.js

// Prepara a documentação
const doc = {
  info: {
    version: '1.0.0',
    title: 'ProjBack2',
    description: 'Segundo Projeto Programação Web Back End - Revistas'
  },
  // Define as tags
  tags: [
    {
      name: "Login",
      description: "Endpoints relacionados à autenticação"
    },
    {
      name: "Usuário",
      description: "Gerenciamento de usuários"
    },
    {
      name: "Revista",
      description: "Gerenciamento de revistas"
    },
    {
      name: "Assinatura",
      description: "Gerenciamento de assinaturas"
    },
    {
      name: "Instalação",
      description: "Instalação do Banco de Dados"
    }
  ]
};

// Gera arquivo de documentação
swaggerAutogenInstance(output, endpoints, doc);