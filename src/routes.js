import { Router } from "express";

import controllerCategoria from "./controllers/controller.categoria.js";
import controllerBanner from "./controllers/controller.banner.js";
import controllerEmpresa from "./controllers/controller.empresa.js";
import controllerPedidos from "./controllers/controller.pedido.js";
import controllerUsuario from "./controllers/controller.usuario.js";
import jwt from './tokens.js'
const router = Router()


router.get('/categorias', jwt.validateJWT, controllerCategoria.listar)
router.get('/banners', jwt.validateJWT, controllerBanner.listar)

router.get('/empresas/destaques', jwt.validateJWT, controllerEmpresa.destaque)
router.get('/empresas', jwt.validateJWT, controllerEmpresa.listar)
router.post('/empresas/:id_empresa/favoritos', jwt.validateJWT, controllerEmpresa.inserirFavorito)
router.delete('/empresas/:id_empresa/favoritos', jwt.validateJWT, controllerEmpresa.excluirFavorito)
router.get('/empresas/:id_empresa/cardapio', jwt.validateJWT, controllerEmpresa.cardapio)
router.get('/empresas/:id_empresa/produtos/:id_produto', jwt.validateJWT, controllerEmpresa.listarProdutoId)

router.get('/pedidos', jwt.validateJWT, controllerPedidos.listar)
router.get('/pedidos/:id_pedido', jwt.validateJWT, controllerPedidos.listarId)
router.post('/pedidos', jwt.validateJWT, controllerPedidos.inserir)


router.get('/usuarios/favoritos', jwt.validateJWT, controllerUsuario.favoritos)

//USERS
//CREATE
router.post('/usuarios/registro', controllerUsuario.inserir)
//LOGIN
router.post('/usuarios/login', controllerUsuario.login)
//PERFIL
router.get('/usuarios/perfil', jwt.validateJWT, controllerUsuario.perfil)

export default router
