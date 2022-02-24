const express = require('express');
const sha256  = require('crypto-js/sha256');

const app = express()
const port = 3000

const loginDB = "admin"
// Le password c'est le hash de "sµperTripp3r", de manière à ne pas stocker de password en dure dans la DB
const pswHashed = "f0f628d6c6e88e187833c6dea0f19ea2ebe059967f2e2ff604b2cf2b15fa7988" //sha256("sµperTripp3r")


app.get('/', (req, res) => {
    const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':')
    if(login === loginDB && pswHashed === sha256(password).toString()){
        res.statusCode = 200;
        return res.send({msg: '🙂 Hello World!'});
    }
    res.statusCode = 401;
    return res.send({msg: '🤕 not hello!'});
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
  
