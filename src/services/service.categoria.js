import repositoryCategoria from "../repositories/repository.categoria.js"

async function listar(){
    const categorias = await repositoryCategoria.listar()
    return categorias
}

export default {listar}