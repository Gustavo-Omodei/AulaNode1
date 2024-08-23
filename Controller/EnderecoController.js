const { json } = require('sequelize');
const {Endereco} = require('../Models');

exports.createEndereco = async (req, res) => {
    try{
        const { Cep, Logradouro, Numero, Complemento, Bairro, Cidade, Estado, MunicipioIBGE} = req.body;

        const novoEndereco = await Endereco.create({
            Cep,
            Logradouro,
            Numero,
            Complemento,
            Bairro,
            Cidade,
            Estado,
            MunicipioIBGE,
        });

        res.status(201).json(novoEndereco);
    } catch(error){
        res.status(500).json({error: 'Erro ao criar enndereço', details: error.message});
    }
};

exports.getAllEnderecos = async(req,res) => {
    try{
        const enderecos = await Endereco.findAll();
        res.status(200).json(enderecos);
    }catch(error){
        res.status(500).json({ error: 'Erro ao buscar endereços', details: error.message});
    }
};

exports.getEnderecoByID = async (req, res) => {
    try{
        const {Id} = req.params;
        const endereco = await Endereco.findByPk(Id);

        if(!endereco){
            return res.status(404).json({error: 'Endereço não encontrado'});
        }

        res.status(200).json(endereco);
    } catch(error){
        res.status(500).json({error: 'Erro ao buscar endereço', details: error.message});
    }
}; 

exports.updateEndereco = async (req, res) => {
    try {
    const {Id} = req.params;
    const { Cep, Logradouro, Numero, Complemento, Bairro, Cidade, Estado, MunicipioIBGE} =  req.body;
    const endereco = await Endereco.findByPk (Id);
    if (!endereco) {
    return res.status(404).json({ error: 'Endereço não encontrado' });
    }
    endereco.Cep = Сер;
    endereco. Logradouro  =Logradouro;
    endereco.Numero = Numero;
    endereco.Complemento = Complemento;
    endereco.Bairro = Bairro;
    endereco.Cidade = Cidade;
    endereco.Estado = Estado;
    endereco.MunicipioIBGE = MunicipioIBGE;
    
    await endereco.save();

    res.status(200).json(endereco);
    } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar endereço', details: error.message });
    }
};

exports.deleteEndereco = async (req, res) => {
    try {
    const { Id} = req.params;
    const endereco = await Endereco.findByPk (Id);
    if (!endereco) {
    return res.status(404).json({ error: 'Endereço não encontrado' });
    }
    await endereco.destroy();
    res.status(204).send(); // Sem conteúdo, pois foi deletado com sucesso
    } catch (error) {
    res.status (500).json({ error: 'Erro ao deletar endereço', details: error.message });
    }
};

const buscarESalvarEndereco = async (req, res) => {
    const { cep } = req.params;
  
    try {
      // Fazer a solicitação à API ViaCEP
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      
      const { data } = response;
  
      if (data.erro) {
        return res.status(404).json({ error: 'CEP não encontrado' });
      }
  
      // Desestruturar os dados recebidos
      const { logradouro, bairro, localidade: cidade, uf: estado } = data;
  
      // Criar ou atualizar o endereço no banco de dados
      const [endereco, created] = await Endereco.upsert({
        cep,
        logradouro,
        bairro,
        cidade,
        estado
      });
  
      // Responder ao cliente
      if (created) {
        res.status(201).json({ message: 'Endereço criado com sucesso', endereco });
      } else {
        res.status(200).json({ message: 'Endereço atualizado com sucesso', endereco });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar o endereço' });
    }
  };
  
  module.exports = {
    buscarESalvarEndereco
  };