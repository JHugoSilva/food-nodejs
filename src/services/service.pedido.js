import repositoryPedido from "../repositories/repository.pedido.js"

async function listar(){
    const pedidos = await repositoryPedido.listar()
    return pedidos
}

async function listarId(id_pedido){
    const pedido = await repositoryPedido.listarId(id_pedido)
    return pedido
}

async function inserir(id_usuario, dados){
    const pedido = await repositoryPedido.inserir(id_usuario, dados)
    return pedido
}

export default {listar, listarId, inserir}