
import { execute } from "../database/sqlite.js";

async function destaque(id_usuario) {
    
    const sql = `SELECT CASE WHEN u.ID_FAVORITO IS NULL THEN 'N' ELSE 'S' END as favorito, e.* FROM DESTAQUE d 
JOIN EMPRESA e ON (e.ID_EMPRESA = d.ID_EMPRESA )
LEFT JOIN USUARIO_FAVORITO u ON (u.ID_EMPRESA = e.ID_EMPRESA AND u.ID_USUARIO = ?)
ORDER BY d.ORDEM DESC`
    const empresas = await execute(sql, [id_usuario])

    return empresas
}

async function listar(id_usuario, busca, id_categoria, id_banner) {
    let filtro = [id_usuario]
    
    let sql = `SELECT CASE WHEN u.ID_FAVORITO IS NULL THEN 'N' ELSE 'S' END as favorito, e.* FROM empresa e 
    LEFT JOIN USUARIO_FAVORITO u ON (u.ID_EMPRESA = e.ID_EMPRESA AND u.ID_USUARIO = ?)
    LEFT JOIN BANNER b ON (b.ID_EMPRESA = e.ID_EMPRESA)
    WHERE e.ID_EMPRESA > 0`
    
    if (busca) {
        filtro.push("%"+busca+"%")
        sql = sql + ` AND e.nome LIKE ?`
    }

    if (id_categoria) {
        filtro.push(id_categoria)
        sql = sql + ` AND e.ID_CATEGORIA = ?`
    }

    if (id_banner) {
        filtro.push(id_banner)
        sql = sql + ` AND b.ID_BANNER = ?`
    }
    
    sql = sql + ` ORDER BY e.nome DESC`

    const empresas = await execute(sql, filtro)
    
    return empresas
} 

async function cardapio(id_usuario, id_empresa) {
    //DADOS EMPRESA 
    let sql = `SELECT CASE WHEN u.ID_FAVORITO IS NULL THEN 'N' ELSE 'S' END as favorito, e.* FROM empresa e 
    LEFT JOIN USUARIO_FAVORITO u ON (u.ID_EMPRESA = e.ID_EMPRESA AND u.ID_USUARIO = ?) WHERE e.id_empresa = ?`

    const cardapio = await execute(sql, [id_usuario, id_empresa])
    let retorno = cardapio[0]
    
    retorno.categorias = []
    //CATEGORIAS UNICAS
    sql = `SELECT
            DISTINCT  c.ID_CATEGORIA ,
            c.categoria
        FROM
            produto p
        JOIN produto_categoria c ON
            (c.id_empresa = p.id_empresa
                AND c.id_categoria = p.id_categoria)
        WHERE
            p.id_empresa = ?
        ORDER BY
            c.ordem,
            p.nome
    `

    const categoria_unica = await execute(sql, [id_empresa])

    for (const cat of categoria_unica) {
        //ITENS DA CATEGORIA
        sql = `SELECT
            p.*,
            c.categoria
        FROM
            produto p
        JOIN produto_categoria c ON
            (c.id_empresa = p.id_empresa
                AND c.id_categoria = p.id_categoria)
        WHERE
            p.id_empresa = ?
            AND p.ID_CATEGORIA = ?
        ORDER BY
            c.ordem,
            p.nome`


        const itens = await execute(sql, [id_empresa, cat.ID_CATEGORIA])
        //ADICIONA AO ARRAY
        cat.itens = itens
        
        retorno.categorias.push(cat);
    }

    return retorno
}


async function inserirFavorito(id_usuario, id_empresa) {
    let sql = `INSERT INTO usuario_favorito (id_empresa, id_usuario) VALUES(?, ?) RETURNING id_favorito`
    const favorito = await execute(sql, [id_empresa, id_usuario])
    return favorito[0]
}

async function excluirFavorito(id_usuario, id_empresa) {
    let sql = `DELETE FROM usuario_favorito WHERE id_empresa = ? AND id_usuario = ? RETURNING id_favorito`
    const favorito = await execute(sql, [id_empresa, id_usuario])
    return favorito[0]
}

async function listarProdutoId(id_empresa, id_produto) {
    
    let sql = `SELECT * FROM produto p  WHERE p.id_empresa = ? AND p.id_produto = ?`

    const produto = await execute(sql, [id_empresa, id_produto])

    return produto[0]
}

export default { destaque, listar, inserirFavorito, excluirFavorito, cardapio, listarProdutoId }