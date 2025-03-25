import servicePedido from "../services/service.pedido.js"

async function listar(req, res){
    try {
        const pedidos = await servicePedido.listar()
        res.status(200).json(pedidos)
    } catch (error) {
        res.status(500).json({ error })
    }
}

async function listarId(req, res){
    try {
        const id_pedido = req.params.id_pedido
        const pedido = await servicePedido.listarId(id_pedido)
        res.status(200).json(pedido)
    } catch (error) {
        res.status(500).json({ error })
    }
}

async function inserir(req, res){
    try {
        const id_usuario = req.id_usuario
        const pedido = await servicePedido.inserir(id_usuario, req.body)
        res.status(201).json(pedido)
    } catch (error) {
        res.status(500).json({ error })
    }
}




export default { listar, listarId, inserir }