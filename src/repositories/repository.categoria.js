
import { execute } from "../database/sqlite.js";

async function listar() {
    
    const sql = `SELECT * FROM categoria ORDER BY ordem`
    const categorias = await execute(sql, [])

    return categorias
}

export default { listar }