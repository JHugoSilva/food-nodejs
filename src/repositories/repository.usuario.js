
import { execute } from "../database/sqlite.js";

async function inserir(nome, email, senha, endereco, complemento, bairro, cidade, uf, cep) {
    
    const sql = `INSERT INTO USUARIO (NOME, EMAIL, SENHA, ENDERECO, COMPLEMENTO, BAIRRO, CIDADE, UF, CEP, DT_CADASTRO)
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP) RETURNING id_usuario, nome`
    const usuario = await execute(sql, [nome, email, senha, endereco, complemento, bairro, cidade, uf, cep])

    return usuario[0]
}

async function getByEmail(email) {
    
    const sql = `SELECT id_usuario, NOME, EMAIL, SENHA, ENDERECO, COMPLEMENTO, BAIRRO, CIDADE, UF, CEP, DT_CADASTRO 
        FROM USUARIO WHERE EMAIL = ?`
    const usuario = await execute(sql, [email])

    if (usuario.length == 0) {
        return []
    } else {
        return usuario[0]
    }
}

async function getById(id_usuario) {
    
    const sql = `SELECT id_usuario, NOME, EMAIL, ENDERECO, COMPLEMENTO, BAIRRO, CIDADE, UF, CEP, DT_CADASTRO 
        FROM USUARIO WHERE id_usuario = ?`
    const usuario = await execute(sql, [id_usuario])
    
    if (usuario.length == 0) {
        return []
    } else {
        return usuario[0]
    }
}



async function listarFavoritos(id_usuario) {
    
    const sql = `select uf.*, e.ICONE, e.NOME, e.ENDERECO, e.COMPLEMENTO, e.BAIRRO, e.CIDADE, e.UF from USUARIO_FAVORITO uf 
join EMPRESA e on (e.ID_EMPRESA = uf.ID_EMPRESA )
where uf.ID_USUARIO = ?`
    const usuarioFavoritos = await execute(sql, [id_usuario])

    return usuarioFavoritos
}

export default { listarFavoritos, inserir, getByEmail, getById }