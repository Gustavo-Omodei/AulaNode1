const express = require('express');
const enderecoController = require('./Controller/EnderecoController');

const router = express. Router();

router.post('/enderecos', enderecoController.createEndereco);
router.get('/enderecos', enderecoController.getAllEnderecos);
router.get('/enderecos/: Id', enderecoController.getEnderecoById);
router.put('/enderecos/: Id', enderecoController.updateEndereco);
router.delete('/enderecos/: Id', enderecoController.deleteEndereco);
router.post('/enderecos/:cep', buscarESalvarEndereco);

module.exports = router;


module.exports = router;