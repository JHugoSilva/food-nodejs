
import { execute } from "../database/sqlite.js";

async function listar() {
    
    const sql = `SELECT * FROM banner ORDER BY ordem`
    const banners = await execute(sql, [])

    return banners
}

export default { listar }