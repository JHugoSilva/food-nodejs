import serviceUsuario from "../services/service.usuario.js"
import jwt from '../tokens.js'

async function favoritos(req, res){
    try {
        const id_usuario = req.id_usuario
        // const id_usuario = req.params.id_usuario
        const usuarioFavoritos = await serviceUsuario.listarFavoritos(id_usuario)
        res.status(200).json(usuarioFavoritos)
    } catch (error) {
        res.status(500).json({ error })
    }
}

async function perfil(req, res) {
    try {
        
        const id_usuario = req.id_usuario

        const usuario = await serviceUsuario.perfil(id_usuario)

        res.status(200).json(usuario)
    } catch (error) {
        res.status(500).json({ error })
    }
}

async function login(req, res){
    try {

        const { email, senha } = req.body

        const usuario = await serviceUsuario.login(email, senha)

        if (usuario.length == 0) {
            res.status(401).json({ error: 'E-mail e/ou senha inválidas'})
        } else {
            res.status(200).json(usuario)
        }

        
    } catch (error) {
        res.status(500).json({ error })
    }
}

async function inserir(req, res) {
    
    try {
        const { nome, email, senha, endereco, complemento, bairro, cidade, uf, cep } = req.body

        const usuario = await serviceUsuario.inserir(nome, email, senha, endereco, complemento, bairro, cidade, uf, cep)

        usuario.token = jwt.createJWT(usuario.id_usuario)

        res.status(201).json(usuario)
    } catch (error) {
        res.status(500).json({ error })
    }
}





export default { favoritos, login, inserir, perfil }