import serviceEmpresa from "../services/service.empresa.js"

async function destaque(req, res){
    try {
        const id_usuario = req.id_usuario
        const empresas = await serviceEmpresa.destaque(id_usuario)
        res.status(200).json(empresas)
    } catch (error) {
        res.status(500).json({ error })
    }
}

async function listar(req, res){
    try {
        const id_usuario = req.id_usuario
        const busca = req.query.busca
        const id_categoria = req.query.id_categoria
        const id_banner = req.query.id_banner
        
        const empresas = await serviceEmpresa.listar(id_usuario, busca, id_categoria, id_banner)
        res.status(200).json(empresas)
    } catch (error) {
        res.status(500).json({ error })
    }
}

async function listarProdutoId(req, res){
    try {
        const id_empresa = req.params.id_empresa
        const id_produto = req.params.id_produto
        
        const empresas = await serviceEmpresa.listarProdutoId(id_empresa, id_produto)
        res.status(200).json(empresas)
    } catch (error) {
        res.status(500).json({ error })
    }
}

async function inserirFavorito(req, res){
    try {
        const id_usuario = req.id_usuario
        const id_empresa = req.params.id_empresa
        
        const empresas = await serviceEmpresa.inserirFavorito(id_usuario, id_empresa)
        res.status(201).json(empresas)
    } catch (error) {
        res.status(500).json({ error })
    }
}

async function excluirFavorito(req, res){
    try {
        const id_usuario = req.id_usuario
        const id_empresa = req.params.id_empresa
        
        const empresas = await serviceEmpresa.excluirFavorito(id_usuario, id_empresa)
        res.status(200).json(empresas)
    } catch (error) {
        res.status(500).json({ error })
    }
}

async function cardapio(req, res){
    try {
        const id_usuario = req.id_usuario
        const id_empresa = req.params.id_empresa
        
        const empresas = await serviceEmpresa.cardapio(id_usuario, id_empresa)
        res.status(200).json(empresas)
    } catch (error) {
        res.status(500).json({ error })
    }
}


export default { destaque, listar, inserirFavorito, excluirFavorito, cardapio, listarProdutoId }