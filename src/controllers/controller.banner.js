import serviceBanner from "../services/service.banner.js"

async function listar(req, res){
    try {
        const banner = await serviceBanner.listar()
        res.status(200).json(banner)
    } catch (error) {
        res.status(500).json({ error })
    }
}


export default { listar }