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

app.get('/ola/:nome/:cargo/:idade', function (req, res) {
    res.send("<h1>Ola "+req.params.nome+"</h1>"+"<h2>Seu cargo e "+req.params.cargo+"</h2>"+"<h3>Sua idade e: "+req.params.idade+"</h3>")
})//parametro é o :nome vc pode dar qualqer valor para o parametro nome
  // voce pode dar varios parametros so acrescentar /:
  // res.send so pode ser usado 1 vez 


app.listen(8081,function () {
    console.log("Servidor rodando na url http://localhost:8081")
})// para abir o servidor com o express

    