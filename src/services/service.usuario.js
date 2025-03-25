import bcrypt from 'bcrypt'
import jwt from '../tokens.js'
import repositoryUsuario from "../repositories/repository.usuario.js"

async function login(email, senha){

    const usuario = await repositoryUsuario.getByEmail(email)
    if (usuario.length == 0) {
        return []
    } else {
        if (await bcrypt.compare(senha, usuario.SENHA)) {
            delete usuario.senha
            
            usuario.token = jwt.createJWT(usuario.ID_USUARIO)
            return usuario
        } else {
            return []
        }
    }
}

async function inserir(nome, email, senha, endereco, complemento, bairro, cidade, uf, cep){

    const emailExists = await repositoryUsuario.getByEmail(email)

    if (emailExists.ID_USUARIO) 
        throw "Já existe uma conta criada com esse e-mail"

    const hashSenha = await bcrypt.hash(senha, 10)
    const usuario = await repositoryUsuario.inserir(nome, email, hashSenha, endereco, complemento, bairro, cidade, uf, cep)
    usuario.token = jwt.createJWT(usuario.ID_USUARIO)
    usuario.nome = nome
    usuario.email = email
    usuario.endereco = endereco
    usuario.complemento = complemento
    usuario.bairro = bairro
    usuario.cidade = cidade
    usuario.uf = uf
    usuario.cep = cep
    return usuario
}

async function listarFavoritos(id_usuario){
    const usuarioFavoritos = await repositoryUsuario.listarFavoritos(id_usuario)
    return usuarioFavoritos
}

async function perfil(id_usuario){
    
    const usuario = await repositoryUsuario.getById(id_usuario)
    return usuario
}

export default {listarFavoritos, inserir, login, perfil}