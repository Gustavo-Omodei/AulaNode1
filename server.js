const express = require('express');
const rotas = require('./routes');
// const sequelize = require('./config/database');

// // Verifique a conexão com o banco de dados
// sequelize.authenticate()
//   .then(() => {
//     console.log('Conexão com o banco de dados bem-sucedida.');
//   })
//   .catch(err => {
//     console.error('Erro ao conectar com o banco de dados:', err);
//   });

// // Sincronize os modelos com o banco de dados
// sequelize.sync()
//   .then(() => {
//     console.log('Modelos sincronizados com o banco de dados.');
//   })
//   .catch(err => {
//     console.error('Erro ao sincronizar modelos:', err);
//   });

const app = express();

app.use(express.json());
app.use('/api', rotas);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
