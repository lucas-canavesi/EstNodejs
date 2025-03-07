const express = require("express")
const app = express()

app.get("/",function (req, res) {
    res.send("Seja Bem-vindo!")
})

app.get("/sobre", function (req, res) {
    res.send("Minha pagina sobre")
})

app.get("/blog", function (req, res) {
    res.send("Meu Blog!")
})

app.listen(8081,function () {
    console.log("Servidor rodando na url http://localhost:8081")
})// para abir o servidor com o express

