
import { execute } from "../database/sqlite.js";

async function listar() {

    const sql = `select p.*, e.nome, e.ICONE, s.descricao AS descricao_status, s.cor from pedido p
join empresa e on (e.ID_EMPRESA  = p.ID_EMPRESA)
join pedido_status s on (s.status  = p.STATUS)
order by p.ID_PEDIDO desc`
    const pedidos = await execute(sql, [])

    return pedidos
}

async function listarId(id_pedido) {

    const sqlItens = `select i.*, p.NOME, p.DESCRICAO, p.ICONE from pedido_item i 
join PRODUTO p on (p.ID_PRODUTO = i.ID_PRODUTO )
where i.ID_PEDIDO = ? order by i.id_item`

    const sql = `select p.*, e.nome, e.ICONE from pedido p
join empresa e on (e.ID_EMPRESA  = p.ID_EMPRESA )
WHERE p.id_pedido = ?
order by p.ID_PEDIDO desc`


const pedido = await execute(sql, [id_pedido])
const itens = await execute(sqlItens, [id_pedido])
    pedido[0].itens = itens


    return pedido[0]
}

async function inserir(id_usuario, dados) {

    let sql = `INSERT INTO pedido(id_usuario, id_empresa, vl_subtotal, vl_taxa_entrega, vl_total, dt_pedido, status)
        VALUES(?,?,?,?,?,CURRENT_TIMESTAMP, 'P') RETURNING id_pedido
    `

    const pedido = await execute(sql, [id_usuario, dados.id_empresa, dados.vl_subtotal, dados.vl_taxa_entrega, dados.vl_total])

    const id_pedido = pedido[0].ID_PEDIDO

    dados.itens.map(async(item) => {
      
        sql = `INSERT INTO pedido_item(id_pedido, id_produto, obs, qtd, vl_unitario, vl_total)VALUES(?,?,?,?,?,?)`
        await execute(sql, [id_pedido, item.id_produto, item.obs, item.qtd, item.vl_unitario, item.vl_total]) 
        
    })

    return pedido[0]
}

export default { listar, listarId, inserir }