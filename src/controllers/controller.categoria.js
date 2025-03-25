import serviceCategoria from "../services/service.categoria.js"

async function listar(req, res){
    try {
        const categorias = await serviceCategoria.listar()
        res.status(200).json(categorias)
    } catch (error) {
        res.status(500).json({ error })
    }
}


export default { listar }