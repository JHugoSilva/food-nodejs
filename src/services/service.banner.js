import repositoryBanner from "../repositories/repository.banner.js"

async function listar(){
    const banners = await repositoryBanner.listar()
    return banners
}

export default {listar}