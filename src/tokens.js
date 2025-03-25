import jwt from 'jsonwebtoken'

const secretToken = '!ABC123'

function createJWT(id_usuario){

    const token = jwt.sign({id_usuario}, secretToken,{
        expiresIn:999999
    })

    return token
}

function validateJWT(req, res, next){

    const authToken = req.headers.authorization

    if (!authToken) {
        return res.status(401).send({ error: "Token não informado"})
    }
    
    const [aux, token] = authToken.split(" ")
    
    jwt.verify(token, secretToken, (err, decoded)=>{
        if (err) {
            return res.status(401).send({ error: "Token inválido"})
        }

        req.id_usuario = decoded.id_usuario
        console.log(req.id_usuario);
        
        next()
    })

}

export default { createJWT, validateJWT }