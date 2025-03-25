import repositoryEmpresa from "../repositories/repository.empresa.js"

async function destaque(id_usuario){
    const empresas = await repositoryEmpresa.destaque(id_usuario)
    return  empresas
}

async function listar(id_usuario, busca, id_categoria, id_banner){
    
    const empresas = await repositoryEmpresa.listar(id_usuario, busca, id_categoria, id_banner)
    return  empresas
}

async function inserirFavorito(id_usuario, id_empresa) {
    const empresas = await repositoryEmpresa.inserirFavorito(id_usuario, id_empresa)
    return  empresas
}

async function excluirFavorito(id_usuario, id_empresa) {
    const empresas = await repositoryEmpresa.excluirFavorito(id_usuario, id_empresa)
    return  empresas
}

async function cardapio(id_usuario, id_empresa) {
    const empresas = await repositoryEmpresa.cardapio(id_usuario, id_empresa)
    return  empresas
}

async function listarProdutoId(id_empresa, id_produto) {
    const empresas = await repositoryEmpresa.listarProdutoId(id_empresa, id_produto)
    return  empresas
}




export default {destaque, listar, inserirFavorito, excluirFavorito, cardapio, listarProdutoId}